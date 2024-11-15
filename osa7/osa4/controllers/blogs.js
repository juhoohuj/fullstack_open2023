const app = require('express')()
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')




blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
  })

  blogsRouter.get('/:id', async (request, response) => {
    await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
      .then(blog => {
        if (blog) {
          response.json(blog)
        } else {
          response.status(404).end()
        }
      })
      .catch(error => {
        response.status(400).send({ error: 'malformatted id' })
      })
  })
  
  blogsRouter.post('/', middleware.userExtractor , async (request, response) => {
    try {
      const creator = request.user
      const { title, author, url, likes, user } = request.body;

      if (!creator) {
        return response.status(401).json({ error: 'token invalid' })
      }
  
      if (!title || !url) {
        return response.status(400).json({ error: 'Title and URL are required.' });
      }

      console.log(`id is: ${creator.id}`)
  
      const blog = new Blog({ title, author, url, likes, user: creator.id});
      console.log(blog)
      const result = await blog.save();

      console.log(result)
  
      await User.findByIdAndUpdate(creator.id, { $push: { blogs: result._id } });
    
  
      response.status(201).json(result);
    } catch (error) {
      console.log(error)
      response.status(500).json({ error: 'Internal Server Error' });
    }
  });

  blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

    try {

      const user = request.user
      console.log(user)
      const blog = await Blog.findById(request.params.id);
      console.log(blog)

      if (!user) {
        return response.status(401).json({ error: 'token invalid' })
      }

      if (user.id.toString() !== blog.user.toString()) {
        return response.status(401).json({ error: 'token invalid' })
      }
  
      if (!blog) {
        return response.status(404).json({ error: 'Blog not found' });
      }

      await Blog.findByIdAndDelete(request.params.id)
  
      response.status(204).end();
    } catch (error) {
      response.status(500).json({ error: 'Internal Server Error' });
    }
  });

  blogsRouter.put('/:id', async (request, response) => {
    try {
      const { title, author, url, likes, comments } = request.body;
  
      if (!title || !url) {
        return response.status(400).json({ error: 'Title and URL are required.' });
      }
  
      const blog = await Blog.findByIdAndUpdate(
        request.params.id,
        { title, author, url, likes, comments },
        { new: true }
      );
  
      if (!blog) {
        return response.status(404).json({ error: 'Blog not found' });
      }
  
      response.json(blog);
    } catch (error) {
      response.status(500).json({ error: 'Internal Server Error' });
    }
  })

  blogsRouter.post('/:id/comments', async (request, response) => {
    try {
      const { content } = request.body
  
      if (!content) {
        return response.status(400).json({ error: 'Comment content is required' })
      }
  
      const blog = await Blog.findById(request.params.id)
      if (!blog) {
        return response.status(404).json({ error: 'Blog not found' })
      }
  
      blog.comments = blog.comments.concat({ content })
      const updatedBlog = await blog.save()
  
      response.status(201).json(updatedBlog)
    } catch (error) {
      response.status(500).json({ error: 'Internal Server Error' })
    }
  })
  
  
  blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
      .populate('user', { username: 1, name: 1 })
    response.json(blogs)
  })
  
  blogsRouter.get('/:id', async (request, response) => {
    try {
      const blog = await Blog.findById(request.params.id)
        .populate('user', { username: 1, name: 1 })
      
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    } catch (error) {
      response.status(400).json({ error: 'malformatted id' })
    }
  })

module.exports = blogsRouter
const app = require('express')()
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}



blogsRouter.get('/', (request, response) => {
    Blog
      .find({}).populate('user', { username: 1, name: 1 })
      .then(blogs => {
        response.json(blogs)
      })
  })

  blogsRouter.get('/:id', (request, response) => {
    Blog.findById(request.params.id)
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
  
  blogsRouter.post('/', userExtractor, async (request, response) => {
    try {
      const { title, author, url, likes, } = request.body;

      const user = request.user;

      if (!user) {
        return response.status(401).json({ error: 'token invalid' })
      }
  
      if (!title || !url) {
        return response.status(400).json({ error: 'Title and URL are required.' });
      }

  
      const blog = new Blog({ title, author, url, likes, user: user._id });
      const result = await blog.save();
  

      user.blogs = user.blogs.concat(result._id);
  
    
      await user.save();
  
      response.status(201).json(result);
    } catch (error) {
      response.status(500).json({ error: 'Internal Server Error' });
    }
  });

  blogsRouter.delete('/:id', userExtractor, async (request, response) => {

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
      const { title, author, url, likes } = request.body;
  
      if (!title || !url) {
        return response.status(400).json({ error: 'Title and URL are required.' });
      }
  
      const blog = await Blog.findByIdAndUpdate(
        request.params.id,
        { title, author, url, likes },
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

module.exports = blogsRouter
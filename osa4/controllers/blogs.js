const app = require('express')()
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')



blogsRouter.get('/', (request, response) => {
    Blog
      .find({}).populate('user', { username: 1, name: 1 })
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  blogsRouter.post('/', async (request, response) => {
    try {
      const { title, author, url, likes } = request.body;
  
      if (!title || !url) {
        return response.status(400).json({ error: 'Title and URL are required.' });
      }
  
      const user = await User.findById("657d991c79b18ec1e1ab6ef0");
      console.log(user)
  
      const blog = new Blog({ title, author, url, likes, user: user._id });
      const result = await blog.save();
  

      user.blogs = user.blogs.concat(result._id);
  
    
      await user.save();
  
      response.status(201).json(result);
    } catch (error) {
      response.status(500).json({ error: 'Internal Server Error' });
    }
  });

  blogsRouter.delete('/:id', async (request, response) => {
    try {
      const blog = await Blog.findByIdAndDelete(request.params.id);
  
      if (!blog) {
        return response.status(404).json({ error: 'Blog not found' });
      }
  
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
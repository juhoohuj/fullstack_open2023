const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const { tokenExtractor } = require('../utils/middleware')


const initialBlogs = [
    {
        title: 'Testi',
        author: 'Juuso',
        url: 'www.google.fi',
        likes: 6
    },
    {
        title: 'Testi2',
        author: 'MATTI',
        url: 'www.google.fi',
        likes: 7
    }
]

let userToken; // Variable to store the user token

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  // Create a test user
  const user = {
    username: 'testuser',
    name: 'Test User',
    password: 'testpassword',
  };
  await api.post('/api/users').send(user);

  // Login and obtain the token
  const loginResponse = await api.post('/api/login').send({
    username: user.username,
    password: user.password,
  });
  userToken = loginResponse.body.token;

  // Save initial blogs
  for (const blog of initialBlogs) {
    const blogObject = new Blog(blog);
    await blogObject.save();
  }
});



test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

test('parameter id is defined', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('adding a blog works', async () => {

    const length = await api.get('/api/blogs').then(response => response.body.length)
    
    const newBlog = {
        title: 'Testi2',
        author: 'Juuso',
        url: 'www.google.fi',
        likes: 1
    }
    await api
        .post('/api/blogs')
        .set('Authorization', `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imp1aG8iLCJpZCI6IjY1N2Y1YTJlOWYyMmE5MThkYmU0MWExZiIsImlhdCI6MTcwMjkyMzM5NX0.Pe4STsIfKVoF1yqhrwlJopiBUQ2WUbrZ6qKs9oC40T8`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type',/application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(length+1)
}, 10000)

test('likes is 0 if not defined', async () => {
    const newBlog = {
        title: 'Testi2',
        author: 'Juuso',
        url: 'www.google.fi'
    }   

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type',/application\/json/)

    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.likes)
    expect(contents[contents.length-1]).toBe(0)
}, )

test('adding a blog without title or url should return 400 Bad Request', async () => {
    const newBlogMissingFields = {
      author: 'John Doe',
      likes: 5,
    };
  
    await api
      .post('/api/blogs')
      .send(newBlogMissingFields)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

test('deleting a blog works', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body[0].id
    await api
        .delete(`/api/blogs/${id}`)
        .expect(204)
    const response2 = await api.get('/api/blogs')
    expect(response2.body.length).toBe(initialBlogs.length-1)
})

test('updating a blog works', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body[0].id
    const newBlog = {
        title: 'Testi2',
        author: 'Juuso',
        url: 'www.google.fi',
        likes: 1
    }
    await api
        .put(`/api/blogs/${id}`)
        .send(newBlog)
        .expect(200)
    const response2 = await api.get('/api/blogs')
    expect(response2.body[0].likes).toBe(newBlog.likes)
})

test('adding a blog without token should return 401 Unauthorized', async () => {
    const newBlog = {
        title: 'Testi2',
        author: 'Juuso',
        url: 'www.google.fi',
        likes: 1
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type',/application\/json/)
})

afterAll( async () => {
    mongoose.connection.close()
})


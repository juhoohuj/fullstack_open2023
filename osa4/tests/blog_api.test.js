const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)


test('returns the correct amount of blog posts in JSON format', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(6)
})


afterAll(async () => {
    await mongoose.connection.close()
})

const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://juuben:${password}@klusteri.6b9gmpm.mongodb.net/testBlog?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog',blogSchema)

const blog = new Blog({
    title: 'Testi2',
    author: 'Juuso',
    url: 'www.google.fi',
    likes: 1
})  

blog.save().then(response => {
    console.log('blog saved!')
    mongoose.connection.close()
} ) 


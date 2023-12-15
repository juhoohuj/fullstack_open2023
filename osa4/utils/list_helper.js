const mongoose = require('mongoose')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer, 0)
}


const favouriteBlog = (blogs) => {
    let favourite = blogs[0]
    blogs.forEach(e => {
        if(e.likes > favourite.likes) favourite = e
    });
    return favourite
}

const mostBlogsByAuthor = (blogs) => {
    let authors = {}
    let mostBlogs = 0
    let author = ''
    blogs.forEach(e => {
        if(!authors[e.author]) authors[e.author] = 1
        else authors[e.author] += 1
        if(authors[e.author] > mostBlogs) {
            mostBlogs = authors[e.author]
            author = e.author
        }
    });
    return {author, blogs: mostBlogs}
}

const mostLikes = (blogs) => {
    let authors = {}
    let mostLikes = 0
    let author = ''
    blogs.forEach(e => {
        if(!authors[e.author]) authors[e.author] = e.likes
        else authors[e.author] += e.likes
        if(authors[e.author] > mostLikes) {
            mostLikes = authors[e.author]
            author = e.author
        }
    });
    return {author, likes: mostLikes}
}



module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogsByAuthor,
    mostLikes
}





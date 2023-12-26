import React, { useState } from 'react'

const Blog = ({ blog, handleLike }) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 5,
    background: 'lightgrey'
  }

  const likeHandler = () => {
    handleLike(blog.id)
  }

  

  return(
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <p>Blog {blog.title} by {blog.author}</p>
        <button onClick={() => setVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        <p>Title: {blog.title}</p>
        <p>Author: {blog.author}</p>
        <p>Url: {blog.url}</p>
        <p>Likes: {blog.likes} <button onClick={likeHandler}>Like </button></p>
        <p>Added by: {blog.user.name}</p>
        <button onClick={() => setVisible(false)}>hide</button>
      </div>
    </div>
  )
}
export default Blog
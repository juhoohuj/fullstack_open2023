import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {

  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()

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
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    dispatch(updateBlog(blog.id, updatedBlog))
  }

  const deleteHandler = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
    }
  }



  return(
    <div className='blog' style={blogStyle}>
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
        <button onClick={deleteHandler}>Delete</button>
        <button onClick={() => setVisible(false)}>hide</button>
      </div>
    </div>
  )
}
export default Blog
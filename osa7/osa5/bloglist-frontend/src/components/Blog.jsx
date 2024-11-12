import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

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
    background: 'lightgrey',
    padding: 10,
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
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </div>
    </div>
  )
}
export default Blog
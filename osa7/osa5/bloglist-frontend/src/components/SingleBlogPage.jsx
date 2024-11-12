import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'

const SingleBlogPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const blog = useSelector(state => 
    state.blogs.find(blog => blog.id === id)
  )

  if (!blog) return <div>Blog not found</div>

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    dispatch(updateBlog(blog.id, updatedBlog))
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
    </div>
  )
}

export default SingleBlogPage
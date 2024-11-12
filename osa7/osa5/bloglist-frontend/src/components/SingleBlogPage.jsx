import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'

const SingleBlogPage = () => {
  const [commentText, setCommentText] = useState("")
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

  const handleComment = (event) => {
    event.preventDefault()
    const comment = {
      content: commentText,
      date: new Date().toISOString()
    }
    
    const updatedBlog = {
      ...blog,
      comments: blog.comments.concat(comment)
    }
    
    dispatch(updateBlog(blog.id, updatedBlog))
    setCommentText('')
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

      <h3>comments</h3>
      <input 
        type="text"
        value={commentText}
        onChange={({ target }) => setCommentText(target.value)}
      />
      <button onClick={handleComment}>add comment</button>
      <ul>
        {blog.comments.map(comment => 
          <li key={comment.date}>{comment.content}</li>
        )}
      </ul>
    </div>
  )
}

export default SingleBlogPage
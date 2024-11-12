import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { showTemporaryNotification } from '../reducers/notificationReducer'

const BlogForm = ({ isLoggedIn, user }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    try {
      dispatch(createBlog({
        title,
        author,
        url,
        user: user.id
      }))
      dispatch(showTemporaryNotification(`Added ${title}`, 'green'))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      dispatch(showTemporaryNotification('Error creating blog', 'red'))
    }
  }



  if (!isLoggedIn) {
    return null
  }

  return (
    <form onSubmit={addBlog}>
      <h2>Create new</h2>
      <div>
        <div>
          <label htmlFor="title">title:</label>
          <input
            type="text"
            id="title"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input
            type="text"
            id="author"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input
            type="text"
            id="url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
      </div>
      <button id='create-button' type="submit">create</button>
    </form>
  )
}

export default BlogForm

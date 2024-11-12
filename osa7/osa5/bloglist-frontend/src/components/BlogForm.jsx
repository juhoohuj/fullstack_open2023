import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { showTemporaryNotification } from '../reducers/notificationReducer'
import { TextField, Button, Box, Typography } from '@mui/material'

const BlogForm = ({ isLoggedIn, user }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    try {
      dispatch(
        createBlog({
          title,
          author,
          url,
          user: user.id,
        })
      )
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
    <Box component="form" onSubmit={addBlog} sx={{ mt: 2 }}>
      <Typography variant="h5">Create new</Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Title"
        id="title"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Author"
        id="author"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="URL"
        id="url"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
      <Button
        variant="contained"
        type="submit"
        id="create-button"
        sx={{ mt: 2 }}
      >
        Create
      </Button>
    </Box>
  )
}

export default BlogForm

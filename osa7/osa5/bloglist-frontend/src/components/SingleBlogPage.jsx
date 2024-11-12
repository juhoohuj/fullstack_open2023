import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import {
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Link,
} from '@mui/material'

const SingleBlogPage = () => {
  const [commentText, setCommentText] = useState('')
  const { id } = useParams()
  const dispatch = useDispatch()
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  )

  if (!blog) return <div>Blog not found</div>

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    dispatch(updateBlog(blog.id, updatedBlog))
  }

  const handleComment = (event) => {
    event.preventDefault()
    const comment = {
      content: commentText,
      date: new Date().toISOString(),
    }

    const updatedBlog = {
      ...blog,
      comments: blog.comments.concat(comment),
    }

    dispatch(updateBlog(blog.id, updatedBlog))
    setCommentText('')
  }

  return (
    <div>
      <Typography variant="h4">{blog.title}</Typography>
      <Link href={blog.url} target="_blank" rel="noreferrer">
        {blog.url}
      </Link>
      <Typography>likes: {blog.likes}</Typography>
      <Button onClick={handleLike}>like</Button>
      <Typography>added by {blog.user.name}</Typography>
      <Typography variant="h5">comments</Typography>
      <form onSubmit={handleComment}>
        <TextField
          label="comment"
          value={commentText}
          onChange={({ target }) => setCommentText(target.value)}
        />
        <Button type="submit">add comment</Button>
      </form>
      <List>
        {blog.comments.map((comment, index) => (
          <ListItem key={index}>
            <ListItemText primary={comment.content} secondary={comment.date} />
          </ListItem>
        ))}
      </List>
      <Button onClick={() => dispatch(deleteBlog(blog.id))}>remove</Button>
    </div>
  )
}

export default SingleBlogPage

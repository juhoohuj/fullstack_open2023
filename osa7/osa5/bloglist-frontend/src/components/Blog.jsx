import React from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { Card, CardContent, Typography, Button, Link as MuiLink } from '@mui/material'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const likeHandler = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    dispatch(updateBlog(blog.id, updatedBlog))
  }

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">
          <MuiLink 
            component={Link} 
            to={`/blogs/${blog.id}`}
            sx={{ textDecoration: 'none' }}
          >
            {blog.title} by {blog.author}
          </MuiLink>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Blog
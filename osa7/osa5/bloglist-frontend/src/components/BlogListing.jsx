// BlogListing.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Link as MuiLink,
} from '@mui/material'

const BlogListing = () => {
  const blogs = useSelector((state) => state.blogs)

  const getBlogsPerUser = (blogs) => {
    return blogs.reduce((acc, blog) => {
      const userId = blog.user.id
      acc[userId] = (acc[userId] || 0) + 1
      return acc
    }, {})
  }

  const blogCounts = getBlogsPerUser(blogs)

  const uniqueUsers = [...new Set(blogs.map((blog) => blog.user.id))].map(
    (userId) => blogs.find((blog) => blog.user.id === userId).user
  )

  return (
    <div>
      <Typography variant="h4">Users</Typography>
      <List>
        {uniqueUsers.map((user) => (
          <ListItem key={user.id}>
            <ListItemText
              primary={
                <MuiLink component={Link} to={`/users/${user.id}`}>
                  {user.name}
                </MuiLink>
              }
              secondary={`Added blogs: ${blogCounts[user.id]}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default BlogListing

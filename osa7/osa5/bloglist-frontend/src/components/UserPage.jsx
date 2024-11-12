import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Typography, List, ListItem, ListItemText } from '@mui/material'

const UserPage = () => {
  const { id } = useParams()
  const blogs = useSelector((state) => state.blogs)

  const userBlogs = blogs.filter((blog) => blog.user.id === id)
  const user = userBlogs[0]?.user

  if (!user) return <div>User not found</div>

  return (
    <div>
      <Typography variant="h4">Blogs by {user.name}</Typography>
      <List>
        {userBlogs.map((blog) => (
          <ListItem key={blog.id}>
            <ListItemText primary={blog.title} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default UserPage

import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserPage = () => {
  const { id } = useParams()
  const blogs = useSelector(state => state.blogs)
  
  const userBlogs = blogs.filter(blog => blog.user.id === id)
  const user = userBlogs[0]?.user

  if (!user) return <div>User not found</div>

  return (
    <div>
      <h2>Blogs by {user.name}</h2>
      <ul>
        {userBlogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage
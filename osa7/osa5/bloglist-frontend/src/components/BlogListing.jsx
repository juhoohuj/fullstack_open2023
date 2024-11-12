// BlogListing.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const BlogListing = () => {
  const blogs = useSelector(state => state.blogs)

  const getBlogsPerUser = (blogs) => {
    return blogs.reduce((acc, blog) => {
      const userId = blog.user.id
      acc[userId] = (acc[userId] || 0) + 1
      return acc
    }, {})
  }

  const blogCounts = getBlogsPerUser(blogs)
  
  const uniqueUsers = [...new Set(blogs.map(blog => blog.user.id))]
    .map(userId => blogs.find(blog => blog.user.id === userId).user)

  return (
    <div>
      <h2>Added blogs</h2>
      <ul>
        {uniqueUsers.map(user => (
          <li key={user.id}>
            <Link 
              to={`/users/${user.id}`}
              style={{ color: 'blue', textDecoration: 'underline' }}
            >
              {user.name}
            </Link>
            , Added blogs: {blogCounts[user.id]}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogListing
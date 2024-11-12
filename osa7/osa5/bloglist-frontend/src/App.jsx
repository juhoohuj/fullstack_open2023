import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { showTemporaryNotification } from './reducers/notificationReducer'
import {
  initializeBlogs,
  updateBlog,
  deleteBlog,
} from './reducers/blogReducer'
import { initializeUser, logoutUser } from './reducers/userReducer'

const Blogs = ({ isLoggedIn, blogs, handleLike, handleDelete }) => {
  if (!isLoggedIn) {
    return <p>Not logged in</p>
  }

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  )
}

const App = () => {
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(showTemporaryNotification('Logged out', 'green'))
  }

  return (
    <div>
      <div>
        <Notification />
        <LoginForm isLoggedIn={user !== null} />
      </div>
      <div>
        <h2>blogs</h2>
        <p>
          {user !== null && (
            <span>
              {user.name} logged in{' '}
              <button onClick={handleLogout}>Logout</button>
            </span>
          )}
        </p>
        <Blogs
          isLoggedIn={user !== null}
          blogs={blogs}
          handleLike={(id, blog) => dispatch(updateBlog(id, blog))}
          handleDelete={(id) => dispatch(deleteBlog(id))}
        />
      </div>

      <div>
        <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
          <BlogForm
            isLoggedIn={user !== null}
            user={user}
          />
        </Togglable>
      </div>
    </div>
  )
}

export default App

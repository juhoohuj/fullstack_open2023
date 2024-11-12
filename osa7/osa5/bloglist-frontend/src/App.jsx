import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { showTemporaryNotification } from './reducers/notificationReducer'
import { initializeBlogs, updateBlog, deleteBlog } from './reducers/blogReducer'
import { initializeUser, logoutUser } from './reducers/userReducer'
import BlogListing from './components/BlogListing'
import UserPage from './components/UserPage'
import SingleBlogPage from './components/SingleBlogPage'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import {
  Container,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Box,
} from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme()

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
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
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
    <ThemeProvider theme={theme}>
      <Router>
        <Container>
          <Box>
            <Notification />
          </Box>

          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" component={Link} to="/">
                Blogs
              </Button>
              <Button color="inherit" component={Link} to="/users">
                Users
              </Button>
              {user !== null && (
                <>
                  <Typography sx={{ flexGrow: 1 }}>
                    {user.name} logged in
                  </Typography>
                  <Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              )}
            </Toolbar>
          </AppBar>

          <Routes>
            <Route path="/users" element={<BlogListing />} />
            <Route path="/users/:id" element={<UserPage />} />
            <Route path="/blogs/:id" element={<SingleBlogPage />} />
            <Route
              path="/"
              element={
                <Box>
                  <LoginForm isLoggedIn={user !== null} />
                  <Togglable buttonLabel="new blog" ref={blogFormRef}>
                    <BlogForm
                      isLoggedIn={user !== null}
                      user={user}
                      blogFormRef={blogFormRef}
                    />
                  </Togglable>
                  <Blogs
                    isLoggedIn={user !== null}
                    blogs={blogs}
                    handleLike={(blog) => {
                      const updatedBlog = {
                        ...blog,
                        likes: blog.likes + 1,
                      }
                      dispatch(updateBlog(blog.id, updatedBlog))
                    }}
                    handleDelete={(blog) => {
                      if (
                        window.confirm(
                          `Remove blog ${blog.title} by ${blog.author}`
                        )
                      ) {
                        dispatch(deleteBlog(blog.id))
                      }
                    }}
                  />
                </Box>
              }
            />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  )
}

export default App

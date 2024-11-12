import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch } from 'react-redux'
import { showTemporaryNotification } from './reducers/notificationReducer'

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
  const [blogs, setBlogs] = useState([])
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  function sortBlogs(blogs) {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    setBlogs(sortedBlogs)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setLoggedInUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => sortBlogs(blogs))
  }, [loggedInUser])

  //login
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

      setLoggedInUser(user)
      blogService.setToken(user.token)
      dispatch(showTemporaryNotification('Logged in', 'green'))
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('exception', exception)
      dispatch(showTemporaryNotification('Wrong credentials', 'red'))
    }
  }

  //logout
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setLoggedInUser(null)
    blogService.setToken(null)
    dispatch(showTemporaryNotification('Logged out', 'green'))
  }

  //create blog
  const handleCreateBlog = async (blogObject) => {
    try {
      await blogService.create(blogObject)
      blogFormRef.current.toggleVisibility()
      console.log('blogObject', blogObject)
      const updatedBlogs = await blogService.getAll()
      sortBlogs(updatedBlogs)
      dispatch(showTemporaryNotification('Blog created', 'green'))
    } catch (exception) {
      console.log('exception', exception)
      dispatch(showTemporaryNotification('Failed to create blog', 'red'))
    }
  }

  const handleLike = async (blogId) => {
    const blog = blogs.find((blog) => blog.id === blogId)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      await blogService.update(blogId, updatedBlog)
      const updatedBlogs = await blogService.getAll()
      sortBlogs(updatedBlogs)
    } catch (exception) {
      console.log('exception', exception)
    }
  }

  const handleDelete = async (blogId) => {
    const blog = blogs.find((blog) => blog.id === blogId)
    const result = window.confirm(`Delete ${blog.title} by ${blog.author}?`)
    if (result) {
      try {
        await blogService.deleteOne(blogId)
        const updatedBlogs = await blogService.getAll()
        sortBlogs(updatedBlogs)
      } catch (exception) {
        console.log('exception', exception)
      }
    }
  }

  return (
    <div>
      <div>
        <Notification />
        <LoginForm
          handleLogin={handleLogin}
          isLoggedIn={loggedInUser !== null}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
      <div>
        <h2>blogs</h2>
        <p>
          {loggedInUser !== null && (
            <span>
              {loggedInUser.name} logged in{' '}
              <button onClick={handleLogout}>Logout</button>
            </span>
          )}
        </p>
        <Blogs
          isLoggedIn={loggedInUser !== null}
          blogs={blogs}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      </div>

      <div>
        <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
          <BlogForm
            fn={handleCreateBlog}
            isLoggedIn={loggedInUser !== null}
            user={loggedInUser}
          />
        </Togglable>
      </div>
    </div>
  )
}

export default App

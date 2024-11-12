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
import { initializeBlogs, createBlog } from './reducers/blogReducer'


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
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogs = useSelector(state => state.blogs)

  const blogFormRef = useRef()

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(blogObject))
      dispatch(showTemporaryNotification(`Added ${blogObject.title}`, 'green'))
    } catch (exception) {
      dispatch(showTemporaryNotification('Error creating blog', 'red'))
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
            fn={addBlog}
            isLoggedIn={loggedInUser !== null}
            user={loggedInUser}
          />
        </Togglable>
      </div>
    </div>
  )
}

export default App

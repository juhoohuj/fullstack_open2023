import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { showTemporaryNotification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

const LoginForm = ({ isLoggedIn }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    const success = await dispatch(loginUser({ username, password }))
    if (success) {
      dispatch(showTemporaryNotification('Logged in', 'green'))
      setUsername('')
      setPassword('')
    } else {
      dispatch(showTemporaryNotification('Wrong credentials', 'red'))
    }
  }

  if (isLoggedIn) {
    return null
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        username
        <input
          type="text"
          id='username'
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          id='password'
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id='login-button'>login</button>
    </form>
  )
}

LoginForm.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}

export default LoginForm
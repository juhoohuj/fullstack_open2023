import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { showTemporaryNotification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { TextField, Button, Box, Typography } from '@mui/material'

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
    <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
      <Typography variant="h5">Login</Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Username"
        id="username"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        type="password"
        label="Password"
        id="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <Button
        variant="contained"
        type="submit"
        id="login-button"
        sx={{ mt: 2 }}
      >
        Login
      </Button>
    </Box>
  )
}

LoginForm.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
}

export default LoginForm

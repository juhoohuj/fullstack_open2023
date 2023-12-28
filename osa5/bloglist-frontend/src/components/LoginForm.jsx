import PropTypes from 'prop-types'


const LoginForm = ({ handleLogin, isLoggedIn, username, password, setUsername, setPassword }) => {
  if (isLoggedIn) {
    return null // Don't render the login form if the user is logged in
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
  handleLogin: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
}

export default LoginForm
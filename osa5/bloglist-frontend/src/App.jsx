import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const LoginForm = ({ handleLogin, isLoggedIn, username, password, setUsername, setPassword }) => {
  if (isLoggedIn) {
    return null; // Don't render the login form if the user is logged in
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>  
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password" 
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

const Blogs = ({ isLoggedIn, blogs }) => {
  if (!isLoggedIn) {
    return <p>Not logged in</p>;
  }

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

const BlogForm = ({ isLoggedIn, user }) => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');



  const handleCreateBlog = async (event) => {
    event.preventDefault();
  
    try {
      const blog = await blogService.create({
        title,
        author,
        url,
        user: user.id,
      });
  
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (exception) {
      console.log('exception', exception);
    }
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <form onSubmit={handleCreateBlog}>
      <h2>Create new</h2>
      <div>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
      </div>
      <button type="submit">create</button>
    </form>
  );
};




const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setLoggedInUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [loggedInUser]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user));

      setLoggedInUser(user);
      blogService.setToken(user.token);

      setUsername('');
      setPassword('');

    } catch (exception) {
      console.log('exception', exception);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser');
    setLoggedInUser(null);
    blogService.setToken(null);
  };

  return (
    <div>
      <LoginForm
        handleLogin={handleLogin}
        isLoggedIn={loggedInUser !== null}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
      />
      <h2>Blogs listed</h2>
      <Blogs isLoggedIn={loggedInUser !== null} blogs={blogs} />
      {loggedInUser && (
        <div>
          <p>Logged in as: {loggedInUser.username}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      <BlogForm isLoggedIn={loggedInUser !== null} user={loggedInUser} />

    </div>
  );
};

export default App;

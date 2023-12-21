import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';



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






const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [noti, setNoti] = useState(null);
  const [notiColor, setNotiColor] = useState(null)
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

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

  //login
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
      setNoti(`Logged in as ${user.username}`);
      setNotiColor('green');
      setTimeout(() => {
        setNoti(null);
      }, 5000);

      setUsername('');
      setPassword('');

    } catch (exception) {
      console.log('exception', exception);
      setNoti('Wrong username or password');
      setNotiColor('red');
      setTimeout(() => {
        setNoti(null);
      }, 5000);
    }
  };

  //logout
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser');
    setLoggedInUser(null);
    blogService.setToken(null);
    setNoti('Logged out');
    setNotiColor('green');
    setTimeout(() => {
      setNoti(null);
    }, 5000);
  };

  //create blog
  const handleCreateBlog = async (event) => {
    event.preventDefault();
  
    try {
      const blog = await blogService.create({
        title,
        author,
        url,
        user: loggedInUser.id,
      });
      setBlogs(blogs.concat(blog));

      setNoti(`a new blog ${blog.title} by ${blog.author} added`);
      setNotiColor('green');
      setTimeout(() => {
        setNoti(null);
      }, 5000);


      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (exception) {
      console.log('exception', exception);
      setNoti('Error creating blog');
      setNotiColor('red');
      setTimeout(() => {
        setNoti(null);
      }, 5000);   
    }
  }


  return (

    <div>

      <Notification message={noti} noticolor={notiColor} />
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

      <BlogForm 
        isLoggedIn={loggedInUser !== null}
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
        fn={handleCreateBlog}
      />

    </div>
  );
};

export default App;

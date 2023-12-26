import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';



const Blogs = ({ isLoggedIn, blogs, handleLike }) => {
  if (!isLoggedIn) {
    return <p>Not logged in</p>;
  }

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} handleLike={handleLike} />
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
  

  const blogFormRef = useRef();


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
  const handleCreateBlog = async (blogObject) => {
    
    try {
      await blogService.create(blogObject);
      blogFormRef.current.toggleVisibility()
      console.log('blogObject', blogObject);
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs);
      setNoti(`a new blog ${blogObject.title} by ${blogObject.author} added`);
      setNotiColor('green');
      setTimeout(() => {
        setNoti(null);
      }, 5000);

      

    } catch (exception) {
      console.log('exception', exception);
      setNoti('Error creating blog');
      setNotiColor('red');
      setTimeout(() => {
        setNoti(null);
      }, 5000);   
    }
  }


  const handleLike = async (blogId) => {
    const blog = blogs.find((blog) => blog.id === blogId);
    const updatedBlog = { ...blog, likes: blog.likes + 1 };

    try {
      await blogService.update(blogId, updatedBlog);
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs);
    } catch (exception) {
      console.log('exception', exception);
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

      <Blogs isLoggedIn={loggedInUser !== null} blogs={blogs} handleLike={handleLike}/>
      {loggedInUser && (
        <div>
          <p>Logged in as: {loggedInUser.username}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      
      <Togglable
        buttonLabel="Create new blog" 
        isLoggedIn={loggedInUser!==null} 
        ref={blogFormRef}
      >

        <BlogForm
          fn={handleCreateBlog}
          isLoggedIn={loggedInUser !== null}
          user={loggedInUser}
        />

      </Togglable>

    </div>
  );
};

export default App;

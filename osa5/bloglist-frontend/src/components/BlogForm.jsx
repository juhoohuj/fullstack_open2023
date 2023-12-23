import React, { useState } from 'react';



const BlogForm = ({ isLoggedIn, fn, user }) => {

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const addBlog = (event) => {
    event.preventDefault();

    fn({
      title: title,
      author: author,
      url: url,
      user: user.id
    });

    
    setTitle("");
    setAuthor("");
    setUrl("");
  }



    if (!isLoggedIn) {
      return null;
    }
  
    return (
      <form onSubmit={addBlog}>
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

export default BlogForm;

import React, { useState } from 'react';
import blogService from '../services/blogs';



const BlogForm = ({ isLoggedIn, title, author, url, setTitle, setAuthor, setUrl, fn }) => {


    if (!isLoggedIn) {
      return null;
    }
  
    return (
      <form onSubmit={fn}>
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

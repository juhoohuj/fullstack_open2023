import React, { useState } from 'react'



const BlogForm = ({ isLoggedIn, fn, user }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    fn({
      title: title,
      author: author,
      url: url,
      user: user.id
    })


    setTitle('')
    setAuthor('')
    setUrl('')
  }



  if (!isLoggedIn) {
    return null
  }

  return (
    <form onSubmit={addBlog}>
      <h2>Create new</h2>
      <div>
        <div>
          <label htmlFor="title">title:</label>
          <input
            type="text"
            id="title"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input
            type="text"
            id="author"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input
            type="text"
            id="url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm

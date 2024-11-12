import blogService from '../services/blogs'

const initialState = []


export const setBlogs = (blogs) => ({
  type: 'SET_BLOGS',
  payload: blogs
})

export const updateBlog = (id, blogObject) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(id, blogObject)
    dispatch({
      type: 'LIKE_BLOG',
      payload: updatedBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.deleteOne(id)
    dispatch({
      type: 'DELETE_BLOG',
      payload: id
    })
  }
}

export const appendBlog = (blog) => ({
  type: 'NEW_BLOG',
  payload: blog
})

export const createBlog = (blogObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch(appendBlog(newBlog))
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(sortedBlogs))
  }
}


const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.payload
    case 'NEW_BLOG':
      return [...state, action.payload]
    case 'LIKE_BLOG':
      return state.map(blog => 
        blog.id === action.payload.id ? action.payload : blog
      ).sort((a, b) => b.likes - a.likes)
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.payload)
    default:
      return state
  }
}

export default blogReducer
import blogService from '../services/blogs'

const initialState = []

// Action creators
export const setBlogs = (blogs) => ({
  type: 'SET_BLOGS',
  payload: blogs
})

export const appendBlog = (blog) => ({
  type: 'NEW_BLOG',
  payload: blog
})

// Thunk actions
export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(sortedBlogs))
  }
}

export const createBlog = (blogData) => {
  return async dispatch => {
    const newBlog = await blogService.create(blogData)
    dispatch(appendBlog(newBlog))
  }
}

// Reducer
const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.payload
    case 'NEW_BLOG':
      return [...state, action.payload]
    default:
      return state
  }
}

export default blogReducer
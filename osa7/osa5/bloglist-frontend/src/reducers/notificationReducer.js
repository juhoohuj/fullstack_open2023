const initialState = {
  message: null,
  color: 'green'
}

export const setNotification = (message, color) => ({
  type: 'SET_NOTIFICATION',
  payload: { message, color }
})

export const clearNotification = () => ({
  type: 'CLEAR_NOTIFICATION'
})

export const showTemporaryNotification = (message, color, duration = 5) => {
  return dispatch => {
    dispatch(setNotification(message, color))
    setTimeout(() => {
      dispatch(clearNotification())
    }, duration * 1000)
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        message: action.payload.message,
        color: action.payload.color
      }
    case 'CLEAR_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export default notificationReducer
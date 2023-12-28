import React, { useState, useImperativeHandle, forwardRef } from 'react'

// eslint-disable-next-line react/display-name
const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={{ display: visible ? 'none' : '' }}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={{ display: visible ? '' : 'none' }}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})

export default Togglable

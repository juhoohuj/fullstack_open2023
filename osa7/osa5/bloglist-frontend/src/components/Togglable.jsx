import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { Box, Button } from '@mui/material'

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
    <Box sx={{ mt: 2, mb: 2 }}>
      <Box sx={{ display: visible ? 'none' : 'block' }}>
        <Button 
          variant="contained" 
          onClick={toggleVisibility}
          size="small"
        >
          {props.buttonLabel}
        </Button>
      </Box>
      <Box sx={{ display: visible ? 'block' : 'none' }}>
        {props.children}
        <Button 
          variant="outlined"
          onClick={toggleVisibility}
          size="small"
          sx={{ mt: 1 }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  )
})

export default Togglable
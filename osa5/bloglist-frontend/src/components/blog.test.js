import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog component', () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'Test url',
    likes: 0,
    user: {
      username: 'Test username',
    },
  }

  test('renders content', () => {
    const component = render(<Blog blog={blog} />)

    expect(component.container).toHaveTextContent('Test title')
  })
})



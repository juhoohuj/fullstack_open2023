import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 0,
    user: {
      name: 'Test User'
    }
    }

    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
        'Component testing is done with react-testing-library'
    )
    expect(component.container).toHaveTextContent(
        'Test Author'
    )
    expect(component.container).not.toHaveTextContent(
        'http://testurl.com'
    )
    expect(component.container).not.toHaveTextContent(
        'likes'
    )
}
)
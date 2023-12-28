import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'https://test.com',
    likes: 0,
    user: {
      username: 'test',
      name: 'Test User',
    },
  }

  const component = render(<Blog blog={blog} />)
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).toHaveTextContent('Test Author')
})

test('clicking the bview button it shows more details', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'https://test.com',
    likes: 0,
    user: {
      username: 'test',
      name: 'Test User',
    },
  }

  const component = render(<Blog blog={blog}/>)

  const user  = userEvent.setup()
  const button = component.getByText('view')
  await user.click(button)

  expect(component.container).toHaveTextContent('https://test.com')
  expect(component.container).toHaveTextContent('0')
})

test('clicking the like button twice calls event handler twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'https://test.com',
    likes: 0,
    user: {
      username: 'test',
      name: 'Test User',
    },
  }

  const mockHandler = jest.fn()

  const component = render(<Blog blog={blog} handleLike={mockHandler}/>)
  const user = userEvent.setup()
  const button = component.getByText('view')
  await user.click(button)

  const likeButton = component.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

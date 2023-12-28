import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('BlogForm calls the event handler it received as props with the right details when a new blog is created', async () => {
  const addBlog = jest.fn()

  const userID = { id: 'user123' }

  const component = render(<BlogForm fn={addBlog} isLoggedIn={true} user={userID} />)

  const user = userEvent.setup()
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const button = component.getByText('create')


  await userEvent.type(title, 'Test Title')
  await userEvent.type(author, 'Test Author')
  await userEvent.type(url, 'Test Url')
  await user.click(button)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('Test Title')
  expect(addBlog.mock.calls[0][0].author).toBe('Test Author')
  expect(addBlog.mock.calls[0][0].url).toBe('Test Url')
})

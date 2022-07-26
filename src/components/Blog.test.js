/* eslint-disable quotes */
import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test("renders blog's title and author but not url or number of likes", () => {
  const blog = {
    "title": "a blog for testing rendering",
    "author": "JD",
    "url": "http://somelink.com",
    "likes": 2
  }

  render(<Blog blog={blog} />)
  const element = screen.getByText("a blog for testing rendering JD")
  expect(element).toBeDefined()
  const url = screen.queryByText("http://somelink.com")
  expect(url).toBeNull()
  const likes = screen.queryByText("2")
  expect(likes).toBeNull()
})
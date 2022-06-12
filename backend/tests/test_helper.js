const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'First Blog',
    author: 'Test Author',
    url: 'http://www.test.com',
    likes: 0
  },
  {
    title: 'Second Blog',
    author: 'Test Author',
    url: 'http://www.test.com',
    likes: 0
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Non-existent Blog',
    author: 'Test Author',
    url: 'http://www.test.com',
    likes: 0
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
}
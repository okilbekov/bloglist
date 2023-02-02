const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    'title': 'first blog',
    'author': 'first person',
    'url': 'http://example.com',
    'likes': 12
  },
  {
    'title': 'second blog',
    'author': 'second person',
    'url': 'http://example.com',
    'likes': 1321
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    'title': 'will remove this soon',
    'author': 'nobody',
    'url': 'http://example.com',
    'likes': 0
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
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}
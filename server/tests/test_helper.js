const Blog = require('../models/blog')

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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}
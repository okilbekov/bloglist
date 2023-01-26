const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'new blog',
    author: 'someone',
    url: 'www.example.com/blogs/new_blog',
    likes: 12
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const titles = blogsAtEnd.map(blog => blog.title)

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  expect(titles).toContain('new blog')
})

test('if likes property missing, it defaults to 0', async () => {
  const newBlog = {
    title: 'new blog',
    author: 'someone',
    url: 'www.example.com/blogs/new_blog',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)

  const blogsAtEnd = await helper.blogsInDb()
  const newBlogLikes = blogsAtEnd.find(blog => blog.title === 'new blog').likes
  expect(newBlogLikes).toEqual(0)
})

test('blog without title is not saved', async () => {
  const blogWithoutTitle = {
    author: 'someone',
    url: 'www.example.com/blogs/new_blog',
    likes: 12
  }

  await api
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('blog without author is not saved', async () => {
  const blogWithoutAuthor = {
    title: 'new blog',
    url: 'www.example.com/blogs/new_blog',
    likes: 12
  }

  await api
    .post('/api/blogs')
    .send(blogWithoutAuthor)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})

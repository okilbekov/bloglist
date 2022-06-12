const totalLikes = (blogs) => {
  return blogs.reduce((sum, current) => sum + current.likes, 0)
}

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  const blogWithMaxLikes = blogs.find(blog => blog.likes === maxLikes)
  return blogWithMaxLikes === undefined
    ? undefined
    : (({ title, author, likes }) => ({ title, author, likes }))(blogWithMaxLikes)
}

const mostBlogs = (blogs) => {
  const authors = {}
  for(const blog of blogs) {
    authors[blog.author] = (authors[blog.author] || 0) + 1
  }

  let authorWithMostBlogs = {}
  for(const [author, blogs] of Object.entries(authors)) {
    if(blogs > (authorWithMostBlogs.blogs || 0)) {
      authorWithMostBlogs = { author, blogs }
    }
  }
  return authorWithMostBlogs
}

const mostLikes = (blogs) => {
  const authors = {}
  for(const blog of blogs) {
    authors[blog.author] = (authors[blog.author] || 0) + blog.likes
  }

  let authorWithMostLikes = {}
  for(const [author, likes] of Object.entries(authors)) {
    if(likes > (authorWithMostLikes.likes || 0)) {
      authorWithMostLikes = { author, likes }
    }
  }
  return authorWithMostLikes
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
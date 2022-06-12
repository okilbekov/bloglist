const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const listWithManyBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 25,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Mike Tyson',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 0,
    __v: 0
  }
]

const listWithNoBlog = []

describe('total likes', () => {

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of multiple blogs is counted right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(35)
  })

  test('when list has no blogs is zero', () => {
    const result = listHelper.totalLikes(listWithNoBlog)
    expect(result).toBe(0)
  })
})

describe('favorite blog', () => {
  test('when list has only one blog, is the only blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    const expected = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    }
    expect(result).toEqual(expected)
  })

  test('when list has multiple blogs is found correctly', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    const expected = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 25,
    }
    expect(result).toEqual(expected)
  })

  test('when list has no blogs is undefined', () => {
    const result = listHelper.favoriteBlog(listWithNoBlog)
    expect(result).toBeUndefined()
  })
})

describe('most blogs', () => {

  test('when list has only one blog, is the only blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    const expected = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    }
    expect(result).toEqual(expected)
  })

  test('when list has multiple blogs is found correctly', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs)
    const expected = {
      author: 'Edsger W. Dijkstra',
      blogs: 3
    }
    expect(result).toEqual(expected)
  })
})

describe('most likes', () => {

  test('when list has only one blog, is the only blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    expect(result).toEqual(expected)
  })

  test('when list has multiple blogs is found correctly', () => {
    const result = listHelper.mostLikes(listWithManyBlogs)
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 35
    }
    expect(result).toEqual(expected)
  })
})
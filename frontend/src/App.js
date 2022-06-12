import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Header from './components/Header'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      console.log('wrong credentials')
    }
  }

  const blogForm = () => {
    return (
      <BlogForm
        blogs={blogs}
        setBlogs={setBlogs}
      />
    )
  }

  return (
    <div>
      <Header 
        handleLogin={handleLogin} user={user}
        username={username} setUsername={setUsername}
        password={password} setPassword={setPassword}
      />

      <main className='main container'>
        {user !== null && blogForm()}

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </main>
    </div>
  )
}

export default App

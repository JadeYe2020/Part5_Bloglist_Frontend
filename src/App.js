import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import UserInfo from './components/UserInfo'
import CreateNew from './components/CreateNew'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)      
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      
      // console.log('user.token', user.token)

      blogService.setToken(user.token)
      setUser(user)
      // reset login form
      setUsername('')
      setPassword('')
    } catch (exception) {
      alert('Wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleCreate = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogService.create({
        title, author, url
      })

      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      alert('error while creating new blog post')
    }
  }

  if (user === null) {
    return (      
      <LoginForm handleLogin={handleLogin} 
        username={username} password={password}
        onUsernameChange={({target}) => setUsername(target.value)}
        onPasswordChange={({target}) => setPassword(target.value)}
      />
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <UserInfo 
        nameLogged={user.name}
        handleLogout={handleLogout}
      />
      <h2>create new</h2>
      <CreateNew
        handleCreate={handleCreate}
        title={title} author={author} url={url}
        onTitleChange={({target}) => setTitle(target.value)}
        onAuthorChange={({target}) => setAuthor(target.value)}
        onUrlChange={({target}) => setUrl(target.value)}
      />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
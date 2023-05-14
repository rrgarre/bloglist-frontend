import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LogOutButton from './components/LogOutButton'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  useEffect(()=>{
    if(window.localStorage.loggedUser){
      const loggedUser = JSON.parse(window.localStorage.loggedUser)
      setUser(loggedUser)
    }
  }, [])

  return (
    <>
      {
        user === null
          ? <>
              <h2>log in to application</h2>
              <LoginForm 
                // handleSubmit={handleSubmit}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                setUser={setUser}
              />
            </>
          : <div>
              <h2>blogs</h2>
              <p>{user.username} logged in <LogOutButton setUser={setUser}/></p>
              <BlogForm/>

              {blogs.map(blog =>
                <Blog key={blog._id} blog={blog} />
              )}
            </div>
      }
    </>    
  )
  
}

export default App
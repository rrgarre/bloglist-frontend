import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LogOutButton from './components/LogOutButton'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import MessageAlert from './components/MessageAlert'
import blogService from './services/blogs'
import './style.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [messageAlert, setMessageAlert] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  useEffect(()=>{
    if(window.localStorage.loggedUser){
      const loggedUser = JSON.parse(window.localStorage.loggedUser)
      setUser(loggedUser)
      blogService.setNewToken(loggedUser.token)
    }
  }, [])

  return (
    <>
      <MessageAlert notification={messageAlert}/>
      {
        user === null
          ? <>
              <h2>log in to application</h2>
              <LoginForm 
                setUser={setUser}
                setMessage={setMessageAlert}
              />
            </>
          : <div>
              <h2>blogs</h2>
              <p>{user.username} logged in <LogOutButton setUser={setUser}/></p>
              <BlogForm 
                blogs={blogs} 
                setBlogs={setBlogs} 
                setMessage={setMessageAlert}/>

              {blogs.map(blog =>
                <Blog key={blog._id} blog={blog} />
              )}
            </div>
      }
    </>    
  )
}

export default App
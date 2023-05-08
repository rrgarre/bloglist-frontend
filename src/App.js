import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

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


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const userReturned = await loginService({username, password})
      console.log('usuario retornado: ', userReturned)
      setUser(userReturned)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log({error: 'Usuario Incorrecto'})
    }

  }

  return (
    <>
      {
        user === null
          ? <>
              <h2>log in to application</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    type='text'
                    name='Username'
                    value={username}
                    onChange={({target})=>{setUsername(target.value)}}
                  />
                </div>
                <div>
                  <input
                    type='password'
                    name='Password'
                    value={password}
                    onChange={({target})=>{setPassword(target.value)}}
                  />
                </div>
                <button type='submit'>login</button>
              </form>
            </>
          : <div>
              <h2>blogs</h2>
              <p>{user.username} logged in</p>
              {blogs.map(blog =>
                <Blog key={blog._id} blog={blog} />
              )}
            </div>
      }
    </>    
  )


  // if(user)
  //   return (
  //     <div>
  //       <h2>blogs</h2>
  //       <p>{user.username} logged in</p>
  //       {blogs.map(blog =>
  //         <Blog key={blog.id} blog={blog} />
  //       )}
  //     </div>
  //   )
  // return (
  //   <>
  //     <h2>log in to application</h2>
  //     <form onSubmit={handleSubmit}>
  //       <div>
  //         <input
  //           type='text'
  //           name='Username'
  //           value={username}
  //           onChange={({target})=>{setUsername(target.value)}}
  //         />
  //       </div>
  //       <div>
  //         <input
  //           type='password'
  //           name='Password'
  //           value={password}
  //           onChange={({target})=>{setPassword(target.value)}}
  //         />
  //       </div>
  //       <button type='submit'>login</button>
  //     </form>
  //   </>
  // )
  
}

export default App
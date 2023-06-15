import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LogOutButton from './components/LogOutButton'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import MessageAlert from './components/MessageAlert'
import Toggable from './components/Toggable'
import blogService from './services/blogs'
import utilMessageAlert from './utils/MessageAlert'
import './style.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [messageAlert, setMessageAlert] = useState(null)

  const blogFormRef = useRef()

  // useEffect(() => {
  //   blogService.getAll()
  //     .then(blogs =>
  //       setBlogs( blogs )
  //     )  
  // }, [])
  useEffect(()=>{
    blogService.getAll()
      .then(respuesta => {
        console.log('Lista en crudo: ', respuesta)
        // respuesta.sort((a,b) => {
        //   if(a.likes < b.likes)
        //     return 1
        //   if(a.likes > b.likes)
        //     return -1  
        //   return 0
        // })
        setBlogs(ordenarListaBlogs(respuesta))
      })
  }, [])
  useEffect(()=>{
    if(window.localStorage.loggedUser){
      const loggedUser = JSON.parse(window.localStorage.loggedUser)
      setUser(loggedUser)
      blogService.setNewToken(loggedUser.token)
    }
  }, [])

  ///////// Ordenar Lista de Blogs //////////////
  const ordenarListaBlogs = (lista) => {
    return lista.sort((a,b) => {
      if(a.likes < b.likes)
          return 1
        if(a.likes > b.likes)
          return -1  
        return 0
    })
  }
  ///////// Ordenar Lista de Blogs //////////////

  ///////// Crear nueva BLOG //////////////
  const newBlog = async (blog) => {
    try {
      const blogReturned = await blogService.postBlog(blog)
      console.log('Lista de blogs: ', ordenarListaBlogs(blogs.concat(blogReturned)))
      // setBlogs(blogs.concat(blogReturned))
      setBlogs(ordenarListaBlogs(blogs.concat(blogReturned)))
      blogFormRef.current.toggleVisibility()
      utilMessageAlert(
        setMessageAlert,
        {
          'message': 'Blog posteado con exito!',
          'type': 'info'
        }
      )
    } catch (error) {
      console.log('Error desde newBlog: ', error)
    }
  }
  ///////// Crear nueva Blog //////////////

  ///////// Sumar LIKE //////////////
  const newLike = async (blog) => {
    try {
      const id = blog._id
      console.log('El blog ORIGEN en newLike: ', blog)
      const blogUpLike = {...blog, likes:blog.likes+1}
      console.log('El blog ACTUALIZADO en newLike: ', blogUpLike)
      const blogReturned = await blogService.putBlog(blogUpLike)
      console.log('El blog RETORNADO en newLike: ', blogReturned)
      // Se sustituye el blog retornado en el estado de lista de blogs de la app
      setBlogs(ordenarListaBlogs(blogs.map(b => b._id===id ? blogReturned : b)))
    } catch (error) {
      console.log('Error al añadir Like: ', error)
    }
  }
  ///////// Sumar LIKE //////////////

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
              <Toggable buttonLabel={'new note'} ref={blogFormRef}>
                <BlogForm 
                  newBlog={newBlog}
                />
              </Toggable>
              <hr></hr>
              {blogs.map(blog =>
                <Blog key={blog._id} blog={blog} newLike={newLike} />
              )}
            </div>
      }
    </>    
  )
}

export default App
import { useState } from "react"

const Blog = ({blog, newLike}) => {

  const [ visible, setVisible ] = useState(false)
  console.log('Contenido de blog: ', blog)
  return(
    <div className="blog">
      {/* <p>{blog.title}</p> by: <i>{blog.author}</i> */}
      <p>
        {blog.title}  
        <button onClick={()=>{setVisible(!visible)}}>
          {
            !visible
              ? 'view'
              : 'hide'
          }
        </button>
      </p>
      {
        visible && (
          <>
            <p>{blog.url}</p>
            <p>likes {blog.likes} <button onClick={()=>{newLike(blog)}}>like</button></p>
            <p>{blog.author}</p>
          </>
        )
      }
    </div>  
  )
}

export default Blog
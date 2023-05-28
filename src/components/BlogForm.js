import { useState } from "react"

const BlogForm = ({newBlog}) => {

  const [ title, setTitle ] = useState('')
  const [ url, setUrl ] = useState('')
  const [ likes, setLikes ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const blog = {
      'title': title,
      'url': url,
      'likes': likes
    }
    
    newBlog(blog)
    setTitle('')
    setUrl('')
    setLikes('')
  }

  return(
    <>
      <h2>Post a new Blog</h2>
      <form onSubmit={(event)=>{handleSubmit(event)}}> 
        <div>
          <input
            placeholder="Title"
            type="text"
            name="title"
            value={title}
            onChange={({target})=>{setTitle(target.value)}}
          />
        </div>
        <div>
          <input
            placeholder="Url"
            type="text"
            name="url"
            value={url}
            onChange={({target})=>{setUrl(target.value)}}
          />
        </div>
        <div>
          <input
            placeholder="Likes"
            type="number"
            name="likes"
            value={likes}
            onChange={({target})=>{setLikes(target.value)}}
          />
        </div>
        <button type="submit">post blog</button>
      </form>
    </>


  )
}

export default BlogForm
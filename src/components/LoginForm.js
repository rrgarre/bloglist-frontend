import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'


const LoginForm = ({setUser}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmitt = async (setUser) => {
    try {
      const userReturned = await loginService({username, password})
      console.log('usuario retornado: ', userReturned)
      window.localStorage.setItem('loggedUser', JSON.stringify(userReturned))
      setUser(userReturned)
      blogService.setNewToken(userReturned.token)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log({error: 'Usuario Incorrecto'})
    }
  }


  return(
    <form onSubmit={(event)=>{
      event.preventDefault()
      handleSubmitt(setUser)
    }}>
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
  )
}

export default LoginForm
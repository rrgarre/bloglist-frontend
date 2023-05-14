import loginService from '../services/login'

const handleSubmitt = async (username, setUsername, password, setPassword, setUser) => {
  try {
    const userReturned = await loginService({username, password})
    console.log('usuario retornado: ', userReturned)
    window.localStorage.setItem('loggedUser', JSON.stringify(userReturned))
    setUser(userReturned)
    setUsername('')
    setPassword('')
  } catch (error) {
    console.log({error: 'Usuario Incorrecto'})
  }
}

const LoginForm = ({username, setUsername, password, setPassword, setUser}) => {
  return(
    // <form onSubmit={handleSubmitt}>
    <form onSubmit={(event)=>{
      event.preventDefault()
      handleSubmitt(username, setUsername, password, setPassword, setUser)
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
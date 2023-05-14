const logout = (setUser) => {
  window.localStorage.removeItem('loggedUser')
  setUser(null)
}

const LogOutButton = ({setUser}) => {
  return(
    <button onClick={()=>{logout(setUser)}}>
      logout
    </button>
  )
}

export default LogOutButton
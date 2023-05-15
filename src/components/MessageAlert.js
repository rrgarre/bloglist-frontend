const messageAlert = ({notification}) => {
  
  if(notification !== null){
    return(
      <div className={notification.type}>
        <p>{notification.message}</p>
      </div>
    )
  }
}

export default messageAlert
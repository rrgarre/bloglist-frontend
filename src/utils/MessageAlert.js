const MessageAlert = (setMessage, config) => {
  setMessage(config)
  console.log('DESDE UTILS/MESSAGEALERT')
  setTimeout(()=>{
    setMessage(null)
  },3000)
}

export default MessageAlert

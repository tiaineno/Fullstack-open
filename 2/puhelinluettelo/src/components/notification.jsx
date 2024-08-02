const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    const nstyle = {color: 'white',
      background: message[1],
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
    return (
      <div style={nstyle}>
        {message[0]}
      </div>
    )
  }
  
export default Notification
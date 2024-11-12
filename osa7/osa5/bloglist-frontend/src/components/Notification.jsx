import { connect } from 'react-redux'

const Notification = ({ message, color }) => {
  const notification = {
    color: color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  return (
    <div style={notification}>
      {message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.notification.message,
    color: state.notification.color
  }
}

export default connect(mapStateToProps)(Notification)
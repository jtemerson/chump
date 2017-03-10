import React, {Component} from 'react'
import {connect} from 'react-redux'
import {hashHistory} from 'react-router'
import {MessageActions, UserActions} from '../../store'

const {sendMessage, listen} = MessageActions
const {getUser} = UserActions

class HomeScreen extends Component {
  componentDidMount() {
    const {user} = this.props
    if (user)
      listen()
    else
      getUser()
  }
  render() {

    const {user, messages} = this.props
    if (!user) {
      requestAnimationFrame(()=>hashHistory.push('/login'))
      return null
    }

    let textInput = null

    const submit = (e)=>{
      e.preventDefault()
      sendMessage({value: textInput.value})
      textInput.value = ''
    }

    return (
      <form onSubmit={submit}>
      <legend>Comments:</legend>
        {messages.map((msg)=>{
          if (msg.type === 'text')
            return (
              <a href="#" className="list-group-item" key={msg.id}>{msg.data.value}</a>
            )
        })}
        <div className="row">
          <div className="col-md-3">
            <p><input className="form-control messageForm" required placeholder="Enter Message" type="text" id="messageInput" ref={el=>textInput = el}/></p>
            <button className="btn btn-success">Send</button>
          </div>
        </div>
      </form>
    )
  }
}

export default connect(
  state=>({
    user: state.user,
    messages: state.messages
  })
)(HomeScreen)

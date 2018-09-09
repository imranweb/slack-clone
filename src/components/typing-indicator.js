import React, { Component } from 'react'

class TypingIndicator extends Component {
  render() {
    console.log("typing...", this.props.usersTyping)
    if (this.props.usersTyping.length > 0) {
      return (
        <div>
          hello
          {`${this.props.usersTyping
            .slice(0, 2)
            .join(' and ')} is typing`}
        </div>
      )
    }
    return <div />
  }
}

export default TypingIndicator
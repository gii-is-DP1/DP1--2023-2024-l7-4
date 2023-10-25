import React, { Component, useContext } from 'react';

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      newMessage: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({ newMessage: e.target.value });
  };

  handleSendMessage = () => {
    const { newMessage, messages } = this.state;
    if (newMessage) {
      messages.push(newMessage);
      this.setState({ messages, newMessage: '' });
    }
  };

  handleDeleteMessage = (index) => {
    const { messages } = this.state;
    messages.splice(index, 1);
    this.setState({ messages });
  };
  handleReportarMessage = (index) => {
  
  };

  render() {
    return (
      <div className="chat-container">
        <div className="text">
        <text> </text>
        </div>
        <div className="chat-messages">
          {this.state.messages.map((message, index) => (
            <div key={index} className="message">
              {message}
              <button  onClick={() => this.handleDeleteMessage(index)}>Delete</button>
              <button onClick={() => this.handleReportarMessage(index)}>Report</button>
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Write your message..."
          value={this.state.newMessage}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSendMessage}>Send</button>
      </div>
    );
  }
}

export default Chat;

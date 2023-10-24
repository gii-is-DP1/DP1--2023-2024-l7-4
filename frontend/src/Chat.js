import React, { Component } from 'react';

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
        <div className="chat-messages">
          {this.state.messages.map((message, index) => (
            <div key={index} className="message">
              {message}
              <button  onClick={() => this.handleDeleteMessage(index)}>Borrar</button>
              <button onClick={() => this.handleReportarMessage(index)}>Reportar</button>
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          value={this.state.newMessage}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSendMessage}>Enviar</button>
      </div>
    );
  }
}

export default Chat;

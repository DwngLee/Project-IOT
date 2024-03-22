import React, { Component } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

interface State {
  message: string;
  receivedMessage: string;
}

class WebSocketComponent extends Component<{}, State> {
  private stompClient: Stomp.Client | null = null;

  constructor(props: {}) {
    super(props);
    this.state = {
      message: "",
      receivedMessage: "",
    };
  }

  componentDidMount() {
    this.connect();
  }

  connect = () => {
    const socket = new SockJS("ws://localhost:8080/ws"); // Thay đổi thành endpoint thực tế
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (frame) => {
      console.log("Connected: " + frame);
      this.stompClient!.subscribe("/topic/product", (message) => {
        this.setState({ receivedMessage: message.body });
      });
    });
  };

  sendMessage = () => {
    if (this.stompClient) {
      this.stompClient.send(
        "/app/products",
        {},
        JSON.stringify({ message: "Hello, Server!" })
      );
    }
  };

  render() {
    return (
      <div>
        <div>Received Message: {this.state.receivedMessage}</div>
        <button onClick={this.sendMessage}>Send Message</button>
      </div>
    );
  }
}

export default WebSocketComponent;

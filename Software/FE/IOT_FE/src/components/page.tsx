import React, { useState, useEffect } from "react";
import Stomp, { client } from "stompjs";
import SockJS from "sockjs-client";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [nickname, setNickname] = useState("");
  const [stompClient, setStompClient] = useState<any>(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe("/topic/device", (message) => {
        const receivedMessage = JSON.parse(message.body);
      
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });
    });

    setStompClient(client);

    return () => {
      client.disconnect();
    };
  }, []);

  const handleNicknameChange = (event: any) => {
    setNickname(event.target.value);
  };

  const handleMessageChange = (event: any) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    if (message.trim()) {
      const chatMessage = {
        nickname,
        content: message,
      };

      stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
      setMessage("");
    }
  };

  return (
    <div>Hehe</div>
    // <div>
    //   <List>
    //     {messages.map((msg, index) => (
    //       <ListItem key={index}>
    //         <ListItemAvatar>
    //           <Avatar>{msg.nickname.charAt(0)}</Avatar>
    //         </ListItemAvatar>
    //         <ListItemText
    //           primary={
    //             <Typography variant="subtitle1">{msg.nickname}</Typography>
    //           }
    //           secondary={msg.content}
    //         />
    //       </ListItem>
    //     ))}
    //   </List>

    //   <div style={{ display: "flex", alignItems: "center" }}>
    //     <TextField
    //       placeholder="Enter your nickname"
    //       value={nickname}
    //       onChange={handleNicknameChange}
    //       autoFocus
    //     />
    //     <TextField
    //       placeholder="Type a message"
    //       value={message}
    //       onChange={handleMessageChange}
    //       fullWidth
    //     />
    //     <IconButton onClick={sendMessage} disabled={!message.trim()}>
    //       send
    //     </IconButton>
    //   </div>
    // </div>
  );
};

export default App;

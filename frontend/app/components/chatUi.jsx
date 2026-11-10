import { Component } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from '@mui/icons-material/Close';
import Message from "./Message";
import React from 'react';


const sendMessage = async (message, history) => {
  const response = await fetch("http://localhost:8000/evaluate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      history: history.map(({ content, role }) => ({ content, role })),
    }),
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  return response.body.pipeThrough(new TextDecoderStream()).getReader();
};

class ChatUi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [{
            role: "assistant",
            content: "Hi! Tell me about a student and I'll help you evaluate their performance."
            }],
            loading: false,
            userInput: ""
        };

        this.stopFetching = this.stopFetching.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
    }

    stopFetching() {
        this.stop = true;
    }

async handleSendMessage() {
  const { messages, userInput } = this.state;
  if (userInput === "") return;

  const newMessages = [...messages, { role: "user", content: userInput }];
  const history = messages.slice(1); // drop the greeting

  this.stop = false;
  this.setState({ messages: newMessages, userInput: "", loading: true });

  try {
    const stream = await sendMessage(userInput, history);
    let response = "";
    let first = true;

    while (true) {
      const { value, done } = await stream.read();

      if (this.stop) {
        await stream.cancel();
        break;
      }
      if (done) break;

      response += value; // only append when there is a value

      const isScrolledToBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 5;

      this.setState(
        { messages: [...newMessages, { role: "assistant", content: response }] },
        () => {
          if (isScrolledToBottom || first) {
            window.scrollTo({ top: document.body.scrollHeight });
          }
          first = false;
        }
      );
    }
  } catch (err) {
    this.setState({
      messages: [...newMessages, { role: "assistant", content: `Error: ${err.message}` }],
    });
  }

  this.setState({ loading: false });
}

    render() {
        const { messages, userInput, loading } = this.state;
        return (
            // <Container maxWidth="md">
            //     <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            //         <h1>Your Personal AI</h1>
            //         <div style={{ flexGrow: 1 }}>
            //             {messages.map((message, index) =>
            //                 <>
            //                     <Message {...message} />
            //                     {index === 0 ? <hr /> : null}
            //                 </>
            //             )}
            //         </div>
            //         <div style={{ display: "flex", marginTop: "2em" }}>
            //             <TextField
            //                 fullWidth
            //                 value={userInput}
            //                 multiline
            //                 maxRows={Infinity}
            //                 onChange={(e) => this.setState({ userInput: e.target.value })}
            //                 onKeyDown={(e) => {
            //                     if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
            //                         this.handleSendMessage();
            //                     }
            //                 }}
            //                 placeholder="Type your message"
            //                 variant="outlined"
            //                 className="input-box"
            //             />
            //             <IconButton color="primary" aria-label="send message" component="span" onClick={loading ? this.stopFetching : this.handleSendMessage}>
            //                 {!loading ? <SendIcon /> : <CloseIcon />}
            //             </IconButton>
            //         </div>
            //     </div>
            // </Container >
            <Container maxWidth="md" style={{ position: 'relative', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "1em" }}>
        <h1 style={{ 
            fontFamily: 'Helvetica, sans-serif', 
            color: 'black', 
            textAlign: 'center',  
            fontWeight: 'bold',  
            fontSize: '1.5em'    
        }}>
            Student Evaluator
        </h1>
          <div style={{ flexGrow: 1 }}>
            {messages.map((message, index) =>
              <React.Fragment key={index}>
                <Message {...message} />
                {index === 0 ? <hr style={{ marginTop: '0.5em', marginBottom: '0.5em' }} /> : null}
              </React.Fragment>
            )}
          </div>
          <div style={{ display: "flex", marginTop: "2em" }}>
            <TextField
              fullWidth
              value={userInput}
              multiline
              maxRows={Infinity}
              onChange={(e) => this.setState({ userInput: e.target.value })}
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                  this.handleSendMessage();
                }
              }}
              placeholder="Type your message"
              variant="outlined"
              className="input-box"
              style={{ marginRight: '1em' }}
            />
            <IconButton color="primary" aria-label="send message" component="span" onClick={loading ? this.stopFetching : this.handleSendMessage}>
              {!loading ? <SendIcon /> : <CloseIcon />}
            </IconButton>
          </div>
        </div>
      </Container>
        );
    }
}

export default ChatUi;
"use client"
import { useChat } from "ai/react";
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export default function ChatComponent() {
  // Vercel AI SDK (ai package) useChat()
  // useChat -> handles messages for us, user input, handling user submits, etc.
  const { input, handleInputChange, handleSubmit, isLoading, messages } = useChat();
  // messages -> [user asks a question, gpt-4 response, user asks again, gpt-4 responds]

  console.log(messages);
  console.log(input);

  return (
    <div>
      {messages.map((message) => {
        return (
          <div key={message.id}>
            {/*  Name of person talking */}
            {message.role === "assistant" ? (
                <div className="flex items-center">
                <SupportAgentIcon sx={{ fontSize: 36, color: '#FFA500', marginRight: '8px' }} />
                <h3 className="text-lg font-semibold mt-2 text-orange-500">
                  Agent
                </h3>
              </div>
                ) : (
                <div className="flex items-center">
                    <AccountCircleIcon sx={{ fontSize: 36, color: 'black', marginRight: '8px' }} />
                    <h3 className="text-lg font-semibold mt-2 text-black">
                    You
                    </h3>
                </div>
                )}

            {/* Formatting the message */}
            {message.content.split("\n").map((currentTextBlock, index) => {
            if (currentTextBlock === "") {
                return <p key={message.id + index}>&nbsp;</p>; // " "
            } else {
                return (
                <p
                    key={message.id + index}
                    className={message.role === "assistant" ? "text-orange-300" : "text-gray-500"}
                    style={{ marginBottom: message.role === "assistant" ? '25px' : '0' }} 
                >
                    {currentTextBlock}
                </p>
                );
            }
            })}
          </div>
        );
      })}

      <form className="mt-12" onSubmit={handleSubmit}>
      {/* <p className="flex items-center text-orange-500">
    `    <Avatar
            alt="User Avatar"
            src="path/to/your/avatar-image.jpg" // Replace with the actual path or source for the user's avatar image
            sx={{ bgcolor: '#2196F3', marginRight: '8px' }} // Adjust the background color as needed
        />
        User Message
        </p>` */}
        <textarea
            className="mt-2 w-full bg-gray-300 p-2 text-gray-700 rounded-md"
            placeholder="Type Here..."
            value={input}
            onChange={handleInputChange}
        />
        <button className="rounded-md bg-orange-500 p-2 mt-2 text-white">
          Send message
        </button>
      </form>
    </div>
  );
}

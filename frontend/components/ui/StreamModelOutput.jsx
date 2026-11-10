import { useState } from 'react';

export default function StreamModelOutput() {
  const [inputMessage, setInputMessage] = useState('');
  const [stream, setStream] = useState(null);

  const handleSubmit = async () => {
    try {
      // GPT-4 system message
     

      // Create a chat completion with OpenAI
      const response = await fetch('/evaluate-student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: inputMessage }],
        }),
      });

      // Create a stream of data from the response
      const newStream = await response.text();
      setStream(newStream);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Streaming Model Output</h1>
      <textarea
        placeholder="Enter input message..."
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      {stream && (
        <div>
          <h2>Streamed Data:</h2>
          <pre>{stream}</pre>
        </div>
      )}
    </div>
  );
}

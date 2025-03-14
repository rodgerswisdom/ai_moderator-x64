import { useState } from "react";
import { Bold, Italic, Link, Paperclip, Send, Text } from "lucide-react";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { text: input, sender: "user" },
      { text: `AI Response to: "${input}"`, sender: "ai" }, // Simulating AI response
    ];
    setMessages(newMessages);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 w-1/2 p-4">
      <h1 className="text-xl font-semibold text-black mb-4">Chat Window</h1>
      

{/* Chat Input */}
<div className="border rounded-xl p-4 shadow-md bg-white w-screen max-w-lg mt-2">
        <div className="flex items-center space-x-2 mb-2">
          <Bold className="text-gray-500 cursor-pointer" size={18} />
          <Italic className="text-gray-500 cursor-pointer" size={18} />
          <Text className="text-gray-500 cursor-pointer" size={18} />
          <Link className="text-gray-500 cursor-pointer" size={18} />
          <Paperclip className="ml-auto text-gray-500 cursor-pointer" size={18} />
        </div>
        <textarea
          className="w-full border rounded-md p-2 outline-none text-gray-700"
          placeholder="How can I help you?"
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <div className="flex items-center justify-between mt-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex items-center"
            onClick={sendMessage}
          >
            <Send size={18} className="mr-1" /> Send message
          </button>
        </div>
      </div>
      <br /><br />

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-2 p-2 bg-white shadow-md rounded-md">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-xs ${
              msg.sender === "user" ? "ml-auto bg-blue-500 text-white" : "mr-auto bg-gray-300 text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default ChatWindow;

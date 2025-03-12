import { useState } from "react";

function ChatInput({onSend}){
    const [message, setMessage] = useState("");

    const handleChange = (event)=>{
        setMessage(event.target.value)
    }

    const handleSend = ()=>{
        if (message.trim !== ""){
            onSend(message)
            setMessage("")
    }
    
    return(
        <div className="flex items-center p-4 border-t bg-white">
            
                <textarea
                    type = "textarea"
                    value = {message}
                    onChange = { handleChange }
                    placeholder = "Ask Anything"
                    className = "bg-white text-black flex-1 border rounded-lg"
                />
                <button onClick = { handleSend } className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg">Send</button>
            
        </div>
    )

  }
}
export default ChatInput;

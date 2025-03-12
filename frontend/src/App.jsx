import React from "react";
import ChatWindow from "./components/ChatWindow";
import ChatHistory from "./components/ChatHistory";
import ChatInput from "./components/ChatInput";
import BlankSpace from "./components/BlankSpace";
import sendMessageToAI from "./services/api";

export default function App(){
    const [chatResponse, setChatResponse] = useState(null);

    const handleSend = async (message) =>{
        try{
            const res = await sendMessageToAI(message)
            setChatResponse(res)
        } catch(e){
            setChatResponse(`Error to send chat ${e}`);
        }
    }

    return(
        <div className="flex h-screen w-screen">
            <ChatHistory />
            <div className="flex-1 flex flex-col">
                <ChatWindow  chatResponse={chatResponse}/>
                 <ChatInput onSend ={handleSend}/>
            </div>
            <BlankSpace />
            
        </div>
    );
}

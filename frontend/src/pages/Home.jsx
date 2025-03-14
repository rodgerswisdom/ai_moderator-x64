import React from "react";
import ChatWindow from "../components/ChatWindow";
import ChatHistory from "../components/ChatHistory";
import BlankSpace from "../components/BlankSpace";


export default function Home() {
    return (
        <div className="flex  flex-row w-screen  ">
            <ChatHistory />
            <div className="flex flex-col items-center justify-center align-center w-screen min-h-screen  p-4">
                <ChatWindow />
            </div>
            <BlankSpace />
        </div>
    );
}

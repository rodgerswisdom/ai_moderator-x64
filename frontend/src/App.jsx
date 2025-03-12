import React from "react";
import Login from "./components/auth/Login";
import Signup from "./components/auth/SignUp";


export default function App() {
    return (
        <>
            <div className="flex h-screen w-screen">
                <div className="flex h-screen w-screen">
                    <h1>educonnect</h1>
                    <div>
                        <button>Signup</button>
                        <button>Login</button>
                    </div>
                </div>
            </div>
        </>
    );
}

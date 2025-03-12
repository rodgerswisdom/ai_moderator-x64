import React from "react";
import Login from "./components/auth/Login";
import Signup from "./components/auth/SignUp";


export default function App() {
    return (
        <>
            <div className="flex h-screen w-screen">
                {/* <Login /> */}
                <Signup />
            </div>
        </>
    );
}

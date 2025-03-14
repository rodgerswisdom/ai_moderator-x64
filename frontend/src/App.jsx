import React from "react";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Home from "./pages/Home";
import Navbar from "./components/layout/Navbar";

import { BrowserRouter, Route, Routes } from "react-router-dom"; // FIX: Use 'react-router-dom'

export default function App() {
    return (
        <div className="min-h-screen w-full h-screen flex flex-col">
            {/* Navbar Always Visible */}
            <BrowserRouter>
                
                <main className="flex-grow bg-gray-100">
                <Navbar />
                    <Routes>
                        
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    );
}

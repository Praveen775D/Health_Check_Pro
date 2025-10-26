import React, { useState, useEffect } from "react";
import OpenAI from "openai";
import { useSpeechSynthesis, useSpeechRecognition } from "react-speech-kit";

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

const AIChatbot = () => {
    const [input, setInput] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const { speak } = useSpeechSynthesis();
    const { listen, stop } = useSpeechRecognition({
        onResult: (result) => setInput(result),
    });

    useEffect(() => {
        fetchChatHistory();
    }, []);

    const fetchChatHistory = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/chat/history");
            const data = await response.json();
            setChatHistory(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching chat history:", error);
            setChatHistory([]);
        }
    };

    const handleChat = async () => {
        if (!input.trim()) return;
        setLoading(true);

        try {
            const chatResponse = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    ...chatHistory.map(chat => ({ role: "user", content: chat.userMessage })),
                    { role: "user", content: input }
                ],
            });

            const aiText = chatResponse.choices[0].message.content;
            const newChat = { userMessage: input, aiResponse: aiText };

            setChatHistory([...chatHistory, newChat]);
            speak({ text: aiText });

            await fetch("http://localhost:5000/api/chat/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newChat),
            });

            setInput("");
        } catch (error) {
            console.error("OpenAI Error:", error);
        }
        setLoading(false);
    };

    const handleDeleteMessage = async (id) => {
        await fetch(`http://localhost:5000/api/chat/delete/${id}`, { method: "DELETE" });
        fetchChatHistory();
    };

    const handleClearChat = async () => {
        await fetch("http://localhost:5000/api/chat/clear", { method: "DELETE" });
        setChatHistory([]);
    };

    return (
        <div className="relative w-screen h-screen bg-cover bg-center" style={{ backgroundImage: "url('/AI.jpg')" }}>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/4 -translate-y-1/2 bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96 animate-fadeIn">
                <h2 className="text-xl font-bold flex items-center">
                    <span className="mr-2">🤖</span> Health AI Chatbot
                </h2>
                <div className="h-40 overflow-y-auto bg-gray-800 p-3 rounded-lg mb-3">
                    {chatHistory.length > 0 ? chatHistory.map((msg, index) => (
                        <div key={index} className="flex items-center justify-between my-2">
                            <div className="flex items-center">
                                <img
                                    src={msg.userMessage ? "/user-avatar.png" : "/ai-avatar.png"}
                                    alt={msg.userMessage ? "User" : "AI"}
                                    className="w-8 h-8 rounded-full mr-2"
                                />
                                <div className={`p-2 rounded-md ${msg.userMessage ? "bg-blue-500 text-right" : "bg-green-500 text-left"}`}>
                                    {msg.userMessage || msg.aiResponse}
                                </div>
                            </div>
                            <button
                                className="ml-2 bg-red-500 text-white p-1 rounded hover:bg-red-400 transition"
                                onClick={() => handleDeleteMessage(msg._id)}
                            >
                                🗑
                            </button>
                        </div>
                    )) : <p className="text-gray-400">No chat history available.</p>}
                    {loading && <p className="text-gray-400 animate-pulse">AI is typing...</p>}
                </div>
                <div className="mt-4">
                    <input
                        type="text"
                        className="w-full p-3 text-black rounded-md"
                        placeholder="Ask a health question..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <div className="flex space-x-2 mt-2">
                        <button className="flex-1 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-400 transition" onClick={handleChat}>
                            Send
                        </button>
                        <button className="flex-1 bg-green-500 text-white p-2 rounded-lg hover:bg-green-400 transition" onClick={() => listen()}>
                            🎤 Speak
                        </button>
                        <button className="flex-1 bg-red-500 text-white p-2 rounded-lg hover:bg-red-400 transition" onClick={() => stop()}>
                            ⏹ Stop
                        </button>
                    </div>
                    <button
                        className="mt-3 w-full bg-gray-700 text-white p-2 rounded-lg hover:bg-gray-600 transition"
                        onClick={handleClearChat}
                    >
                        Clear Chat History
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIChatbot;
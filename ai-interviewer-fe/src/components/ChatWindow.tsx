import React, { useEffect } from "react";
import { answerQuestion } from "../services/apis";

interface Message{
    sender: "user" | "ai";
    text: string;
}

interface ChatWindowProps {
    sessionId: string | null;
    initMessage: string;
    onEnd: (feedback: any) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ onEnd, sessionId, initMessage }) => {
    const [messages, setMessages] = React.useState<Message[]>([{sender: "ai", text: initMessage}]);
    const [inpuntText, setInputText] = React.useState<string>("");
    const chatEndRef = React.useRef<HTMLDivElement>(null);

    const sendMessage = async () => {
        if (inpuntText.trim() === "" || !sessionId) return;
        const userMessage: Message = {sender: "user", text: inpuntText};
        setMessages((prev) => [...prev, userMessage]);
        setInputText("");
        try {
            setMessages((prev) => [
                ...prev,
                { sender: "ai", text: "Typing..." }
            ]);
            const res = await answerQuestion(sessionId, inpuntText)
            const aiMessage: Message = { sender: "ai", text: res.next_question };
            setMessages((prev) => {
                // Remove the last "Typing..." message before adding the AI response
                const updated = prev[prev.length - 1]?.text === "Typing..." ? prev.slice(0, -1) : prev;
                return [...updated, aiMessage];
            });
            setMessages((prev) => [...prev, aiMessage]);
            console.log("messages", messages);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage: Message = { sender: "ai", text: "An error occurred while processing your request." };
            setMessages((prev) => [...prev, errorMessage]);
        }
        
    };
    
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="flex flex-col h-full h-[80vh] bg-white rounded shadow p-4">
    
            <div className="flex-1 overflow-y-auto space-y-2">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`p-2 rounded max-w-fit ${
                            message.sender === "user"
                                ? "bg-blue-100 self-end ml-auto text-right"
                                : "bg-gray-100 self-start mr-auto text-left"
                        }`}
                    >
                        <span className="message-text">{message.text}</span>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>
            <div className="mt-2 flex">
                <input
                    type="textarea"
                    value={inpuntText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-1 p-2 border rounded"
                    placeholder="Type your message..."
                />
                <button
                    onClick={sendMessage}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </div>  
    )
}
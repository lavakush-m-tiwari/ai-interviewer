import React, { useEffect } from "react";
import { useSession } from "../services/SessionContext";
import { answerQuestion } from "../services/apis";

interface Message{
    sender: "user" | "ai";
    text: string;
}

interface ChatWindowProps {
    onEnd: (feedback: any) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ onEnd }) => {
    const { sessionId } = useSession();
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [inpuntText, setInputText] = React.useState<string>("");
    const chatEndRef = React.useRef<HTMLDivElement>(null);

    const sendMessage = () => {
        if (inpuntText.trim() === "" || !sessionId) return;
        const newMessage: Message = { sender: "user", text: inpuntText };
        
        const userMessage: Message = {sender: "user", text: inpuntText};
        setMessages((prev) => [...prev, userMessage]);

        answerQuestion(sessionId, inpuntText).then((res) => {
            if (res) {
                const aiMessage: Message = { sender: "ai", text: res.question };
                setMessages((prev) => [...prev, aiMessage]);
            }
        }).catch((error) => {
            console.error("Error sending message:", error);
            alert("Failed to send message. Please try again."); 
        }
        ).finally(() => {
            setInputText("");
            if (chatEndRef.current) {
                chatEndRef.current.scrollIntoView({ behavior: "smooth" });
            }
        });

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
                    <div key={index} className={`p-2 rounded max-w-[80%] ${message.sender === "user" ? "bg-blue-100 self-end" : "bg-gray-100 self-start"}`}>
                        <span className="message-text">{message.text}</span>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>
            <div className="mt-2 flex">
                <input
                    type="text"
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
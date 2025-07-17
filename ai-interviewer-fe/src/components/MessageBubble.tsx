import React from "react";

interface MessageBubbleProps {
    sender: "user" | "ai";
    text: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ sender, text }) => {
    return (
        <div className={`message-bubble ${sender}`}>
            <span className="message-text">{text}</span>
        </div>
    );
};
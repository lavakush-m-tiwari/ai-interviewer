import React from 'react';

interface ChatWindowProps {
  onEnd: (feedback: any) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ onEnd }) => {
  const handleEndSession = () => {
    const feedback = { message: "Session ended successfully." };
    onEnd(feedback);
  };

  return (
    <div className="chat-window">
      <h2>Chat Interface</h2>
      <div className="messages">
        {/* Messages will be displayed here */}
      </div>
      <button onClick={handleEndSession} className="end-session-button">
        End Session
      </button>
    </div>
  );
};
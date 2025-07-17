// filepath: /Users/lavakush/Documents/python code/behavioural-round/ai-interviewer-fe/src/App.tsx
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ResumeUPload } from './components/ResumeUpload';
import { SessionProvider } from './services/SessionContext';
import { ChatWindow } from './components/ChatWindow';

const App: React.FC = () => {
  const [sessionId, setSessionId] = React.useState<string | null>('1');
  const [feedback, setFeedback] = React.useState<any>(null);

  return (
    <SessionProvider>
      <div>
        {
          !sessionId && !feedback && (<ResumeUPload/>)
        }
        {
          sessionId && !feedback && (
            <div>
              <h1>Chat Window</h1>
              <p>Session ID: {sessionId}</p>
              <ChatWindow onEnd={(feedback) => {
                setFeedback(feedback);
                setSessionId(null);
              }} />
              <button onClick={() => setFeedback({ feedback: "Good" })}>End Session</button>
            </div>
          )
        }
        {
          feedback && (
            <div>
              <h1>Feedback Summary</h1>
              <p>{JSON.stringify(feedback)}</p>
            </div>
          )
        }
      </div>
    </SessionProvider>
  );
}

export default App;
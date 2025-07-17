import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ResumeUPload } from './components/ResumeUpload';
import { SessionProvider } from './services/SessionContext';
import { ChatWindow } from './components/ChatWindow';

const App: React.FC = () => {
  const [sessionId, setSessionId] = React.useState<string | null>(null);
  const [feedback, setFeedback] = React.useState<any>(null);

  return (
    <SessionProvider>
      <div className='min-h-screen bg-gray-100 p-4'>
        <div className='max-w-3xl mx-auto'>
          {
            !sessionId && !feedback && (<ResumeUPload/>)
          }
          {
            sessionId && !feedback && (
              <div className='flex flex-col h-full h-[80vh] bg-white rounded shadow p-4'>
                <div>
                  <span className="text-gray-500 font-semibold text-lg bg-blue-200 px-3 py-1 rounded shadow-lg mb-10">Creepy Manager</span>
                  <span className='float-right px-3 rounded bg-red-200'>Session ID: {sessionId}</span>
                </div>
                <ChatWindow onEnd={(feedback) => {
                  setFeedback(feedback);
                  setSessionId(sessionId);
                }} />
                <div className='mt-4'>
                    <button
                      className="float-right bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => setFeedback({ feedback: "Good" })}
                    >
                      End Session
                    </button>
                </div>
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
      </div>
    </SessionProvider>
  );
}

export default App;

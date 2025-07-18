import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { ResumeUPload } from './components/ResumeUpload';
import { ChatWindow } from './components/ChatWindow';
import Header from './components/Header';
import { endInterviewSession, startInterviewSession, uploadResume } from './services/apis';
import InterviewResult from './components/InterviewResult';

const App: React.FC = () => {
  const [sessionId, setSessionId] = React.useState<string | null>(null);
  const [feedback, setFeedback] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isSuccessUpload, setIsSuccessUpload] = React.useState<boolean>(false);
  const [interview, setInterview] = React.useState<boolean>(false);
  const [firstMessage, setFirstMessage] = React.useState<string>("");


  const handleOnFileUpload = async (file: File) => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    setLoading(true);
    try {
      const result = await uploadResume(file)
      setSessionId(result.session_id);
      setSessionId(result.session_id);
      console.log("File uploaded successfully:", result);
      setIsSuccessUpload(true);
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsSuccessUpload(false);
      alert("Failed to upload resume. Please try again.");
    }
    setLoading(false);
  }

  const handleInterviewStart = async () => {
    if (!isSuccessUpload) {
      alert("Please upload a resume first.");
      return;
    }
    try {
      const result = await startInterviewSession(sessionId ?? '')
      setInterview(true);
      setFirstMessage(result.next_question);
    } catch (error) {
      console.error("Error starting interview session:", error);
      alert("Failed to start interview session. Please try again.");
    }

  }

  const handleEnd = async () => {
    if (!sessionId) {
      alert("No active session to end.");
      return;
    }
    try {
      const result = await endInterviewSession(sessionId);
      setFeedback(result);
      setSessionId(null);
      setIsSuccessUpload(false);
    } catch (error) {
      console.error("Error ending interview session:", error);
      alert("Failed to end interview session. Please try again.");
    }
  }

  // useEffect(() => { if(feedback) {console.log('printing feedback from use effect', feedback)} }, [feedback]);

  return (
    <div className='min-h-screen bg-gray-100 p-4'>
      <Header />
      {
        feedback ? <InterviewResult feedback={feedback.feedback} weekness={feedback.weaknesses} strengths={feedback.strengths} score={feedback.score} />
          :
          (
            loading ?
              <div className="flex justify-center items-center h-64">
                <p className="text-lg text-gray-700 text-center">Understanding your experience...</p>
              </div> :
              (
                <div className='max-w-3xl mx-auto'>
                  {
                    !isSuccessUpload ? (
                      <ResumeUPload onHandleOnFileUpload={handleOnFileUpload} />
                    ) : !interview && (
                      <div className="flex flex-col items-center w-full max-w-md">
                        <h1 className="text-2xl font-semibold text-center">Resume Uploaded Successfully!</h1>
                        <p className="text-center mt-4">Your session has been created. Would you like to start the interview?</p>
                        <div className="flex flex-col sm:flex-row justify-center items-center mt-4 w-full gap-2">
                          <button
                            onClick={handleInterviewStart}
                            className="w-full sm:w-auto px-6 py-2 rounded bg-green-600 text-white font-semibold shadow-md transition-colors hover:bg-green-700"
                          >
                            Start Interview
                          </button>
                          <button
                            onClick={() => setIsSuccessUpload(false)}
                            className="w-full sm:w-auto sm:ml-4 px-6 py-2 rounded bg-red-600 text-white font-semibold shadow-md transition-colors hover:bg-red-700"
                          >
                            Upload Another Resume
                          </button>
                          <button
                            onClick={() => { }}
                            className="w-full sm:w-auto sm:ml-4 px-6 py-2 rounded bg-gray-600 text-white font-semibold shadow-md transition-colors hover:bg-gray-700"
                          >
                            Reset Session
                          </button>
                        </div>
                      </div>
                    )
                  }
                  {
                    interview && (
                      <div className='flex flex-col h-full h-[80vh] bg-white rounded shadow p-4'>
                        <div>
                          <span className="text-gray-500 font-semibold text-lg bg-blue-200 px-3 py-1 rounded shadow-lg mb-10">Creepy Manager</span>
                          <span className='float-right px-3 rounded bg-red-200'>Session ID: {sessionId}</span>
                        </div>
                        <ChatWindow sessionId={sessionId} initMessage={firstMessage} onEnd={(feedback) => {
                          console.log("Feedback received:", feedback);
                        }} />
                        <div className='mt-4'>
                          <button
                            className="float-right bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleEnd}
                          >
                            End Session
                          </button>
                        </div>
                      </div>
                    )
                  }
                </div>
              )
          )
      }
    </div>
  );
}

export default App;

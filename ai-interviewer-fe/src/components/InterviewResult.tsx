import React from "react";

interface InterviewResultProps {
    feedback: string;
    weekness: Array<string>;
    strengths: Array<string>;
    score: number;
}

const InterviewResult: React.FC<InterviewResultProps> = ({ feedback, weekness, strengths, score }) => {    
    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Interview Feedback</h2>
                <div>
                    <p>{feedback}</p>
                    <p className="badge"><strong>Score:</strong> {score}</p>
                    { strengths.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mt-2">Strengths</h3>
                            <ul className="list-disc pl-5">
                                {strengths.map((strength, index) => (
                                    <li key={index} className="text-green-600">{strength}</li>  
                                ))}
                            </ul>  
                        </div>
                    )}
                    { weekness.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mt-2">Weaknesses</h3>
                            <ul className="list-disc pl-5">
                                {weekness.map((weakness, index) => (
                                    <li key={index} className="text-red-600">{weakness}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                </div>
        </div>
    );
}

export default InterviewResult;
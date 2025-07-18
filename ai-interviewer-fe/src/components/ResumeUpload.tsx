import React, { useState } from "react";

interface ResumeUploadProps {
    onHandleOnFileUpload: (file: File) => void;
}
export const ResumeUPload: React.FC<ResumeUploadProps> = ({onHandleOnFileUpload}) => {
    const [file, setFile] = React.useState<File | null>(null);
   
    
    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center min-w-[320px]">
                    <h1 className="mb-6 text-2xl font-semibold">Resume Upload</h1>
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="mb-4 p-2 rounded border border-gray-300 w-full"
                    />
                    <button
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            if (file) {
                                onHandleOnFileUpload(file);
                            }
                        }}
                        className='px-6 py-2 rounded bg-blue-600 text-white font-semibold shadow-md transition-color'
                    >
                        Upload Resume
                    </button>
                </div>
                
            </div>
        </>
    );
}
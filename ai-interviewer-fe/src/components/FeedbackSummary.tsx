import React from "react";

interface ResumeUploadProps {
    file: File | null;
    onFileChange: (file: File | null) => void;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = () => {
    return (
        <div>
            <h1>Resume Upload</h1>
            <input type="file" accept=".pdf,.doc,.docx" />
            <button>Upload</button>
        </div>
    );
}
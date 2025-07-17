import React from "react";
import { uploadResume } from "../services/apis";
import { useSession } from "../services/SessionContext";


export const ResumeUPload: React.FC = () => {
    const [file, setFile] = React.useState<File | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const { setSessionId } = useSession();
    const [isSuccessUpload, setIsSuccessUpload] = React.useState<boolean>(false);

    const handleOnFileUpload = () => {
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }
        setLoading(true);
        try {
            setIsSuccessUpload(true);
            uploadResume(file).then((response) => {
                if (response) {
                    setSessionId(response.session_id);
                    alert("File uploaded successfully!");
                }
            }).catch((error) => {
                console.error("Error uploading file:", error);
                alert("File upload failed. Please try again.");
            }).finally(() => {
                setLoading(false);
            });
        } catch (error) {
            console.error("File upload failed:", error);
            alert("File upload failed. Please try again.");
            setLoading(false);
        }
    }

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                {!isSuccessUpload ? (
                    <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center min-w-[320px]">
                        <h1 className="mb-6 text-2xl font-semibold">Resume Upload</h1>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            className="mb-4 p-2 rounded border border-gray-300 w-full"
                        />
                        <button
                            onClick={handleOnFileUpload}
                            disabled={loading}
                            className={`px-6 py-2 rounded bg-blue-600 text-white font-semibold shadow-md transition-colors ${
                                loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"
                            }`}
                        >
                            {loading ? "Uploading..." : "Upload"}
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center w-full max-w-md">
                        <h1 className="text-2xl font-semibold text-center">Resume Uploaded Successfully!</h1>
                        <p className="text-center mt-4">Your session has been created. Would you like to start the interview?</p>
                        <div className="flex flex-col sm:flex-row justify-center items-center mt-4 w-full gap-2">
                            <button
                                onClick={() => setIsSuccessUpload(false)}
                                className="w-full sm:w-auto px-6 py-2 rounded bg-green-600 text-white font-semibold shadow-md transition-colors hover:bg-green-700"
                            >
                                Start Interview
                            </button>   
                            <button
                                onClick={() => setFile(null)}
                                className="w-full sm:w-auto sm:ml-4 px-6 py-2 rounded bg-red-600 text-white font-semibold shadow-md transition-colors hover:bg-red-700"     
                            >
                                Upload Another Resume
                            </button>
                            <button
                                onClick={() => {}}
                                className="w-full sm:w-auto sm:ml-4 px-6 py-2 rounded bg-gray-600 text-white font-semibold shadow-md transition-colors hover:bg-gray-700"   
                            >
                                Reset Session   
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
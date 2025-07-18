import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
});


export const uploadResume = async (file: File): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);
    const result = await apiClient.post('/api/upload-resume', formData);
    return result.data;
}


export const startInterviewSession = async (sessionId: string): Promise<any> => {
    const result = await apiClient.post(`/api/start-interview?session_id=${sessionId}`, { });
    return result.data;
}

export const answerQuestion = async (sessionId: string, answer: string): Promise<any> => {
    const result = await apiClient.post(`/api/answer-question`, { session_id: sessionId, answer: answer });
    return result.data;
}


export const endInterviewSession = async (sessionId: string): Promise<void> => {
    const result = await apiClient.get(`/api/end-interview?session_id=${sessionId}`);
    return result.data;
}


import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const questionsAxios = axios.create({
    baseURL: `${API_BASE_URL}/questions`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const questions = {
    createQuestion: async (body) => {
        try {
            const response = await questionsAxios.post('/', {...body});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    voteQuestion: async (questionId, userId) => {
        try {
            const response = await questionsAxios.post(`/${questionId}/${userId}/vote`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    listQuestions: async (meetingId) => {
        try {
            const response = await questionsAxios.get(`/${meetingId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getQuestionDetails: async (questionId) => {
        try {
            const response = await questionsAxios.get(`/${questionId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

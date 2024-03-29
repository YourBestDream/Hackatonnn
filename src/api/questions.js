import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';


const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

const ACCESS_TOKEN = getAccessToken()

const questionsAxios = axios.create({
    baseURL: `${API_BASE_URL}/api/v1/questions`,
    headers: {
        'Content-Type': 'application/json',
    },
});
export const questions = {
    createQuestion: async (body) => {
        try {
            const response = await questionsAxios.post('/create', {...body, meetingId:1}, {
                headers: {
                    ...questionsAxios.defaults.headers,
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,
                },
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    voteQuestion: async (questionId) => {
        try {
            const response = await questionsAxios.post(`/vote?questionId=${questionId}`, {
                headers: {
                    ...questionsAxios.defaults.headers,
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,
                },
            })
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    listQuestions: async (meetingId) => {
        try {
            const response = await questionsAxios.get(`/${meetingId}`, {
                headers: {
                    ...questionsAxios.defaults.headers,
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getQuestionDetails: async (questionId) => {
        try {
            const response = await questionsAxios.get(`/${questionId}`, {
                headers: {
                    ...questionsAxios.defaults.headers,
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

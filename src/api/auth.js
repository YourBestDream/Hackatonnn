import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const authAxios = axios.create({
    baseURL: `${API_BASE_URL}/api/v1/authentication`,
    headers: {
        'Content-Type': 'application/json',
    },
});

const saveAccessToken = (token) => {
    localStorage.setItem('accessToken', token);
};

const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

export const auth = {
    signIn: async (email, password) => {
        try {
            const response = await authAxios.post('/authenticate', { email, password });
            const { accessToken } = response.data;
            saveAccessToken(accessToken);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    signUp : async (email, password, fn, ln, phone) => {
        try {
            const response = await authAxios.post('/register', { email, password, fn, ln, phone });
            const { accessToken } = response.data;
            saveAccessToken(accessToken);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}





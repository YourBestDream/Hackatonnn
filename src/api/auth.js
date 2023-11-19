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
const saveEmail = (email) => {
    localStorage.setItem('email', email);
};
const saveRole = (role) => {
    localStorage.setItem('role', role);
};

export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};
export const getEmail = () => {
    return localStorage.getItem('email');
};
export const getRole = () => {
    return localStorage.getItem('role');
};

export const auth = {
    signIn: async (body) => {
        try {
            const response = await authAxios.post('/authenticate', { ...body });
            const { email, accessToken } = response.data;
            saveAccessToken(accessToken);
            saveEmail(email);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    signUp : async (body) => {
        try {
            const response = await authAxios.post('/register', {
                ...body,
                phone:"068388162"
            });
            const { email: responseDataEmail, accessToken } = response.data;
            saveAccessToken(accessToken);
            saveEmail(responseDataEmail);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}





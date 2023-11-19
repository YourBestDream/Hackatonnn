import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const meetingsAxios = axios.create({
    baseURL: `${API_BASE_URL}/meetings`,
    headers: {
        'Content-Type': 'application/json',
    },
});

const officialsAxios = axios.create({
    baseURL: `${API_BASE_URL}/officials`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const meetings = {
    getMeetingDetails: async (meetingId) => {
        try {
            const response = await meetingsAxios.get(`/${meetingId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    listMeetings: async () => {
        try {
            const response = await meetingsAxios.get('');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createMeeting: async (body) => {
        try {
            const response = await meetingsAxios.post('/create', { ...body });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

};

export const listOfficials= async () => {
    try {
        const response = await officialsAxios.get('');
        return response.data;
    } catch (error) {
        throw error;
    }
};

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

const ACCESS_TOKEN = getAccessToken()


const meetingsAxios = axios.create({
    baseURL: `${API_BASE_URL}/api/v1/meetings`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
    },
});

const officialsAxios = axios.create({
    baseURL: `${API_BASE_URL}/officials`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
    },
});

export const meetings = {
    getMeetingDetails: async (meetingId) => {
        try {
            const response = await meetingsAxios.get(`/${meetingId}`, {
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    listMeetings: async () => {
        try {
            console.log(">>>access", `${ACCESS_TOKEN}`)

            const response = await meetingsAxios.get('/all', {
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createMeeting: async (body) => {
        try {
            const timezone = "Europe/Chisinau";
            const topic = "Team Sync";
            const response = await meetingsAxios.post('/create', { ...body, timezone, topic }, {
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,
                },
            })
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

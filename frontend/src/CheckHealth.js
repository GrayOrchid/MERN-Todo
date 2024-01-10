import axios from './axios';

export async function keepServerActive() {
    try {
        await axios.get('/health');
    } catch (error) {
        console.error('There has been a problem with your request:', error);
    }
}



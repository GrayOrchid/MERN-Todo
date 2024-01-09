import axios from './axios';

export async function keepServerActive() {
    console.log('Function keepServerActive is called.');
    try {
        await axios.get('/health');
        console.log('Server is active');
    } catch (error) {
        console.error('There has been a problem with your request:', error);
    }
}



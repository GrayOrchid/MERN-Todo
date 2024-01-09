import axios from './axios';

async function keepServerActive() {
    try {
        await axios.get('/health');
        console.log('Server is active');
    } catch (error) {
        console.error('There has been a problem with your request:', error);
    }
}


keepServerActive();

setInterval(keepServerActive, 5 * 60 * 1000);

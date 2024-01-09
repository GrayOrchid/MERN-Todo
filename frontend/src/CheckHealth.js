import axios from './axios';

export async function keepServerActive() {
    console.log('Function keepServerActive is called.'); // Опционально: добавьте этот вывод для отладки
    try {
        await axios.get('/health');
        console.log('Server is active'); // Опционально: вывод для отладки
    } catch (error) {
        console.error('There has been a problem with your request:', error);
    }
}



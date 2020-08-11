import axios from 'axios';

export const apiService = axios.create({
    baseURL: 'http://applican.thanhtu150.top/api/cms',
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
    }
})
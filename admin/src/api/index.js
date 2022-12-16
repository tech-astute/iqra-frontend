import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/master',
});

export const addArticle = (articleInfo) => api.post(`/add-articles`, articleInfo);
export const getArticle = () => api.get(`/articles`);
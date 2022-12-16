import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://localhost:5000/api/master',
    baseURL: 'https://iqra-4t1k.onrender.com/api/master'
});

export const addArticle = (articleInfo) => api.post(`/add-articles`, articleInfo);
export const getArticle = () => api.get(`/articles`);

export const addEditorial = (editorialInfo) => api.post(`/add-editorials`, editorialInfo);
export const getEditorial = () => api.get(`/editorials`);
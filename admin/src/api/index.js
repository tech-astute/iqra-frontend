import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://localhost:5000/api/master',
    baseURL: 'https://iqra-twfr.onrender.com/api/master'
});

api.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).accessToken}`;
    }
    return req;
}, (error) => {
    return Promise.reject(error);
});



export const addArticle = (articleInfo) => api.post(`/add-articles`, articleInfo);
export const getArticle = () => api.get(`/articles`);

export const addEditorial = (editorialInfo) => api.post(`/add-editorials`, editorialInfo);
export const getEditorial = () => api.get(`/editorials`);

export const signup = (userInfo) => api.post(`/signupAdmin`, userInfo);
export const signin = (userInfo) => api.post(`/signinAdmin`, userInfo);
export const signout = () => api.post(`/signoutAdmin`);
export const admin = () => api.get(`/admin`, {
    headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('profile')).accessToken}`
    }
});

export const addCategory = (categoryInfo) => api.post(`/add-categorys`, categoryInfo);
export const getCategory = () => api.get(`/categorys`);

export const addSubject = (subjectInfo) => api.post(`/add-subjects`, subjectInfo);
export const getSubject = () => api.get(`/subjects`);

export const addMedium = (mediumInfo) => api.post(`/add-mediums`, mediumInfo);
export const getMedium = () => api.get(`/mediums`);

export const addLevel = (levelInfo) => api.post(`/add-levels`, levelInfo);
export const getLevel = () => api.get(`/levels`);

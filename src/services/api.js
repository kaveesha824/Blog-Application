import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const registerUser = (name, email, password, isAdmin) => {
    return axios.post(`${API_URL}/auth/register`, { name, email, password, isAdmin });
};

export const loginUser = (email, password) => {
    return axios.post(`${API_URL}/auth/login`, { email, password });
};

export const fetchPosts = () => {
    return axios.get(`${API_URL}/posts`);
};

export const fetchPostById = (id) => {
    return axios.get(`${API_URL}/posts/${id}`);
};

export const createPost = (data, token) => {
    return axios.post(`${API_URL}/posts`, data, { headers: { Authorization: `Bearer ${token}` } });
};

export const updatePost = (id, data, token) => {
    return axios.put(`${API_URL}/posts/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
};

export const deletePost = (id, token) => {
    return axios.delete(`${API_URL}/posts/${id}`, { headers: { Authorization: `Bearer ${token}` } });
};


// export const searchPosts = (query) => 
//     axios.get(`http://localhost:5000/api/posts/search?query=${query}`);

export const searchPosts = async (query) => {
    return axios.get(`${API_URL}/posts/search`, {
        params: { query },
    });
};
import axios from 'axios';
import {  User } from '../entities/User';
// todo: change to fetch api instead of axios
const API_URL = 'http://localhost:3001/api/auth/';

const register = (user: User) => {
  return axios.post(API_URL + 'signup', {
    username: user.username,
    email: user.email,
    password: user.password,
    role: user.role
  });
};

const login = (user: User) => {
  return axios
    .post(API_URL + 'signin', {
      username: user.username,
      password: user.password
    })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
    localStorage.removeItem('user');
    return axios.post(API_URL + 'signout').then(response => {
      return response.data;
    });
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user') || '{}');
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser
};

export default AuthService;

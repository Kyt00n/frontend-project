import axios from 'axios';
import { TemporaryUser } from '../entities/TemporaryUser';
// Add this line to import the log object
// todo: change to fetch api instead of axios
const API_URL = 'http://localhost:3001/api/auth/';

const register = (user: TemporaryUser) => {
  return axios.post(`${API_URL}signup`, {
    username: user.username,
    email: user.email,
    password: user.password,
    role: user.role
  });
};

const login = (user: TemporaryUser) => {
  return axios
    .post(`${API_URL}signin`, {
      username: user.username,
      password: user.password
    }, {withCredentials: true})
    .then(response => {
      if (response && response.data && response.data.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        console.log('User logged in');
      } else {
        console.log('No response or accessToken received');
      }
      // console.log(response.data);
      return response.data;
    });
};

const logout = () => {
    localStorage.removeItem('user');
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

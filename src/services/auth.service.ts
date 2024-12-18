import axios from 'axios';
// todo: change to fetch api instead of axios
const API_URL = 'http://localhost:3000/api/auth/';

const register = (username:string, 
    email:string, 
    password:string) => {
  return axios.post(API_URL + 'signup', {
    username,
    email,
    password
  });
};

const login = (username: string, password:string) => {
  return axios
    .post(API_URL + 'signin', {
      username,
      password
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

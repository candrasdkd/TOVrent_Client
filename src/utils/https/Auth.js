import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;
export const postLogin = (body) => {
  return axios.post(`${url}/auth/login`, body);
};

export const postRegister = (body) => {
  return axios.post(`${url}/auth/register`, body);
};

export const deleteLogout = (token) => {
  return axios.delete(`${url}/auth/logout`, { token: token });
};

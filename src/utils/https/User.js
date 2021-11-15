import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;

export const patchProfile = (body, params, token) => {
  return axios.patch(`${url}/users/${params}`, body, {
    headers: { "x-access-token": `Bearer ${token}` },
  });
};

export const getUserById = (params, token) => {
  return axios.patch(`${url}/users/${params}`, {
    headers: { "x-access-token": `Bearer ${token}` },
  });
};

export const updatePasswordUser = (params, body, token) => {
  return axios.patch(`${url}/users/password/${params}`, body, {
    headers: { "x-access-token": `Bearer ${token}` },
  });
};

export const getEmailUser = (body) => {
  return axios.post(`${url}/users/forgot_password`, body);
};

export const getCode = (body) => {
  return axios.post(`${url}/users/forgot_password/check-code`, body);
};

export const changePass = (body) => {
  return axios.patch(`${url}/users/forgot_password/change-password`, body);
};

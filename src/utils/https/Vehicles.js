import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;

export const postVehicle = (body, token) => {
  return axios.post(`${url}/vehicles`, body, {
    headers: { "x-access-token": `Bearer ${token}` },
  });
};

export const patchVehicle = (params, body, token) => {
  return axios.patch(`${url}/vehicles/${params}`, body, {
    headers: { "x-access-token": `Bearer ${token}` },
  });
};

export const getVehicle = (body) => {
  return axios.get(`${url}/vehicles`, { params: body });
};

export const getVehicleById = (params) => {
  return axios.patch(`${url}/vehicles/${params}`);
};

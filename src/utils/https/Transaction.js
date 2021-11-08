import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;

export const getTransaction = (query, token) => {
  return axios.get(`${url}/history/${query}`, {
    headers: { "x-access-token": `Bearer ${token}` },
  });
};
export const getTransactionByID = (id, token) => {
  return axios.get(`${url}/history/${id}`, {
    headers: { "x-access-token": `Bearer ${token}` },
  });
};
export const getTransactionByUser = (id, token) => {
  return axios.get(`${url}/history/user/${id}`, {
    headers: { "x-access-token": `Bearer ${token}` },
  });
};

export const postTransactions = (body, token) => {
  return axios.post(`${url}/history`, body, {
    headers: { "x-access-token": `Bearer ${token}` },
  });
};
export const patchTransaction = (id, body, token) => {
  return axios.patch(`${url}/history/${id}`, body, {
    headers: { "x-access-token": `Bearer ${token}` },
  });
};
export const deleteTransaction = (id, token) => {
  return axios.delete(`${url}/history/${id}`, {
    headers: { "x-access-token": `Bearer ${token}` },
  });
};

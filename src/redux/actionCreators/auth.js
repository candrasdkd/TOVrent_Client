import { LOGIN, LOGOUT, EDIT_PROFILE } from "./actionString";
import { deleteLogout, postLogin } from "../../utils/https/Auth";
import { patchProfile } from "../../utils/https/User";
export const loginAction = (body) => {
  return {
    type: LOGIN,
    payload: postLogin(body),
  };
};

export const profileAction = (body, params, token) => {
  return {
    type: EDIT_PROFILE,
    payload: patchProfile(body, params, token),
  };
};
export const logoutAction = (body) => {
  return {
    type: LOGOUT,
    payload: deleteLogout(body),
  };
};



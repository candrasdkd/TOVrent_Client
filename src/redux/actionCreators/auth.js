import { LOGIN, FORGOT_PASSWORD, LOGOUT, EDIT_PROFILE} from "./actionString";
import { deleteLogout, postLogin } from "../../utils/https/Auth";
import { patchProfile, getEmailUser } from "../../utils/https/Profile";
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
export const logoutAction = (token) => {
  return {
    type: LOGOUT,
    payload: deleteLogout(token),
  };
};

export const ForgotPasswordAction = (body) => {
  return {
    type: FORGOT_PASSWORD,
    payload: getEmailUser(body),
  };
};


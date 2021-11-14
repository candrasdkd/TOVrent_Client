import {
  FORGOT_PASSWORD,
  CHECK_CODE,
  RESET_STATE,
  CHANGE_PASSWORD,
} from "./actionString";
import { getEmailUser, getCode, changePass } from "../../utils/https/User";

export const forgotPasswordAction = (body) => {
  return {
    type: FORGOT_PASSWORD,
    payload: getEmailUser(body),
  };
};

export const checkCodeAction = (body) => {
  return {
    type: CHECK_CODE,
    payload: getCode(body),
  };
};

export const changePasswordAction = (body) => {
  return {
    type: CHANGE_PASSWORD,
    payload: changePass(body),
  };
};

export const resetStateAction = () => {
  return {
    type: RESET_STATE,
    payload: {
      isFulfilled: false,
      isPending: false,
    },
  };
};

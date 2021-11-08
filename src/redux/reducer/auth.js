import {
  LOGIN,
  REGISTER,
  LOGOUT,
  EDIT_PROFILE,
} from "../actionCreators/actionString";
import { ActionType } from "redux-promise-middleware";

const defaultState = {
  authInfo: {},
  token: "",
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  isLogin: false,
  error: "",
};

const authReducer = (prevstate = defaultState, action) => {
  const { Pending, Fulfilled, Rejected } = ActionType;
  switch (action.type) {
    case LOGIN.concat("_", Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
        error: false,
      };
    case LOGIN.concat("_", Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        isLogin: false,
        error: action.payload,
      };
    case LOGIN.concat("_", Fulfilled):
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: true,
        token: action.payload.data.result.token,
        authInfo: action.payload.data.result.userInfo,
        isLogin: true,
        error: "",
      };
    case REGISTER.concat("_", Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
        error: false,
      };
    case REGISTER.concat("_", Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        isLogin: false,
        error: "",
      };
    case REGISTER.concat("_", Fulfilled):
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: true,
        error: false,
      };
    case LOGOUT.concat("_", Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case LOGOUT.concat("_", Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
      };
    case LOGOUT.concat("_", Fulfilled):
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: true,
        authInfo: action.payload.data.result,
        token: "",
        isLogin: false,
      };
    case EDIT_PROFILE.concat("_", Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case EDIT_PROFILE.concat("_", Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
      };
    case EDIT_PROFILE.concat("_", Fulfilled):
      return {
        ...prevstate,
        isFulfilled: true,
        isPending: false,
        error: "",
        authInfo: action.payload.data.result,
      };
    default:
      return prevstate;
  }
};

export default authReducer;

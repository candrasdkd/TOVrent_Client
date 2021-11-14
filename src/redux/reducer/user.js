import {
  FORGOT_PASSWORD,
  CHECK_CODE,
  RESET_STATE,
  CHANGE_PASSWORD,
} from "../actionCreators/actionString";
import { ActionType } from "redux-promise-middleware";

const defaultState = {
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  data: [],
  status: "",
};

const authReducer = (prevstate = defaultState, action) => {
  const { Pending, Fulfilled, Rejected } = ActionType;
  switch (action.type) {
    case FORGOT_PASSWORD.concat("_", Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case FORGOT_PASSWORD.concat("_", Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
        status: action.payload.response.status,
      };
    case FORGOT_PASSWORD.concat("_", Fulfilled):
      return {
        ...prevstate,
        isFulfilled: true,
        isPending: false,
        data: action.payload.data,
      };
    case CHECK_CODE.concat("_", Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case CHECK_CODE.concat("_", Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
        status: action.payload.response.status,
      };
    case CHECK_CODE.concat("_", Fulfilled):
      return {
        ...prevstate,
        isFulfilled: true,
        isPending: false,
        data: action.payload.data,
      };
    case CHANGE_PASSWORD.concat("_", Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case CHANGE_PASSWORD.concat("_", Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
        status: action.payload.response.status,
      };
    case CHANGE_PASSWORD.concat("_", Fulfilled):
      return {
        ...prevstate,
        isFulfilled: true,
        isPending: false,
        data: [],
      };
    case RESET_STATE:
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: false,
        isRejected: false,
      };
    default:
      return prevstate;
  }
};

export default authReducer;

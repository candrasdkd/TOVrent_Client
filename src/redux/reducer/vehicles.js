import { ActionType } from "redux-promise-middleware";
import { UPLOAD_VEHICLE, EDIT_VEHICLE } from "../actionCreators/actionString";

const defaultState = {
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: "",
  message: "",
};

const vehicleReducer = (prevstate = defaultState, action) => {
  const { Pending, Fulfilled, Rejected } = ActionType;
  switch (action.type) {
    case UPLOAD_VEHICLE.concat("_", Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case UPLOAD_VEHICLE.concat("_", Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
      };
    case UPLOAD_VEHICLE.concat("_", Fulfilled):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: "",
        message: action.payload,
      };
    case EDIT_VEHICLE.concat("_", Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case EDIT_VEHICLE.concat("_", Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
      };
    case EDIT_VEHICLE.concat("_", Fulfilled):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: "",
        message: action.payload,
      };
    default:
      return prevstate;
  }
};

export default vehicleReducer;

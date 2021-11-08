import { postVehicle, patchVehicle } from "../../utils/https/Vehicles";
import { UPLOAD_VEHICLE, EDIT_VEHICLE } from "./actionString";

export const postVehicleAction = (body, token) => {
  return {
    type: UPLOAD_VEHICLE,
    payload: postVehicle(body, token),
  };
};
export const patchVehicleAction = (params, body, token) => {
  return {
    type: EDIT_VEHICLE,
    payload: patchVehicle(params, body, token),
  };
};

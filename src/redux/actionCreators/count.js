import { COUNT_DOWN, COUNT_UP } from "./actionString";

export const countUpAction = () => {
  return {
    type: COUNT_UP,
  };
};
export const countDownAction = () => {
  return {
    type: COUNT_DOWN,
  };
};

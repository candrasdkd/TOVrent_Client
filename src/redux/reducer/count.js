import { COUNT_DOWN, COUNT_UP } from "../actionCreators/actionString";

const defaultState = {
  number: 1,
  maxNumber: 99,
};

const countReducer = (prevState = defaultState, action) => {
  switch (action.type) {
    case COUNT_UP:
      if (prevState.number < prevState.maxNumber)
        return {
          ...prevState,
          number: prevState.number + 1,
        };
      else return prevState;
    case COUNT_DOWN:
      if (prevState.number > 1)
        return {
          ...prevState,
          number: prevState.number - 1,
        };
      else return prevState;
    default:
      return prevState;
  }
};

export default countReducer;

import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export function PrivateRoute({ children, ...rest }) {
  const authState = useSelector((reduxState) => reduxState.auth);
  return (
    <Route
      {...rest}
      render={() => (authState.token !== "" ? children : <Redirect to="/" />)}
    />
  );
}

export function AuthRoute({ children, ...rest }) {
  const authState = useSelector((reduxState) => reduxState.auth);
  return (
    <Route
      {...rest}
      render={() => (authState.token !== "" ? <Redirect to="/" /> : children)}
    />
  );
}

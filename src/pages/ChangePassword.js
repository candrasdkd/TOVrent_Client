import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  changePasswordAction,
  resetStateAction,
} from "../redux/actionCreators/user";
import Footer from "../components/Footer";
import { connect } from "react-redux";

function ChangePassword(props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const onSubmit = () => {
    if (password.length < 1) {
      setShowMessage(true);
      return setErrorMessage("Password is required");
    }
    if (password !== confirmPassword) {
      setShowMessage(true);
      return setErrorMessage("Password not match");
    }

    // const form = new URLSearchParams();
    if (password === confirmPassword) {
      // form.append("email", props.user.data.result.email);
      // form.append("password", password);
      const body = {
        email: props.user.data.result.email,
        password: password,
      };
      props.changePass(body);
    }

  };

  const submitHandler = () => {
    onSubmit();
    setIsDisabled(true);
  };

  useEffect(() => {
    if (props.user.isFulfilled === true) {
      props.resetState();
      return props.history.push("/login");
    }
    if (showMessage === true) {
      return setIsDisabled(false);
    }
  }, [props, showMessage]);
  return (
    <>
      <main className="forgot-password-background">
        <div className="shadow-container px-5 py-5 ">
          <Link to="/login" className="back-arrow">
            <span>Back</span>
          </Link>
          <div className="main-content text-center">
            <div className="forgot-title">Don’t worry, we got your back!</div>
          </div>
          {showMessage && (
            <div className="error my-3 p-2 rounded fw-bold fs-5 text-center text-danger">
              {errorMessage}
            </div>
          )}
          <div className="d-flex justify-content-center email-forgot">
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Input your new password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Confirm your new password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          <div className="d-flex justify-content-center send-link">
            {isDisabled ? (
              <button className="btn-login-page mt-5" disabled>
                Send Link
              </button>
            ) : (
              <button className="btn-login-page mt-5" onClick={submitHandler}>
                Send Link
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

const mapStateToProps = ({ user }) => {
  return {
    user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changePass: (body) => {
      dispatch(changePasswordAction(body));
    },
    resetState: () => {
      dispatch(resetStateAction());
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChangePassword));

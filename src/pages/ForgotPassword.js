import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  forgotPasswordAction,
  resetStateAction,
} from "../redux/actionCreators/user";
import Footer from "../components/Footer";
import { connect } from "react-redux";

function ForgotPassword(props) {
  const [email, setEmail] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const onSubmit = () => {
    if (email.length < 1) {
      setShowMessage(true);
      return setErrorMessage("Email is required");
    }
    if (!email.includes("@")) {
      setShowMessage(true);
      return setErrorMessage("Please input a valid Email");
    }
    const form = new URLSearchParams();
    form.append("email", email);
    props.sendEmail(form);
  };

  const submitHandler = () => {
    onSubmit();
    setIsDisabled(true);
  };

  useEffect(() => {
    if (props.user.isFulfilled === true) {
      props.resetState();
      return props.history.push("/check-code");
    }
    if (props.user.status === 404) {
      setShowMessage(true);
      return setErrorMessage("Email not found");
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
              placeholder="Enter your email adress"
              onChange={(e) => {
                setEmail(e.target.value);
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
          <div className="resend-link text-center">
            You will receive a link to reset your password. <br />
            If you haven’t received any link, click&nbsp;
            <span>
              <Link to="#" className="resend-link-url">
                Resend Link
              </Link>
            </span>
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
    sendEmail: (body) => {
      dispatch(forgotPasswordAction(body));
    },
    resetState: () => {
      dispatch(resetStateAction());
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ForgotPassword));

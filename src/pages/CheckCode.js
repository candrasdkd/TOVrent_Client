import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  checkCodeAction,
  resetStateAction,
} from "../redux/actionCreators/user";
import Footer from "../components/Footer";
import { connect } from "react-redux";

function CheckCode(props) {
  const [code, setCode] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const onSubmit = () => {
    if (code.length < 6) {
      setShowMessage(true);
      return setErrorMessage("Code must be more than 6 characters");
    }
    const form = new URLSearchParams();
    form.append("email", props.user.data.result.email);
    form.append("code", code);
    props.checkCode(form);
  };

  const submitHandler = () => {
    onSubmit();
    setIsDisabled(true);
  };
  useEffect(() => {
    if (props.user.isFulfilled === true) {
      props.resetState();
      return props.history.push("/change-password");
    }
    if (props.user.status === 404) {
      setShowMessage(true);
      return setErrorMessage("Code is wrong");
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
          <div className="d-flex check-code">
            <input
              type="text"
              id="code"
              name="code"
              placeholder="Input Code"
              onChange={(e) => {
                setCode(e.target.value);
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
                Confirm
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
    checkCode: (body) => {
      dispatch(checkCodeAction(body));
    },
    resetState: (body) => {
      dispatch(resetStateAction(body));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CheckCode));

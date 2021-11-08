import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { getEmailUser } from "../utils/https/Profile";
import Footer from "../components/Footer";

function ForgotPassword(props) {
  // const stateAuth = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  // const [showMessage, setShowMessage] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
  const sendEmail = () => {
    // if (email.length < 1) {
    //   setShowMessage(true);
    //   setErrorMessage("Email is Required");
    // } else if (!email.includes("@")) {
    //   setShowMessage(true);
    //   setErrorMessage("Please input a Valid Email");
    // } else {
    const form = new URLSearchParams();
    form.append("email", email);
    getEmailUser(form);
  };

  const onSubmit = () => {
    sendEmail();
  };

  // const checkCode = () => {

  // };
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
            <Link to="/login">
              <button className="btn-login-page mt-5" onClick={onSubmit}>
                Confirm
              </button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default withRouter(ForgotPassword);

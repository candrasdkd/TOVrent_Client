import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { getEmailUser } from "../utils/https/Profile";
import Footer from "../components/Footer";
import CheckCode from "./CheckCode";

function ChangePassword(props) {
  // const stateAuth = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  const [change, setChange] = useState(false);
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
    setChange(true);
  };
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
              placeholder="Enter your new password"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Confirm your new password"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="d-flex justify-content-center send-link">
            <button className="btn-login-page mt-5" onClick={onSubmit}>
              Change Password
            </button>
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

export default withRouter(ChangePassword);

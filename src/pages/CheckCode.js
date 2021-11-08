import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { getEmailUser } from "../utils/https/Profile";
import Footer from "../components/Footer";

function CheckCode(props) {
  // const stateAuth = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  const [change, setChange] = useState(false);
  const [email, setEmail] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
      <input
        type="text"
        id="email"
        name="email"
        placeholder="Enter your code"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="text"
        id="email"
        name="email"
        placeholder="Confirm your code"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
    </>
  );
}

export default withRouter(CheckCode);

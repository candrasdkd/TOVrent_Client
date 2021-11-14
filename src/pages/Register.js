import React from "react";
import { Link, useHistory } from "react-router-dom";
import googleIcon from "../assets/img/icon/google-icon.png";
import Spinner from "react-bootstrap/Spinner";
import Footer from "../components/Footer";
import { postRegister } from "../utils/https/Auth";

function Register() {
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [showMessage, setShowMessage] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(false);
  const onSubmit = () => {
    if (username.length < 1) {
      setShowMessage(true);
      return setErrorMessage("Username is required");
    }
    if (email.length < 1) {
      setShowMessage(true);
      return setErrorMessage("Email is required");
    }
    if (!email.includes("@")) {
      setShowMessage(true);
      return setErrorMessage("Please input a valid email");
    }
    if (password.length < 1) {
      setShowMessage(true);
      return setErrorMessage("Password is required");
    }
    if (password.length < 6) {
      setShowMessage(true);
      return setErrorMessage("Password must have 6 or more characters!");
    }
    const form = new URLSearchParams();
    form.append("username", username);
    form.append("email", email);
    form.append("password", password);
    form.append("role_id", 3);
    postRegister(form)
      .then((data) => {
        if (data.data.status === 201) {
          setIsDisabled(true);
          return history.push("/login");
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          setShowMessage(true);
          return setErrorMessage("Email has registered");
        }
      });
  };



  return (
    <>
      <main className="login-background">
        <div
          className="
            shadow-container
            d-lg-flex
            flex-lg-center
            justify-content-between
            padding-register
            "
        >
          <div className="bd-highlight sign-up">
            <div>
              <p className="login-title">
                Let's Explore <br />
                The World
              </p>
              <p className="no-account">Already Have an Account?</p>
              <Link to="/login">
                <button className="sign-up-btn-custom">Login</button>
              </Link>
            </div>
          </div>
          <div className="bd-highlight line"></div>
          <div className="bd-highlight login-field">
            <form>
              {showMessage && (
                <div className="error my-3 p-2 rounded fw-bold fs-5 text-center text-danger">
                  {errorMessage}
                </div>
              )}
              <input
                type="text"
                id="username"
                name="username"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <br></br>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <br></br>
              <input
                type="password"
                id="pass"
                name="pass"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </form>

            <div className="forgot-password"></div>
            <div>
              <button
                className="btn-login-page"
                onClick={onSubmit}
                disabled={isDisabled}
              >
                {isDisabled === true ? (
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  ""
                )}
                {isDisabled === true ? "Loading..." : "Sign Up"}
              </button>
            </div>
            <div>
              <Link to="/">
                <button
                  className="btn-login-with-google"
                  onClick={onSubmit}
                  disabled={isDisabled}
                >
                  <img src={googleIcon} alt="" />
                  Sign Up With Google
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Register;
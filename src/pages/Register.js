import React, { useEffect } from "react";
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
  let timer;
  const onSubmit = () => {
    if (username.length < 1) {
      setShowMessage(true);
      setErrorMessage("Username is Required");
    } else if (email.length < 1) {
      setShowMessage(true);
      setErrorMessage("Email is Required");
    } else if (!email.includes("@")) {
      setShowMessage(true);
      setErrorMessage("Please input a Valid Email");
    } else if (password.length < 1) {
      setShowMessage(true);
      setErrorMessage("Password is Required");
    } else if (password.length < 6) {
      setShowMessage(true);
      setErrorMessage("Password must have 6 or more characters!");
    } else {
      const form = new URLSearchParams();
      form.append("username", username);
      form.append("email", email);
      form.append("password", password);
      form.append("role_id", 3);
      postRegister(form)
        .then((data) => {
          console.log(data);
          timer = setTimeout(() => {
            history.push("/login");
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
          setShowMessage(true);
          setErrorMessage("Invalid Email or Password");
        });
    }
  };

  const handleClick = () => {
    onSubmit();
    setIsDisabled(true);
    timer = setTimeout(() => {
      setIsDisabled(false);
    }, 1000);
  };

  useEffect(() => {
    return () => clearTimeout(timer);
  }, [timer]);

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
              <p></p>
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
                onClick={handleClick}
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

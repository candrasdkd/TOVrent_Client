import { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Footer from "../components/Footer";
import googleIcon from "../assets/img/icon/google-icon.png";
import Spinner from "react-bootstrap/Spinner";
import { connect } from "react-redux";
import { loginAction } from "../redux/actionCreators/auth";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  let timer;
  const onSubmit = () => {
    if (email.length < 1) {
      setShowMessage(true);
      setErrorMessage("Email is Required");
    }
    if (!email.includes("@")) {
      setShowMessage(true);
      setErrorMessage("Please input a Valid Email");
    }
    if (password.length < 1) {
      setShowMessage(true);
      setErrorMessage("Password is Required");
    }
    if (password.length < 6) {
      setShowMessage(true);
      setErrorMessage("Password must have 6 or more characters!");
    } else {
      const form = new URLSearchParams();
      form.append("email", email);
      form.append("password", password);
      props.postLogin(form);
      // console.log(errorLogin);
    }
  };
  const handleClick = () => {
    onSubmit();
    setIsDisabled(true);
    timer = setTimeout(() => {
      setIsDisabled(false);
    }, 1500);
  };
  useEffect(() => {
    const errorLogin = String(props.auth.error);
    if (props.auth.isLogin) {
      props.history.push("/");
    }
    if (errorLogin.includes("401")) {
      setShowMessage(true);
      setErrorMessage("Username or Password Are Incorrect");
    }
    return () => clearTimeout(timer);
  }, [props.auth.error, props.auth.isLogin, props.history, timer]);
  return (
    <>
      <main className="login-background">
        <div
          className="
            shadow-container
            d-lg-flex
            flex-lg-center
            justify-content-between
          "
        >
          <div className="bd-highlight sign-up">
            <div>
              <p className="login-title">
                Let's Explore <br />
                The World
              </p>
              <p className="no-account">Don't have account?</p>
              <Link to="/register">
                <button className="sign-up-btn-custom">Sign Up</button>
              </Link>
            </div>
          </div>
          <div className="bd-highlight line"></div>
          <div className="bd-highlight login-field">
            {showMessage && (
              <div className="error my-3 p-2 rounded fw-bold fs-5 text-center text-danger">
                {errorMessage}
              </div>
            )}
            <form>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                style={{ color: "white" }}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <p></p>
              <input
                type="password"
                id="pass"
                name="pass"
                placeholder="Password"
                style={{ color: "white" }}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </form>
            <div className="forgot-password">
              <Link to="/forgot">Forgot Password?</Link>
            </div>
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
                {isDisabled === true ? "Loading..." : "Login"}
              </button>
            </div>
            <div>
              <Link to="/">
                <button className="btn-login-with-google" disabled={isDisabled}>
                  <img src={googleIcon} alt="" />
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
                  {isDisabled === true ? "Loading..." : "Login With Google"}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    postLogin: (body) => {
      dispatch(loginAction(body));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));

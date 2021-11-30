import { NavDropdown } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAction } from "../redux/actionCreators/auth";
import Swal from "sweetalert2";
import defaultImage from "../assets/img/default-pp.png";
import Loader from "react-loader-spinner";
import { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

class Header extends Component {
  state = { loadingState: false };
  signOutHandler = () => {
    this.setState({ loadingState: true });
    this.props.signOut();
  };
  vehicleRoute = () => {
    const path = this.props.location.pathname;
    const propsVehicleId = this.props.match.params.id;
    if (path === "/vehicles") return path === "/vehicles";
    if (path === `/detail/${propsVehicleId}`)
      return path === `/detail/${propsVehicleId}`;
    if (path === `/reservation/${propsVehicleId}`)
      return path === `/reservation/${propsVehicleId}`;
    if (path === `/payment/${propsVehicleId}`)
      return path === `/payment/${propsVehicleId}`;
    if (path === `/payment/${propsVehicleId}`)
      return path === `/payment/${propsVehicleId}`;
    if (path === `/edit-vehicle/${propsVehicleId}`)
      return path === `/edit-vehicle/${propsVehicleId}`;
    if (path === `/add-vehicle`) return path === `/add-vehicle`;
    if (path === `/search`) return path === `/search`;
    if (path === `/view-more`) return path === `/view-more`;
  };
  historyRoute = () => {
    const path = this.props.location.pathname;
    const propsVehicleId = this.props.match.params.id;
    if (path === "/history") return path === "/history";
    if (path === `/transaction-history/${propsVehicleId}`)
      return path === `/transaction-history/${propsVehicleId}`;
  };
  componentDidUpdate() {
    !this.props.auth.isLogin && this.props.history.push("/login");
  }

  render() {
    const url = process.env.REACT_APP_BASE_URL;
    const path = this.props.location.pathname;
    return (
      <>
        <header>
          <Navbar className="header" bg="light" expand="lg">
            <Navbar.Brand
              onClick={() => {
                this.props.history.push("/");
              }}
            >
              <svg height="3em" width="3em">
                <circle
                  cx="1.5em"
                  cy="1.5em"
                  r="1em"
                  stroke="white"
                  strokeWidth="3"
                  fill="#393939"
                />
                <circle
                  cx="1.5em"
                  cy="1.5em"
                  r=".4em"
                  stroke="white"
                  strokeWidth="3"
                  fill="orange"
                />
              </svg>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto align-items-center">
                <Link className={path === "/" ? "active" : ""} to="/">
                  Home
                </Link>
                <Link
                  className={this.vehicleRoute() ? "active" : ""}
                  to="/vehicles"
                >
                  Vehicle Types
                </Link>
                <Link
                  className={this.historyRoute() ? "active" : ""}
                  to="/history"
                >
                  History
                </Link>
                <Link to="/">About</Link>
                {this.props.auth.isLogin ? (
                  <div className="mail-btn mx-3">
                    <div className="mail-notif">1</div>
                    <NavDropdown className="mail-dropdown" title="" id="">
                      <NavDropdown.Item
                        onClick={() => {
                          this.props.history.push("/chat");
                        }}
                      >
                        <div className="d-flex justify-content-between pb-2">
                          <div className="fw-bold">User 1</div>
                          <div className="ps-5">Just now</div>
                        </div>
                        <div className="fw-bold">
                          Hey, there are 3 vespa left
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item
                        onClick={() => {
                          this.props.history.push("/chat");
                        }}
                      >
                        <div className="d-flex justify-content-between pb-2">
                          <div className="fw-bold">User 2</div>
                          <div className="ps-5">Yesterday</div>
                        </div>
                        <div className="">
                          Okay, thank you for the good service
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item
                        onClick={() => {
                          this.props.history.push("/chat");
                        }}
                      >
                        <div className="d-flex justify-content-between pb-2">
                          <div className="fw-bold">User 1</div>
                          <div className="ps-5">Yesterday</div>
                        </div>
                        <div className="fw-bold">
                          Hey, there are 3 vespa left
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item
                        onClick={() => {
                          this.props.history.push("/chat");
                        }}
                      >
                        <div className="d-flex justify-content-between pb-2">
                          <div className="fw-bold">User 2</div>
                          <div className="ps-5">Yesterday</div>
                        </div>
                        <div className="">
                          Okay, thank you for the good service
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                    </NavDropdown>
                  </div>
                ) : (
                  <Nav.Link
                    onClick={() => {
                      this.props.history.push("/login");
                    }}
                  >
                    <button title="login" className="btn-login ">
                      Login
                    </button>
                  </Nav.Link>
                )}
                {this.props.auth.isLogin ? (
                  <NavDropdown
                    className="profile-icon profile-photo"
                    style={{
                      backgroundImage: `url(${
                        this.props.auth.authInfo.image
                          ? url + this.props.auth.authInfo.image
                          : defaultImage
                      })`,
                    }}
                    title=""
                    id=""
                  >
                    <NavDropdown.Item
                      onClick={() => {
                        this.props.history.push("/profile");
                      }}
                    >
                      <div className="fw-bold pb-2">Edit Profile</div>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={() => {
                        this.props.history.push("/");
                      }}
                    >
                      <div className="fw-bold pb-2">Help</div>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className="">
                      <button
                        className="fw-bold p-0 logout-btn"
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure want to Logout?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#d33",
                            cancelButtonColor: "#00000",
                            confirmButtonText: "Yes",
                            reverseButtons: true,
                          }).then((result) => {
                            if (result.isConfirmed) {
                              this.signOutHandler();
                            }
                          });
                        }}
                      >
                        Logout
                      </button>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                  </NavDropdown>
                ) : (
                  <Nav.Link
                    onClick={() => {
                      this.props.history.push("/register");
                    }}
                  >
                    <button title="login" className="btn-register ">
                      Register
                    </button>
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          {this.state.loadingState && (
            <div className="loader loader-modal">
              <Loader type="TailSpin" color="#ffcd61" height={80} width={80} />
            </div>
          )}
        </header>
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => {
      dispatch(logoutAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));

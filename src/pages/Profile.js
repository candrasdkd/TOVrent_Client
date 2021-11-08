import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { profileAction } from "../redux/actionCreators/auth";
import Swal from "sweetalert2";
import defaultImage from "../assets/img/default-pp.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
const url = process.env.REACT_APP_BASE_URL;

class Profile extends React.Component {
  state = {
    email: "",
    password: "",
    gender: 0,
    address: "",
    phone: "",
    userName: "",
    dob: new Date(),
    files: "",
    profilePic: this.props.auth.authInfo.userImage
      ? url + this.props.auth.authInfo?.userImage
      : defaultImage,
  };
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  handleClick = () => {
    this.setState({ files: this.myRef.current.click() });
  };
  updateProfileHandler = () => {
    const form = new FormData();
    form.append(
      "email",
      this.state.email || this.props.auth.authInfo.userEmail
    );
    form.append(
      "picture",
      this.state.files || this.props.auth.authInfo.userImage
    );
    form.append(
      "gender",
      this.state.gender || this.props.auth.authInfo.userGender
    );
    form.append(
      "address",
      this.state.address || this.props.auth.authInfo.userAddress
    );
    form.append(
      "phone_number",
      this.state.phone || this.props.auth.authInfo.userPhone
    );
    form.append(
      "full_name",
      this.state.userName || this.props.auth.authInfo.userFullName
    );
    form.append(
      "dob",
      `${this.state.dob.getFullYear()}-${
        this.state.dob.getMonth() + 1
      }-${this.state.dob.getDate()}`
    );
    Swal.fire({
      title: "Do you want to save the changes?",
      confirmButtonColor: "#198754",
      showDenyButton: true,
      showCancelButton: false,
      denyButtonText: `Don't save`,
      confirmButtonText: "Save",
      icon: "question",
    }).then((result) => {
      if (result.isConfirmed) {
        this.props.updateProfile(
          form,
          this.props.auth.authInfo.userId,
          this.props.auth.token
        );
        Swal.fire("Saved!", "", "success");
        setTimeout(() => {
          this.props.history.push("/");
        }, 1000);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  // componentDidUpdate() {
  //   this.updateProfileHandler();
  // }

  render() {
    console.log(this.state.files || this.props.auth.authInfo.userImage);
    return (
      <>
        <Header />
        <main className="profile-container">
          <p className="profile-title">Profile</p>
          <section className="text-center top-profile">
            <div
              className="profile-photo profile-display-container"
              style={{
                backgroundImage: this.state.profilePic,
              }}
            >
              <img
                src={this.state.profilePic}
                alt="profile"
                className="profile-photo profile-display"
              />
              <button className="edit-profile" onClick={this.handleClick}>
                <label className="edit-icon" />
              </button>
              <input
                className="d-none"
                ref={this.myRef}
                type="file"
                onChange={(value) =>
                  this.setState({
                    files: value.target.files[0],
                    profilePic: URL.createObjectURL(value.target.files[0]),
                  })
                }
              />
            </div>
            <p className="profile-name">
              {this.props.auth.authInfo.userFullName}
            </p>
            <p className="profile-desc">
              {this.props.auth.authInfo.userEmail}
              <br />
              {this.props.auth.authInfo.userPhone}
            </p>
            <div className="gender">
              <label className="gender-container">
                Male
                <input
                  type="radio"
                  defaultChecked={
                    this.props.auth.authInfo.userGender === "Male"
                      ? "checked"
                      : ""
                  }
                  name="radio"
                  onClick={() => {
                    this.setState({ gender: "Male" });
                  }}
                />
                <span className="checkmark"></span>
              </label>
              <label className="gender-container">
                Female
                <input
                  type="radio"
                  defaultChecked={
                    this.props.auth.authInfo.userGender === "Female"
                      ? "checked"
                      : ""
                  }
                  name="radio"
                  onClick={() => {
                    this.setState({ gender: "Female" });
                  }}
                />
                <span className="checkmark"></span>
              </label>
            </div>
          </section>
          <section className="profile-fields">
            <div className="contacts">
              <p className="profile-fields-title">Contacts</p>
              <label className="profile-fields-subtitle" htmlFor="email">
                Email Address:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                defaultValue={this.props.auth.authInfo.userEmail}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
              <label className="profile-fields-subtitle" htmlFor="address">
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                defaultValue={this.props.auth.authInfo.userAddress}
                onChange={(e) => this.setState({ address: e.target.value })}
              />
              <label className="profile-fields-subtitle" htmlFor="mobile-num">
                Mobile Number:
              </label>
              <input
                type="number"
                id="mobile-num"
                name="mobile-num"
                defaultValue={this.props.auth.authInfo.userPhone}
                onChange={(e) => this.setState({ phone: e.target.value })}
              />
            </div>
            <div className="Identity">
              <p className="profile-fields-title">Identity</p>
              <div className="identity-container">
                <div className="flex-grow-1 identity-flex me-md-5">
                  <label className="profile-fields-subtitle" htmlFor="dname">
                    Display name:
                  </label>
                  <input
                    type="text"
                    id="dname"
                    name="dname"
                    defaultValue={this.props.auth.authInfo.userFullName}
                    onChange={(e) =>
                      this.setState({ userName: e.target.value })
                    }
                  />
                </div>
                <div className="flex-grow-1 identity-flex ms-md-5">
                  <label className="profile-fields-subtitle" htmlFor="MM/DD/YY">
                    MM/DD/YY
                  </label>
                  <input
                    type="date"
                    // id="DD/MM/YY"
                    name="MM/DD/YY"
                    defaultValue={new Date(
                      this.props.auth.authInfo.userDOB
                    ).toLocaleDateString("en-CA")}
                    onChange={(e) => {
                      this.setState({ dob: new Date(e.target.value) });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between edit-profile-button mt-5">
              <div>
                <Link to="#">
                  <button
                    className="btn-save-profile"
                    onClick={this.updateProfileHandler}
                  >
                    Save Change
                  </button>
                </Link>
              </div>
              <div>
                <Link to="#">
                  <button className="btn-edit-pass">Edit Password</button>
                </Link>
              </div>
              <div>
                <Link to="/">
                  <button className="btn-cancel">Cancel</button>
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
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
    updateProfile: (body, params, token) => {
      dispatch(profileAction(body, params, token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));
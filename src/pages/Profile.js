import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { profileAction } from "../redux/actionCreators/auth";
import { updatePasswordAction } from "../redux/actionCreators/user";
import Swal from "sweetalert2";
import defaultImage from "../assets/img/default-pp.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EditPassword from "../components/ModalEditPass";
const url = process.env.REACT_APP_BASE_URL;

class Profile extends React.Component {
  state = {
    email: "",
    password: "",
    gender: 0,
    address: "",
    phone: "",
    userName: "",
    dob: new Date(this.props.auth.authInfo.DOB).toLocaleDateString("en-CA"),
    files: "",
    profilePic: this.props.auth.authInfo.image
      ? url + this.props.auth.authInfo?.image
      : defaultImage,
    modalShow: false,
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
    form.append("email", this.state.email || this.props.auth.authInfo.email);
    form.append("picture", this.state.files || this.props.auth.authInfo.image);
    form.append("gender", this.state.gender || this.props.auth.authInfo.gender);
    form.append(
      "address",
      this.state.address || this.props.auth.authInfo.address
    );
    form.append(
      "phone_number",
      this.state.phone || this.props.auth.authInfo.phoneNumber
    );
    form.append(
      "full_name",
      this.state.userName || this.props.auth.authInfo.fullName
    );
    form.append(
      "dob",
      this.state.dob || this.props.auth.authInfo.DOB.toLocaleDateString("en-CA")
    );
    Swal.fire({
      title: "Do you want to save the changes?",
      confirmButtonColor: "#198754",
      showDenyButton: true,
      showCancelButton: false,
      denyButtonText: `Don't save`,
      confirmButtonText: "Save",
      icon: "question",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.props.updateProfile(
          form,
          this.props.auth.authInfo.id,
          this.props.auth.token
        );
        Swal.fire({
          icon: "success",
          title: "Update profile success",
          position: "top-start",
          timer: 2000,
          toast: true,
          showConfirmButton: false,
        });
        this.props.history.push("/");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  render() {
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
            <p className="profile-name">{this.props.auth.authInfo.fullName}</p>
            <p className="profile-desc">
              {this.props.auth.authInfo.email}
              <br />
              {this.props.auth.authInfo.phoneNumber}
            </p>
            <div className="gender">
              <label className="gender-container">
                Male
                <input
                  type="radio"
                  defaultChecked={
                    this.props.auth.authInfo.gender === "Male" ? "checked" : ""
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
                    this.props.auth.authInfo.gender === "Female"
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
                defaultValue={this.props.auth.authInfo.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
              <label className="profile-fields-subtitle" htmlFor="address">
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                defaultValue={this.props.auth.authInfo.address}
                onChange={(e) => this.setState({ address: e.target.value })}
              />
              <label className="profile-fields-subtitle" htmlFor="mobile-num">
                Mobile Number:
              </label>
              <input
                type="number"
                id="mobile-num"
                name="mobile-num"
                defaultValue={this.props.auth.authInfo.phoneNumber}
                onChange={(e) => this.setState({ phone: e.target.value })}
              />
            </div>
            <div className="Identity">
              <p className="profile-fields-title">Identity</p>
              <div className="identity-container">
                <div className="input-name flex-grow-1 identity-flex">
                  <label className="profile-fields-subtitle" htmlFor="dname">
                    Display name:
                  </label>
                  <input
                    type="text"
                    name="dname"
                    className=""
                    defaultValue={this.props.auth.authInfo.fullName}
                    onChange={(e) =>
                      this.setState({ userName: e.target.value })
                    }
                  />
                </div>
                <div className="flex-grow-1 identity-flex">
                  <label
                    className="input-date profile-fields-subtitle"
                    htmlFor="MM/DD/YY"
                  >
                    MM/DD/YY
                  </label>
                  <input
                    type="date"
                    name="MM/DD/YY"
                    defaultValue={this.state.dob}
                    onChange={(e) => {
                      this.setState({ dob: e.target.value });
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
                  <button
                    className="btn-edit-pass"
                    onClick={() => this.setState({ modalShow: true })}
                  >
                    Edit Password
                  </button>
                  <EditPassword
                    show={this.state.modalShow}
                    close={() => this.setState({ modalShow: false })}
                    id={this.props.auth.authInfo.id}
                    token={this.props.auth.token}
                  />
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
    updatePassword: (params, body, token) => {
      dispatch(updatePasswordAction(params, body, token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));

import { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { connect } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import backIcon from "../assets/img/icon/arrow-left.png";
import likeIcon from "../assets/img/icon/like-icon.png";
import Axios from "axios";
import { countUpAction, countDownAction } from "../redux/actionCreators/count";
// import Chat from "./ChatDetail";
import io from "socket.io-client";
const url = process.env.REACT_APP_BASE_URL;
const socket = io.connect(url);

class VehicleDetail extends Component {
  state = {
    id: "",
    image: "",
    quantity: 0,
    ownerId: "",
    city: "",
    name: "",
    address: "",
    price: "",
    capacity: "",
    category: "",
    room: "",
    showChat: false,
  };
  joinRoom = () => {
    if (this.state.room !== "") {
      socket.emit("join_room", this.state.room);
      // setShowChat(true);
    }
  };
  componentDidMount() {
    const propsVehicleId = this.props.match.params.id;
    Axios.get(`${url}/vehicles/${propsVehicleId}`)
      .then(({ data }) => {
        const dataResult = data.result[0];
        const createRoom = [
          dataResult.vehicleOwnerId,
          this.props.reduxState.auth.authInfo.userId,
          dataResult.vehicleId,
        ].join("");
        this.setState({
          id: dataResult.vehicleId,
          quantity: dataResult.vehicleQuantity,
          city: dataResult.vehicleCity,
          name: dataResult.vehicleName,
          image: dataResult.vehicleImage,
          address: dataResult.vehicleAddress,
          capacity: dataResult.vehicleCapacity,
          price: dataResult.vehiclePrice,
          category: dataResult.vehicleNameType,
          ownerId: dataResult.vehicleOwnerId,
          room: createRoom,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const pic = this.state.image;
    const { reduxState } = this.props;
    console.log(this.state.room);
    return (
      <>
        <Header />

        <>
          {!this.state.id && (
            <div className="loader view-detail-loader">
              <Spinner animation="grow" variant="warning" />
              <Spinner animation="grow" variant="warning" />
              <Spinner animation="grow" variant="warning" />
              <Spinner animation="grow" variant="warning" />
            </div>
          )}
          {this.state.id && (
            <main className="reserve-container">
              <div className="reservation-title">
                <Link to="/vehicles">
                  <img src={backIcon} alt="" />
                </Link>
                <span>Detail</span>
              </div>
              <section
                className="d-flex flex-column
            justify-content-center
            flex-xl-row mt-5
            "
              >
                <div className="detail-pic-container ">
                  <div className="d-flex justify-content-center">
                    <img
                      className="more-detail-big-pic"
                      alt=""
                      src={url + pic.split(",")[0]}
                    />
                  </div>
                  <div className="d-flex align-items-center mt-5 justify-content-center slide-image">
                    <button className="remove-btn-style mx-3">
                      <img alt="" className="small-arrow " src={backIcon} />
                    </button>
                    <img
                      className="more-detail-small-pic mx-3"
                      alt=""
                      src={pic.split(",")[0] && url + pic.split(",")[0]}
                    />
                    {pic.split(",")[1] ? (
                      <img
                        className="more-detail-small-pic mx-3"
                        alt=""
                        src={url + pic.split(",")[1]}
                      />
                    ) : (
                      ""
                    )}
                    <button className="remove-btn-style mx-3">
                      <img
                        alt=""
                        className="small-arrow flip-image"
                        src={backIcon}
                      />
                    </button>
                  </div>
                </div>
                <div className="product-reserve more-detail-container ">
                  <p className="reserve-vehicle-name">
                    {this.state.name} <br />
                    <span>{this.state.city}</span>
                  </p>
                  <p
                    className={
                      this.state.quantity !== 0
                        ? "available-color"
                        : "not-available-color"
                    }
                  >
                    {this.state.quantity !== 0 ? "Available" : "Not Available"}
                  </p>
                  <p className="detail-text">
                    Address: {this.state.address}
                    <br />
                    Capacity: {this.state.capacity} person
                    <br />
                    Type: {this.state.category}
                    <br /> Reservation before 2 PM
                  </p>
                  <p className="reserve-vehicle-name d-flex justify-content-end">
                    Rp {this.state.price.toLocaleString("de-DE")}/day
                  </p>
                </div>
              </section>
              {reduxState.auth.authInfo.authLevel === 3 ? (
                <section className="detail-btn-container d-lg-flex flex-lg-row justify-content-center">
                  <Link to="/chat" className="chat-admin mt-2 px-3">
                    <button
                      className="chat-admin"
                      onClick={() => {
                        this.setState({ showChat: true });
                      }}
                    >
                      Chat Admin
                    </button>
                  </Link>
                  <Link
                    to={`/reservation/${this.props.match.params.id}`}
                    className="reserve-from-detail mt-2 px-3"
                  >
                    {this.state.quantity !== 0 ? (
                      <button className="reserve-from-detail">
                        Reservation
                      </button>
                    ) : (
                      <button disabled className="reserve-from-detail">
                        Reservation
                      </button>
                    )}
                  </Link>
                  <Link to="/reservation" className="like-btn mt-2 px-3">
                    <button className="like-btn">
                      <img alt="" src={likeIcon}></img>Like
                    </button>
                  </Link>
                </section>
              ) : (
                <section className="detail-btn-container d-lg-flex flex-lg-row justify-content-center">
                  <Link to="/" className="chat-admin mt-2 px-3">
                    <button className="chat-admin">Add to Homepage</button>
                  </Link>
                  {(reduxState.auth.authInfo.userId === this.state.ownerId ||
                    reduxState.auth.authInfo.authLevel === 1) && (
                    <Link
                      to={`/edit-vehicle/${this.state.id}`}
                      className="reserve-from-detail mt-2 px-3"
                    >
                      <button className="reserve-from-detail">
                        Edit Vehicle
                      </button>
                    </Link>
                  )}
                </section>
              )}
            </main>
          )}
        </>

        <Footer />
      </>
    );
  }
}
const mapStateToProps = (reduxState) => {
  return {
    reduxState,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    countUp: () => {
      dispatch(countUpAction());
    },
    countDown: () => {
      dispatch(countDownAction());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(VehicleDetail));

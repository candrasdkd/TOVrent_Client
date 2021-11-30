import { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { postTransactions } from "../utils/https/Transaction";
import Axios from "axios";
import Swal from "sweetalert2";
import Header from "../components/Header";
import Footer from "../components/Footer";
import backIcon from "../assets/img/icon/arrow-left.png";
import CounterButton from "../components/CounterButton";
import { countDownAction, countUpAction } from "../redux/actionCreators/count";
const url = process.env.REACT_APP_BASE_URL;
class Reservation extends Component {
  state = {
    reserved: 1,
    duration: 1,
    reserveStartDate: "",
    id: "",
    image: "",
    quantity: "",
    ownerId: "",
    city: "",
    name: "",
    address: "",
    price: "",
    capacity: "",
    category: "",
  };

  onMinusHandler = () => {
    this.props.dispatch(countDownAction());
  };
  onPlusHandler = () => {
    this.props.dispatch(countUpAction());
  };

  addReserve = () => {
    if (this.state.reserved <= this.state.quantity)
      this.setState((prevState) => {
        return {
          reserved: prevState.reserved + 1,
        };
      });
  };
  removeReserve = () => {
    this.setState((prevState) => {
      if (this.state.reserved > 1) {
        return {
          reserved: prevState.reserved - 1,
        };
      }
    });
  };

  postPayHandler = () => {
    if (!this.state.reserveStartDate)
      return Swal.fire("Please Choose Rent Date!", "", "error");
    const reduxState = this.props.reduxState;
    const token = reduxState.auth.token;
    const propsVehicleId = this.props.match.params.id;
    const pickedDate = new Date(`${this.state.reserveStartDate}`);
    const finishedDate = new Date(
      pickedDate.setDate(pickedDate.getDate() + Number(this.state.duration))
    ).toLocaleDateString("en-CA");
    // const booking_code = String(
    //   `#${propsVehicleId}${reduxState.auth.authInfo.user_id}${
    //     this.state.city.split("")[0]
    //   }${new Date().getMilliseconds()}${
    //     this.state.name.split("")[0]
    //   }${this.state.category.split("", [0])}`
    // );
    const min = Math.ceil(11111111);
    const max = Math.floor(99999999);
    const payment_code = Math.floor(Math.random() * (max - min) + min);

    const body = {
      vehicle_id: propsVehicleId,
      user_id: reduxState.auth.authInfo.id,
      owner_id: this.state.ownerId,
      quantity: reduxState.count.number,
      price: reduxState.count.number * this.state.price,
      from_date: String(this.state.reserveStartDate),
      to_date: String(finishedDate),
      booking_code: payment_code,
      days: this.state.duration,
      status_id: 1,
      location: this.state.city,
      type: this.state.category,
    };
    postTransactions(body, token)
      .then((data) => {
        this.props.history.push(`/payment/${data.data.result.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    const propsVehicleId = this.props.match.params.id;
    Axios.get(`${url}/vehicles/${propsVehicleId}`)
      .then(({ data }) => {
        const dataResult = data.result[0];
        this.setState({
          id: dataResult.id,
          quantity: dataResult.quantity,
          city: dataResult.city,
          name: dataResult.name,
          image: dataResult.image,
          address: dataResult.address,
          capacity: dataResult.capacity,
          price: dataResult.price,
          category: dataResult.type,
          ownerId: dataResult.ownerId,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const pic = this.state.image;
    const { reduxState, countUp, countDown } = this.props;
    return (
      <>
        <Header />
        <main className="reserve-container">
          <div className="reservation-title">
            <Link to="/vehicles">
              <img src={backIcon} alt="" />
            </Link>
            <span>Reservation</span>
          </div>
          <section
            className="
          d-flex
          flex-column
          justify-content-center
          flex-xl-row
          reserve-detail
        "
          >
            <div className="d-flex justify-content-center">
              <img
                className="more-detail-big-pic"
                alt=""
                src={url + pic.split(",")[0]}
              />
            </div>
            <div className="flex-grow-1 product-reserve">
              <p className="reserve-vehicle-name">
                {this.state.name} <br />
                <span>{this.state.city}</span>
              </p>
              <div className="my-5">
                {this.state.quantity > 0 ? (
                  <CounterButton
                    onClickRemove={countDown}
                    onClickAdd={countUp}
                    value={reduxState.count.number}
                  />
                ) : (
                  <CounterButton value={"0"} disabled />
                )}
              </div>
              <p className="reserve-date-title">Reservation Date :</p>
              <div>
                <input
                  className="reserve-date"
                  type="date"
                  onChange={(e) => {
                    this.setState({ reserveStartDate: e.target.value });
                  }}
                />
              </div>
              <select
                className="duration"
                onChange={(e) => {
                  this.setState({ duration: e.target.value });
                }}
              >
                <option value="1">1 Day</option>
                <option value="2">2 Days</option>
                <option value="3">3 Days</option>
                <option value="4">4 Days</option>
                <option value="5">5 Days</option>
              </select>
            </div>
          </section>
          <button className="btn-pay" onClick={this.postPayHandler}>
            Pay now : Rp. {reduxState.count.number * this.state.price}
          </button>
        </main>
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
)(withRouter(Reservation));

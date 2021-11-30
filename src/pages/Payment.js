import React, { Component } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import backIcon from "../assets/img/icon/arrow-left.png";
import { Link, withRouter } from "react-router-dom";
import {
  getTransactionByID,
  patchTransaction,
} from "../utils/https/Transaction";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import Swal from "sweetalert2";

class Payment extends Component {
  state = {
    transactionDetail: {},
    vehicleDetail: false,
    image: "",
    vehicleName: "",
    totalQuantity: 0,
    totalPrice: "",
    name: "",
    email: "",
    phoneNumber: "",
    bookingCode: "",
    location: "",
    category: "",
    paymentMethod: "",
    startDate: new Date(),
    expiredDate: new Date(),
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    const token = this.props.auth.token;
    console.log(id);
    getTransactionByID(id, token)
      .then((data) => {
        const dataResult = data.data.result;
        this.setState({
          vehicleDetail: true,
          image: dataResult.picture,
          vehicleName: dataResult.vehicleName,
          totalQuantity: dataResult.totalQuantity,
          location: dataResult.location,
          totalPrice: dataResult.totalPrice,
          category: dataResult.vehicleType,
          name: dataResult.customer,
          email: dataResult.email,
          phoneNumber: dataResult.phoneNumber,
          paymentMethod: dataResult.paymentMethod,
          bookingCode: dataResult.bookingCode,
          startDate: dataResult.startDate,
          expiredDate: dataResult.expiredDate,
        });
        // this.setState({
        //   paymentMethod: this.state.transactionDetail.payment_method,
        // });
      })
      .catch((err) => console.log(err));
  }

  payButtonHandler = () => {
    const { id } = this.props.match.params;
    const token = this.props.auth.token;
    if (!this.state.paymentMethod)
      return Swal.fire("Please Choose Payment Method!", "", "error");
    const body =
      this.props.auth.authInfo.authLevel === 3
        ? {
            status_id: 2,
            method_payment: this.state.paymentMethod,
          }
        : {
            status_id: 3,
          };
    Swal.fire({
      icon: "success",
      title: "Payment Succeed",
      toast: true,
      timer: 3000,
      showConfirmButton: false,
    });
    patchTransaction(id, body, token)
      .then(() => {
        this.props.history.push("/history");
      })
      .catch((err) => console.log(err));
  };

  typeHandler = (typeId) => {
    if (typeId === 1) return "Cars";
    if (typeId === 2) return "Motorbike";
    if (typeId === 3) return "Bike";
  };

  render() {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[new Date(this.state.startDate).getMonth()];
    const days =
      new Date(this.state.startDate).getDate() +
      " - " +
      new Date(this.state.expiredDate).getDate();
    const year = new Date(this.state.startDate).getFullYear();
    const url = process.env.REACT_APP_BASE_URL;
    return (
      <>
        <Header />
        {!this.state.vehicleDetail && (
          <div className="loader view-detail-loader">
            <Loader
              category="TailSpin"
              color="#ffcd61"
              height={125}
              width={125}
            />
          </div>
        )}
        {this.state.vehicleDetail && (
          <main className="reserve-container">
            <div className="reservation-title">
              <Link to="/history">
                <img src={backIcon} alt="" />
              </Link>
              <span>Payment</span>
            </div>
            <section
              className="d-flex flex-column
          justify-content-center
          flex-xl-row mt-5
          "
            >
              <div className="payment-pic">
                <div className="d-flex justify-content-center">
                  <img
                    className="payment-pic"
                    alt=""
                    src={url + this.state.image.split(",")[0]}
                  />
                </div>
              </div>
              <div className="product-reserve payment-title-container ">
                <p className="reserve-vehicle-name">
                  {this.state.vehicleName} <br />
                  <span>{this.state.location}</span>
                </p>
                <p className="booking-code">{this.state.bookingCode}</p>
                <button
                  className="booking-code-btn"
                  onClick={(e) => {
                    navigator.clipboard.writeText(this.state.bookingCode);
                    Swal.fire({
                      icon: "success",
                      title: "Copied!",
                      toast: true,
                      timer: 1000,
                      showConfirmButton: false,
                    });
                  }}
                >
                  Copy Booking Code
                </button>
              </div>
            </section>
            <section className="payment-main pt-5">
              <div className="d-flex justify-content-between payment-row-1">
                <div className="payment-quantity">
                  <b>Quantity :</b>
                  {` ${this.state.totalQuantity}`}&nbsp;
                  {`${this.typeHandler(this.state.category)}s`}
                </div>
                <div className="reservation-date">
                  <b>Reservation Date :</b> {`${month} ${days} ${year}`}
                </div>
              </div>
              <div className="d-flex justify-content-between payment-row-2">
                <div className="order-details-container ">
                  <p className="order-details-title">
                    <b>Order details :</b>
                  </p>
                  <div className="order-details mb-2">
                    {`${this.state.totalQuantity} ${this.typeHandler(
                      this.state.category
                    )}s : Rp. ${this.state.totalPrice}`}
                  </div>
                  <p className="order-details-total fw-bold">
                    Total : {`Rp. ${this.state.totalPrice}`}
                  </p>
                </div>
                <div className="payer-identity-container">
                  <p className="payer-identity-title">
                    <b>Identity :</b>
                  </p>
                  <div className="payer-identity">
                    <div>{`${this.state.name} (${this.state.phoneNumber})`}</div>
                    <div>{this.state.email}</div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between payment-row-3">
                <div className="d-flex payment-code-container align-items-center">
                  <div className="payment-code-title">
                    <b>Payment Code :</b>
                  </div>
                  <div className="payment-code d-flex justify-content-center align-items-center">
                    <div className="flex-fill">{this.state.bookingCode}</div>
                    <button
                      className="payment-copy"
                      onClick={(e) => {
                        navigator.clipboard.writeText(this.state.bookingCode);
                        Swal.fire({
                          icon: "success",
                          title: "Copied!",
                          toast: true,
                          timer: 1000,
                          showConfirmButton: false,
                        });
                      }}
                    >
                      Copy
                    </button>
                  </div>
                </div>
                {this.props.auth.authInfo.authLevel === 3 ? (
                  <select
                    value={this.state.paymentMethod || "title"}
                    className="payment-methods"
                    onChange={(e) => {
                      this.setState({ paymentMethod: e.target.value });
                    }}
                  >
                    <option value="title" disabled>
                      Select Payment Methods
                    </option>
                    <option value="Cash">Cash</option>
                    <option value="Transfer">Transfer</option>
                  </select>
                ) : (
                  <select
                    defaultValue={this.state.paymentMethod}
                    className="payment-methods"
                  >
                    <option defaultValue={this.state.paymentMethod} disabled>
                      {this.state.paymentMethod}
                    </option>
                  </select>
                )}
              </div>
              <div className="finish-payment-container">
                <button
                  className="finish-payment-btn"
                  onClick={this.payButtonHandler}
                >
                  Finish payment
                </button>
              </div>
            </section>
          </main>
        )}
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

export default connect(mapStateToProps)(withRouter(Payment));

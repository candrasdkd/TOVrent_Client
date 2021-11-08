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
    paymentMethod: "",
    vehicleImage: "",
    vehicleName: "",
    totalQuantity: 0,
    totalPrice: "",
    userName: "",
    userEmail: "",
    userPhone: "",
    historyCode: "",
    historyLocation: "",
    historyVehicleType: "",
    historyStartDate: new Date(),
    historyExpiredDate: new Date(),
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    const token = this.props.auth.token;
    console.log(id);
    getTransactionByID(id, token)
      .then((data) => {
        console.log(data)
        const dataResult = data.data.result[0];
        this.setState({
          vehicleDetail: true,
          historyCode: dataResult.historyBookingCode,
          historyVehicleType: dataResult.historyVehicleType,
          historyStartDate: dataResult.historyStartDate,
          historyExpiredDate: dataResult.historyExpiredDate,
          vehicleName: dataResult.vehicleName,
          vehicleImage: dataResult.vehicleImage,
          totalQuantity: dataResult.historyQuantity,
          historyLocation: dataResult.historyhistoryLocation,
          totalPrice: dataResult.historyPrice,
          userName: dataResult.userName,
          userEmail: dataResult.userEmail,
          userPhone: dataResult.userPhone,
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
        setTimeout(() => {
          this.props.history.push("/");
        }, 1000);
      })
      .catch((err) => console.log(err));
  };

  render() {
    console.log(this.state.historyVehicleType)
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
    const month = monthNames[new Date(this.state.historyStartDate).getMonth()];
    const days =
      new Date(this.state.historyStartDate).getDate() +
      " - " +
      new Date(this.state.historyExpiredDate).getDate();
    const year = new Date(this.state.historyStartDate).getFullYear();
    const url = process.env.REACT_APP_BASE_URL;
    return (
      <>
        <Header />
        {!this.state.vehicleDetail && (
          <div className="loader view-detail-loader">
            <Loader type="TailSpin" color="#ffcd61" height={125} width={125} />
          </div>
        )}
        {this.state.vehicleDetail && (
          <main className="reserve-container">
            <div className="reservation-title">
              <Link to="/vehicles">
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
                    src={url + this.state.vehicleImage.split(",")[0]}
                  />
                </div>
              </div>
              <div className="product-reserve payment-title-container ">
                <p className="reserve-vehicle-name">
                  {this.state.vehicleName} <br />
                  <span>{this.state.historyLocation}</span>
                </p>
                <p className="booking-code">{this.state.historyCode}</p>
                <button
                  className="booking-code-btn"
                  onClick={(e) => {
                    navigator.clipboard.writeText(this.state.historyCode);
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
                  {` ${this.state.totalQuantity} ${this.state.historyVehicleType}(s)`}
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
                    {`${this.state.totalQuantity} ${this.state.historyVehicleType}(s) : Rp. ${this.state.totalPrice}`}
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
                    <div>{`${this.state.userName} (${this.state.userPhone})`}</div>
                    <div>{this.state.userEmail}</div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between payment-row-3">
                <div className="d-flex payment-code-container align-items-center">
                  <div className="payment-code-title">
                    <b>Payment Code :</b>
                  </div>
                  <div className="payment-code d-flex justify-content-center align-items-center">
                    <div className="flex-fill">{this.state.historyCode}</div>
                    <button
                      className="payment-copy"
                      onClick={(e) => {
                        navigator.clipboard.writeText(this.state.historyCode);
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
              </div>
              <div className="finish-payment-container">
                {/* <p className="text-center pay-before">
                  Pay Before :{" "}
                  {new Date(
                    newTimePost.setDate(newTimePost.getDate() + 1)
                  ).toLocaleDateString("en-CA")}
                  &nbsp;
                  {newTimePost.toLocaleTimeString("en-US")}
                </p> */}
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

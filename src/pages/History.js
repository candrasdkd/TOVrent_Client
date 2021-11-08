import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  getTransaction,
  deleteTransaction,
  getTransactionByUser,
} from "../utils/https/Transaction";
import Header from "../components/Header";
import Footer from "../components/Footer";
import arrow from "../assets/img/icon/arrow-left.png";
import Card from "../components/Cards";
import HistoryComponent from "../components/HistoryComponent";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import Loader from "react-loader-spinner";

class History extends Component {
  state = {
    history: [],
    newArrival: [
      {
        id: 5,
        title: "Lambhorgini",
        subtitle: "South Jakarta",
        picture:
          "https://user-images.githubusercontent.com/38064315/130649294-e7a3bf3c-2cd1-4091-88fd-3d73fe4e8c97.jpg",
      },
      {
        id: 6,
        title: "White Jeep",
        subtitle: "Kalimantan",
        picture:
          "https://user-images.githubusercontent.com/38064315/130650291-09e9a5a4-c62c-4edf-8fc3-c8d234dca9fc.jpg",
      },
    ],
    search: "",
    dateFilter: "",
    selectedHistory: "",
    loading: true,
  };
  authInfo = this.props.auth.authInfo;

  searchHandler = (e) => {
    e.preventDefault();
    let dateParams = "";
    const currentDate = new Date();
    switch (Number(this.state.dateFilter)) {
      case 1:
        dateParams = new Date(
          currentDate.setDate(currentDate.getDate() - 1)
        ).toLocaleDateString("en-CA");
        break;
      case 2:
        dateParams = new Date(
          currentDate.setDate(currentDate.getDate() - 7)
        ).toLocaleDateString("en-CA");
        break;
      case 3:
        dateParams = "0000-00-00";
        break;
      default:
        dateParams = "";
    }
    const params =
      this.authInfo.authLevel === 3
        ? {
            user_id: this.authInfo.user_id,
            keyword: this.state.search,
            filter_date: dateParams,
            sort: "DESC",
          }
        : {
            owner_id: this.authInfo.user_id,
            keyword: this.state.search,
            filter_date: dateParams,
            sort: "DESC",
          };
    getTransaction(params)
      .then((data) => {
        // this.setState({ history: data.data.result.data });
      })
      .catch((err) => {
        if (String(err).includes("404")) {
          this.setState({ history: [] });
        }
      });
  };

  deleteHandler = (e) => {
    e.preventDefault();
    const token = this.props.auth.token;
    if (!this.state.selectedHistory)
      return Swal.fire("Please Choose History!", "", "error");
    // const form = new URLSearchParams();
    const id = Number(this.state.selectedHistory);
    Swal.fire({
      title: "Are you sure you want to delete that history?",
      showCancelButton: true,
      confirmButtonText: "Delete!",
      denyButtonText: `Don't delete!`,
      confirmButtonColor: "#bb2d3b",
      cancelButtonColor: "#198754",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTransaction(id, token)
          .then((date) => Swal.fire("Item Deleted!", "", "success"))
          .catch((err) => console.log(err));
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  componentDidMount() {
    const params = this.authInfo.userId;
    const token = this.props.auth.token;
    getTransactionByUser(params, token)
      .then(({ data }) => {
        return this.setState({
          history: data.result,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: true });
      });
  }

  render() {
    return (
      <div>
        <Header />
        <main className="d-flex history-main">
          <div className="d-flex flex-column flex-fill">
            <div className="d-flex search-container">
              <form className="flex-grow-7" onSubmit={this.searchHandler}>
                <input
                  type="text"
                  placeholder="Search History"
                  autoComplete="off"
                  className="search-form-history"
                  onChange={(e) => {
                    this.setState({ search: e.target.value });
                  }}
                />
              </form>
              <div className="d-flex align-items-center flex-column history-checkbox">
                Select
              </div>
            </div>
            <div className="filter d-flex ">
              <select
                defaultValue="0"
                className="form-select"
                aria-label="select"
                onChange={(e) => {
                  this.setState({ dateFilter: e.target.value });
                }}
              >
                <option value="0" hidden disabled>
                  Date Added
                </option>
                <option value="1">Today</option>
                <option value="2">A week ago</option>
                <option value="3">More than a week ago</option>
              </select>
            </div>
            <form
              className="history-container"
              onChange={(e) => {
                this.setState({ selectedHistory: e.target.value });
              }}
            >
              <div className="time-stamp">Today</div>
              <div className="loader">
                <Loader
                  type="TailSpin"
                  color="#ffcd61"
                  height={80}
                  width={80}
                  visible={this.state.loading}
                />
              </div>
              {this.state.history?.map((data, idx) => {
                const currentDate = new Date();
                if (
                  new Date(data.historyStartDate) >=
                  new Date(currentDate.setDate(currentDate.getDate() - 1))
                )
                  return (
                    <HistoryComponent
                      key={idx}
                      id={data.historyId}
                      vehicleId={data.vehicleId}
                      vehicleName={data.vehicleName}
                      rentStart={new Date(
                        data.historyStartDate
                      ).toLocaleDateString("en-CA")}
                      rentFinish={new Date(
                        data.historyExpiredDate
                      ).toLocaleDateString("en-CA")}
                      image={data.vehicleImage}
                      price={data.historyPrice}
                      transactionStatus={data.historyStatusId}
                      authLevel={this.authInfo.authLevel}
                    />
                  );
                return "";
              })}
              <div className="time-stamp">A week ago</div>
              <div className="loader">
                <Loader
                  type="TailSpin"
                  color="#ffcd61"
                  height={80}
                  width={80}
                  visible={this.state.loading}
                />
              </div>
              {this.state.history?.map((data, idx) => {
                const currentDate = new Date();
                if (
                  new Date(data.historyStartDate) <=
                    new Date(currentDate.setDate(currentDate.getDate() - 1)) &&
                  new Date(data.historyStartDate) >=
                    new Date(currentDate.setDate(currentDate.getDate() - 7))
                )
                  return (
                    <HistoryComponent
                      key={idx}
                      id={data.historyId}
                      vehicleId={data.vehicleId}
                      vehicleName={data.vehicleName}
                      rentStart={new Date(
                        data.historyStartDate
                      ).toLocaleDateString("en-CA")}
                      rentFinish={new Date(
                        data.historyExpiredDate
                      ).toLocaleDateString("en-CA")}
                      image={data.vehicleImage}
                      price={data.historyPrice}
                      transactionStatus={data.historyStatusId}
                      authLevel={this.authInfo.authLevel}
                    />
                  );
                return "";
              })}
              <div className="time-stamp">More than a week ago</div>
              <div className="loader">
                <Loader
                  type="TailSpin"
                  color="#ffcd61"
                  height={80}
                  width={80}
                  visible={this.state.loading}
                />
              </div>
              {this.state.history?.map((data, idx) => {
                const currentDate = new Date();
                if (
                  new Date(data.historyStartDate) <=
                  new Date(currentDate.setDate(currentDate.getDate() - 7))
                )
                  return (
                    <HistoryComponent
                      key={idx}
                      id={data.historyId}
                      vehicleId={data.vehicleId}
                      vehicleName={data.vehicleName}
                      rentStart={new Date(
                        data.historyStartDate
                      ).toLocaleDateString("en-CA")}
                      rentFinish={new Date(
                        data.historyExpiredDate
                      ).toLocaleDateString("en-CA")}
                      image={data.vehicleImage}
                      price={data.historyPrice}
                      transactionStatus={data.historyStatusId}
                      authLevel={this.authInfo.authLevel}
                    />
                  );
                return "";
              })}
              <button className="delete-btn" onClick={this.deleteHandler}>
                Delete selected item
              </button>
            </form>
          </div>
          <div className="new-arrival">
            <div className="text-center new-arrival-title">New Arrival</div>
            <div className="d-flex flex-column new-arrival-items">
              {this.state.newArrival?.map((data) => {
                return (
                  <Card
                    key={data.id}
                    link={`/detail/${data.id}`}
                    picture={data.picture}
                    title={data.title}
                    subtitle={data.subtitle}
                  />
                );
              })}
            </div>
            <div className="text-center mt-3">View more</div>
            <div className="d-flex justify-content-center">
              <Link to="/vehicles" className="view-more-new-arrival">
                <img alt="" className="view-more-new-arrival" src={arrow} />
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(withRouter(History));

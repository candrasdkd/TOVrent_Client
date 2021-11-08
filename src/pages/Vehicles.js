import { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Cards";
import Axios from "axios";
import Spinner from "react-bootstrap/Spinner";
const url = process.env.REACT_APP_BASE_URL;

class Vehicles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataVehicles: [],
      search: [],
      popular: [],
      cars: [],
      motorcycle: [],
      bike: [],
      isSearch: false,
      keywoard: [],
      location: [],
    };
  }
  axiosGet = (query) => {
    Axios.get(`${url}/vehicles${query}`)
      .then(({ data }) => {
        this.setState({
          search: data.result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  searchVehicleHandler = () => {
    // e.preventDefault();
    const query = `?keyword=${this.state.keywoard}&location=${this.state.location}&limit=15`;
    this.props.history.push(`/search${query}`);
    this.axiosGet(query);
  };
  componentDidMount() {
    const getPerType = (filter) => {
      Axios.get(`${url}/vehicles?type_id=${filter}&limit=4`)
        .then(({ data }) => {
          this.setState({ dataVehicles: data.result.data });
          if (filter === 1) {
            this.setState({
              cars: data.result.data,
            });
          }
          if (filter === 2) {
            this.setState({
              motorcycle: data.result.data,
            });
          }
          if (filter === 3) {
            this.setState({
              bike: data.result.data,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    Axios.get(`${url}/vehicles/popular/`)
      .then(({ data }) => {
        this.setState({ popular: data.result.data });
      })
      .catch((err) => {
        console.log(err);
      });
    getPerType(1);
    getPerType(2);
    getPerType(3);
    // console.log(this.state.dataVehicles)
  }
  render() {
    console.log(this.state.motorcycle)
    return (
      <>
        <Header />
        <main className="vehicles-container">
          <div
            autoComplete="off"
            className="vehicle-form"
            onKeyPress={(event) => {
              event.key === "Enter" && this.searchVehicleHandler();
            }}
          >
            <input
              type="text"
              className="search-form"
              placeholder="Search vehicle (ex. Honda)"
              onChange={(e) =>
                this.setState({
                  keywoard: e.target.value,
                  isSearch: true,
                })
              }
            />
            <input
              type="text"
              className="location-form"
              placeholder="Location (ex. Jakarta)"
              onChange={(e) => {
                this.setState({
                  location: e.target.value,
                  isSearch: true,
                });
              }}
            />
            <button
              onClick={this.searchVehicleHandler}
              className="btn-search-vehicle"
            >
              {" "}
              Search{" "}
            </button>
            {/* {this.state.search.length > 0 ? (
              <>
                <h2 className="popular-title mt-5 mb-5">Search Result :</h2>
                <div className="row justify-content-around align-items-center">
                  {this.state.search?.map((data) => {
                    return (
                      <Card
                        key={data.id}
                        link={`/detail/${data.id}`}
                        picture={url + data.picture.split(",")[0]}
                        title={data.name}
                        subtitle={data.city}
                      />
                    );
                  })}
                </div>
              </>
            ) : (
              <h2 className="mt-5">
                {this.state.searchError === 404 ? "Product Not Found" : ""}
              </h2>
            )} */}
          </div>
          <section className="vehicle-list">
            <div className="d-flex justify-content-between popular-title-container">
              <div className="popular-title">Popular in Town</div>
              <Link
                to={`/view-more?type_id=${this.state.dataVehicles.id}`}
                className="text-view"
              >
                View all <span className="fw-bolder">&nbsp;&nbsp;&gt;</span>
              </Link>
            </div>
            {!this.state.popular[0] && (
              <div className="loader">
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="warning" />
              </div>
            )}
            <div className="row justify-content-around align-items-center mb-5">
              {this.state.popular?.map((data) => {
                return (
                  <Card
                    key={data.id}
                    link={`/detail/${data.id}`}
                    picture={url + data.picture.split(",")[0]}
                    title={data.name}
                    subtitle={data.city}
                  />
                );
              })}
            </div>
            <div className="d-flex justify-content-between popular-title-container">
              <div className="popular-title">Cars</div>
              <Link
                to={`/view-more?type_id=1`}
                className="text-view"
              >
                View all <span className="fw-bolder">&nbsp;&nbsp;&gt;</span>
              </Link>
            </div>
            {!this.state.cars[0] && (
              <div className="loader">
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="warning" />
              </div>
            )}
            <div className="row justify-content-around align-items-center mb-5">
              {this.getVehicleHandler}
              {this.state.cars?.map((data) => {
                return (
                  <Card
                    key={data.id}
                    link={`/detail/${data.id}`}
                    picture={url + data.picture.split(",")[0]}
                    title={data.name}
                    subtitle={data.city}
                  />
                );
              })}
            </div>
            <div className="d-flex justify-content-between popular-title-container">
              <div className="popular-title">Motorcycle</div>
              <Link
                to={`/view-more?type_id=2`}
                className="text-view"
              >
                View all <span className="fw-bolder">&nbsp;&nbsp;&gt;</span>
              </Link>
            </div>
            {!this.state.motorcycle[0] && (
              <div className="loader">
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="warning" />
              </div>
            )}
            <div className="row justify-content-around align-items-center mb-5">
              {this.state.motorcycle?.map((data) => {
                return (
                  <Card
                    key={data.id}
                    link={`/detail/${data.id}`}
                    picture={url + data.picture.split(",")[0]}
                    title={data.name}
                    subtitle={data.city}
                  />
                );
              })}
            </div>
            <div className="d-flex justify-content-between popular-title-container">
              <div className="popular-title">Bike</div>
              <Link
                to={`/view-more?type_id=2`}
                className="text-view"
              >
                View all <span className="fw-bolder">&nbsp;&nbsp;&gt;</span>
              </Link>
            </div>
            {!this.state.bike[0] && (
              <div className="loader">
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="warning" />
              </div>
            )}
            <div className="row justify-content-around align-items-center mb-5">
              {this.state.bike.map((data) => {
                return (
                  <Card
                    key={data.id}
                    link={`/detail/${data.id}`}
                    picture={url + data.picture.split(",")[0]}
                    title={data.name}
                    subtitle={data.city}
                  />
                );
              })}
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}

export default withRouter(Vehicles);

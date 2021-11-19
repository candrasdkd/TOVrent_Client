import { Component } from "react";
import { withRouter } from "react-router-dom";

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
      title: [],
      nextPage: null,
      prevPage: null,
    };
  }
  axiosGet = (query) => {
    Axios.get(`${url}/vehicles${query}&limit=10`)
      .then(({ data }) => {
        // console.log(data);
        this.setState({
          dataVehicles: data.result.data,
          title: data.result.data[0].type,
          nextPage: data.nextPage,
          prevPage: data.prevPage,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  nextPage = () => {
    Axios.get(`${url}${this.state.nextPage}`)
      .then(({ data }) => {
        this.setState({
          dataVehicles: data.result.data,
          nextPage: data.nextPage,
          prevPage: data.prevPage,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    const querySearch = this.props.location.search;
    querySearch && this.axiosGet(querySearch);
  }
  render() {
    // console.log(this.state.dataVehicles);
    return (
      <>
        <Header />
        <main className="vehicles-container">
          <section className="vehicle-list">
            <div className="d-flex justify-content-between popular-title-container">
              <div className="popular-title">{this.state.title}</div>
            </div>
            {!this.state.dataVehicles[0] && (
              <div className="loader">
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="warning" />
              </div>
            )}
            <div className="row justify-content-around align-items-center mb-5">
              {this.state.dataVehicles?.map((data) => {
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
            <div className="d-flex justify-content-center mb-2 mt-5">
              <p
                className="me-5 ms-5"
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  backgroundColor: "#393939",
                  width: "2.5rem",
                  height: "2.5rem",
                  textAlign: "center",
                  paddingTop: "5px",
                  borderRadius: "10px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                1
              </p>
              <p
                className="me-5 ms-5"
                onClick={this.nextPage()}
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  backgroundColor: "#393939",
                  width: "2.5rem",
                  height: "2.5rem",
                  textAlign: "center",
                  paddingTop: "5px",
                  borderRadius: "10px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                2
              </p>
              <p
                className="me-5 ms-5"
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  backgroundColor: "#393939",
                  width: "2.5rem",
                  height: "2.5rem",
                  textAlign: "center",
                  paddingTop: "5px",
                  borderRadius: "10px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                3
              </p>
              <p
                className="me-5 ms-5"
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  backgroundColor: "#393939",
                  width: "2.5rem",
                  height: "2.5rem",
                  textAlign: "center",
                  paddingTop: "5px",
                  borderRadius: "10px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                4
              </p>
              <p
                className="me-5 ms-5"
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  backgroundColor: "#393939",
                  width: "2.5rem",
                  height: "2.5rem",
                  textAlign: "center",
                  paddingTop: "5px",
                  borderRadius: "10px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                5
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}

export default withRouter(Vehicles);

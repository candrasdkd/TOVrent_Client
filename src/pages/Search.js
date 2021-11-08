import { Component } from "react";
import { withRouter } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Cards";
import Axios from "axios";
// import Spinner from "react-bootstrap/Spinner";
const url = process.env.REACT_APP_BASE_URL;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: [],
      keywoard: [],
      location: [],
      type: [],
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
  searchVehicleHandler = (e) => {
    // e.preventDefault();
    const query = `?keyword=${this.state.keywoard}&location=${this.state.location}&type_id=${this.state.type}&limit=15`;
    this.props.history.push(`/search${query}`);
    this.axiosGet(query);
  };
  componentDidMount() {
    const querySearch = this.props.location.search;
    // console.log(querySearch);
    querySearch && this.axiosGet(querySearch);
  }
  render() {
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
                })
              }
            />
            <input
              type="text"
              className="location-form"
              placeholder="Location (ex. Jakarta)"
              onChange={(e) =>
                this.setState({
                  location: e.target.value,
                })
              }
            />
            <button
              onClick={this.searchVehicleHandler}
              className="btn-search-vehicle"
            >
              {" "}
              Search{" "}
            </button>
            <select
              defaultValue="Type"
              className="item3 bg-white"
              onChange={(e) => {
                this.setState({ type: e.target.value });
              }}
            >
              <option value="Type" disabled>
                Type
              </option>
              <option value="1">Car</option>
              <option value="2">Motorcycle</option>
              <option value="3">Bike</option>
            </select>
            {this.props.location.search !== "?keyword=&location=&type_id=&limit=15" &&
            this.state.search.length > 0 ? (
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
              <h2 className="mt-5">Product Not Found</h2>
            )}
          </div>
        </main>
        <Footer />
      </>
    );
  }
}

export default withRouter(Search);

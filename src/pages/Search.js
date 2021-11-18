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
      keyword: "",
      location: "",
      type: "",
    };
  }

  axiosGet = (query) => {
    Axios.get(`${url}/vehicles${query}&limit=15`)
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
    let query = "?";
    if (this.state.keyword) {
      query += `keyword=${this.state.keyword}&`;
    }
    if (this.state.location) {
      query += `location=${this.state.location}&`;
    }
    if (this.state.type) {
      query += `type_id=${this.state.type}&`;
    }
    this.props.history.push(`${query.slice(0, -1)}`);
    this.axiosGet(query);
  };

  componentDidMount() {
    const querySearch = this.props.location.search;
    let params = new URLSearchParams(this.props.location.search.substring(1));
    let keyword = params.get("keyword");
    let location = params.get("location");
    let type = params.get("type_id");
    this.setState({
      keyword: keyword,
      location: location,
      type: type,
    });
    console.log(querySearch);
    querySearch && this.axiosGet(querySearch);
  }

  render() {
    let params = new URLSearchParams(this.props.location.search.substring(1));
    let keyword = params.get("keyword");
    let location = params.get("location");
    let type = params.get("type_id");
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
              defaultValue={keyword}
              className="search-form"
              placeholder="Search vehicle (ex. Honda)"
              onChange={(e) =>
                this.setState({
                  keyword: e.target.value,
                })
              }
            />
            <input
              type="text"
              defaultValue={location}
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
              defaultValue={type ? type : "Type"}
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
            {this.props.location.search !==
              "?keyword=&location=&type_id=&limit=15" &&
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

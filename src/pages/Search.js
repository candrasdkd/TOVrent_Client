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
      sort: "",
      error: "",
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
        this.setState({
          error: String(err).includes(404),
        });
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
    if (this.state.sort === "1") {
      query += `order_by=v.price&sort=ASC&`;
    }
    if (this.state.sort === "2") {
      query += `order_by=v.price&sort=DESC&`;
    }
    if (this.state.sort === "3") {
      query += `order_by=v.name&sort=ASC&`;
    }
    if (this.state.sort === "4") {
      query += `order_by=v.name&sort=DESC&`;
    }
    this.setState({
      error: false,
    });
    this.props.history.push({
      pathname: "/search",
      search: `${query.slice(0, -1)}`,
    });
    this.axiosGet(query);
  };

  componentDidMount() {
    const querySearch = this.props.location.search;
    let params = new URLSearchParams(this.props.location.search.substring(1));
    let keyword = params.get("keyword");
    let location = params.get("location");
    let type = params.get("type_id");
    let sort = params.get("order_by");
    this.setState({
      keyword: keyword,
      location: location,
      type: type,
      sort: sort,
    });
    querySearch && this.axiosGet(querySearch);
  }

  render() {
    let params = new URLSearchParams(this.props.location.search.substring(1));
    let keyword = params.get("keyword");
    let location = params.get("location");
    let type = params.get("type_id");
    let sort = params.get("sort");
    return (
      <>
        <Header />
        <main className="vehicles-container">
          <div
            autoComplete="off"
            className="vehicle-search"
            onKeyPress={(event) => {
              event.key === "Enter" && this.searchVehicleHandler();
            }}
          >
            <div className="d-flex justify-content-between">
              <input
                type="text"
                defaultValue={keyword}
                className="search"
                placeholder="Search vehicle (ex. Honda)"
                onChange={(e) =>
                  this.setState({
                    keyword: e.target.value,
                  })
                }
              />
              <select
                defaultValue={location ? location : "Location"}
                className="search-location bg-white"
                onChange={(e) => {
                  this.setState({ location: e.target.value });
                }}
              >
                <option value="Location" disabled>
                  Location
                </option>
                <option value="Yogyakarta">Yogyakarta</option>
                <option value="Kalimantan">Kalimantan</option>
                <option value="Malang">Malang</option>
                <option value="Jakarta">Jakarta</option>
                <option value="Bali">Bali</option>
              </select>
              <select
                defaultValue={type ? type : "Type"}
                className="search-type bg-white"
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
              <select
                defaultValue={sort ? sort : "Sort By"}
                className="search-sort bg-white"
                onChange={(e) => {
                  this.setState({ sort: e.target.value });
                }}
              >
                <option value={"Sort By"} disabled>
                  Sort By
                </option>
                <option value={1}>Lowest price</option>
                <option value={2}>Highest price</option>
                <option value={3}>A to Z</option>
                <option value={4}>Z to A</option>
              </select>
            </div>
            <div className="d-flex justify-content-end">
              <button
                className="btn-search-query"
                onClick={this.searchVehicleHandler}
              >
                {" "}
                Search{" "}
              </button>
            </div>
            {this.props.location.search !== "" && !this.state.error ? (
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

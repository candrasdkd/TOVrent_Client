import { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import star from "../assets/img/icon/Vectorstar.png";
import plusVector from "../assets/img/icon/vector-plus.png";
import Card from "../components/Cards";
import Loader from "react-loader-spinner";

class Home extends Component {
  state = {
    popular: [],
    keywoard: [],
    location: [],
    type: [],
  };

  componentDidMount() {
    const url = process.env.REACT_APP_BASE_URL;
    Axios.get(`${url}/vehicles/popular/`)
      .then(({ data }) => {
        this.setState({ popular: data.result.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  searchHandler() {
    this.props.history.push(
      `/search?keyword=${this.state.keywoard}&location=${this.state.location}&type_id=${this.state.type}&limit=15`
    );
  }

  render() {
    const data = this.state.popular || [];
    const url = process.env.REACT_APP_BASE_URL;
    return (
      <div className="home-page">
        <Header />
        <main>
          <section className="bg-home">
            {/* <div className="bg-opacity"></div> */}
            <div className="home-container d-flex flex-column">
              <h2 className="title-home">Explore and Travel</h2>
              <h3 className="subtitle-home">Vehicle Finder</h3>
              <svg className="mb-5" width="5vh" height="2">
                <rect width="5vh" height="2" />
              </svg>
              <div
                className="width-dropdown"
                onKeyPress={(event) => {
                  event.key === "Enter" && this.searchHandler();
                }}
              >
                <input
                  type="text"
                  className="item1 search-home"
                  placeholder="Search vehicle (ex. Honda)"
                  onChange={(e) => this.setState({ keywoard: e.target.value })}
                />
                <select
                  defaultValue="Location"
                  className="item2 bg-white"
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
                  <option value="South Jakarta">South Jakarta</option>
                </select>
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
                  <option value="3">Bicycle</option>
                </select>
              </div>
              <div className="btn-search-container">
                <button
                  title="search"
                  className="btn-search"
                  onClick={() => this.searchHandler()}
                >
                  Search
                </button>
              </div>
            </div>
          </section>
          <section className="main-article">
            <div className="d-flex justify-content-between popular-title-container">
              <div className="popular-title d-flex align-items-center justify-content-center">
                Popular in Town
              </div>
              <Link to={"/vehicles"} className="text-view">
                View all <span className="fw-bolder">&nbsp;&nbsp;&gt;</span>
              </Link>
            </div>
            {!data[0] && (
              <div className="loader">
                <Loader
                  type="TailSpin"
                  color="#ffcd61"
                  height={80}
                  width={80}
                />
              </div>
            )}
            <div className="row justify-content-around align-items-center mb-5">
              {data?.map((data) => {
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
            {this.props.auth.authInfo.authLevel === 1 ||
            this.props.auth.authInfo.authLevel === 2 ? (
              <div className={"btn-add-container"}>
                <button
                  type="button"
                  className="btn add-vehicle-home"
                  onClick={() => {
                    this.props.history.push("/add-vehicle");
                  }}
                >
                  Add New Vehicle
                </button>
              </div>
            ) : (
              ""
            )}
          </section>

          <section className="testimonials">
            <div className="testimonials-title">Testimonials</div>
            <div className="container-testimonials">
              <div className="d-flex flex-column review">
                <div className="star">
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                </div>
                <p className="review-text font-mulish">
                  ”It was the right decision to rent vehicle here, I spent less
                  money and enjoy the trip. It was an amazing experience to have
                  a ride for wildlife trip!”
                </p>
                <p className="founder-circle">
                  Edward Newgate
                  <span>
                    <br />
                    Founder Circle
                  </span>
                </p>
              </div>
              <div className="d-flex justify-content-center review-photo-container">
                <div className="review-photo">
                  <div className="d-flex big-green-circle justify-content-center align-items-center">
                    <div className="big-white-circle"></div>
                  </div>
                  <img src={plusVector} className="plus-vector" alt="" />
                  <div className="white-box">
                    <button title="left-button-profile" className="left-button">
                      <Link to="#">
                        <svg height="40" width="40">
                          <circle
                            cx="20"
                            cy="20"
                            r="17"
                            stroke="#D7D7D7"
                            strokeWidth="3"
                            fill="white"
                          />
                        </svg>
                      </Link>
                      <div className="left-arrow"></div>
                    </button>
                    <button
                      title="right-button-profile"
                      className="right-button"
                    >
                      <Link to="#">
                        <svg height="40" width="40">
                          <circle
                            cx="20"
                            cy="20"
                            r="17"
                            stroke="black"
                            strokeWidth="3"
                            fill="white"
                          />
                        </svg>
                      </Link>
                      <div className="right-arrow"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
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

export default connect(mapStateToProps)(withRouter(Home));

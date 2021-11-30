import { Component } from "react";
import { withRouter } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Cards";
import Axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
const url = process.env.REACT_APP_BASE_URL;

class Vehicles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataVehicles: [],
      nextPage: null,
      prevPage: null,
      totalData: null,
      totalPage: null,
      currentPage: 1,
      todosPerPage: 12,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleLastClick = this.handleLastClick.bind(this);
    this.handleFirstClick = this.handleFirstClick.bind(this);
  }
  axiosGet = (query, pageNumber) => {
    // let pageNumber = this.state.currentPage;
    Axios.get(`${url}${query}&page=${this.state.currentPage}`)
      .then(({ data }) => {
        console.log(data);
        this.setState({
          dataVehicles: data.result.data,
          nextPage: data.result.nextPage,
          prevPage: data.result.prevPage,
          totalData: data.result.totalData,
          totalPage: data.result.totalPage,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleClick(event) {
    event.preventDefault();
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  handleLastClick(event) {
    event.preventDefault();
    this.setState({
      currentPage: 0,
    });
  }
  handleFirstClick(event) {
    event.preventDefault();
    this.setState({
      currentPage: 1,
    });
  }
  componentDidMount() {
    const querySearch = this.props.location.state.detail;
    let config = "";
    switch (querySearch) {
      case "/popular":
        config = "/vehicles/popular?limit=100";
        break;
      case "/car":
        config = "/vehicles?type_id=1&limit=100";
        break;
      case "/motorbike":
        config = "/vehicles?type_id=2&limit=100";
        break;
      case "/bike":
        config = "/vehicles?type_id=3&limit=100";
        break;

      default:
        break;
    }
    // console.log(config);
    config && this.axiosGet(config);
  }
  render() {
    let prev = 0;
    let last = 0;
    let { dataVehicles, currentPage, todosPerPage } = this.state;
    // Logic for displaying current todos
    let indexOfLastTodo = currentPage * todosPerPage;
    let indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    let currentTodos = dataVehicles.slice(indexOfFirstTodo, indexOfLastTodo);
    prev = currentPage > 0 ? currentPage - 1 : 0;
    last = Math.ceil(dataVehicles.length / todosPerPage);
    // next = last === currentPage ? currentPage : currentPage + 1;

    // Logic for displaying page numbers
    let pageNumbers = [];
    for (let i = 1; i <= last; i++) {
      pageNumbers.push(i);
    }
    return (
      <>
        <Header />
        <main className="vehicles-container">
          <section className="vehicle-list">
            <div className="d-flex justify-content-between popular-title-container">
              <div className="popular-title">
                {this.props.location.state.detail.charAt(1).toUpperCase() +
                  this.props.location.state.detail.slice(2)}
              </div>
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
              {currentTodos.map((todo, index) => {
                return (
                  <Card
                    key={index}
                    link={`/detail/${todo.id}`}
                    picture={url + todo.picture.split(",")[0]}
                    title={todo.name}
                    subtitle={todo.city}
                  />
                );
              })}
            </div>
            <Pagination className="pagination">
              <PaginationItem>
                {prev === 0 ? (
                  <PaginationLink disabled>First</PaginationLink>
                ) : (
                  <PaginationLink
                    onClick={this.handleFirstClick}
                    id={prev}
                    href={prev}
                  >
                    First
                  </PaginationLink>
                )}
              </PaginationItem>
              <PaginationItem>
                {prev === 0 ? (
                  <PaginationLink disabled>Prev</PaginationLink>
                ) : (
                  <PaginationLink
                    onClick={this.handleClick}
                    id={prev}
                    href={prev}
                  >
                    Prev
                  </PaginationLink>
                )}
              </PaginationItem>
              {pageNumbers.map((number, i) => (
                <Pagination key={i}>
                  <PaginationItem
                    active={
                      pageNumbers[currentPage - 1] === number ? true : false
                    }
                  >
                    <PaginationLink
                      onClick={this.handleClick}
                      href={number}
                      key={number}
                      id={number}
                    >
                      {number}
                    </PaginationLink>
                  </PaginationItem>
                </Pagination>
              ))}

              <PaginationItem>
                {currentPage === last ? (
                  <PaginationLink disabled>Next</PaginationLink>
                ) : (
                  <PaginationLink
                    onClick={this.handleClick}
                    id={pageNumbers[currentPage]}
                    href={pageNumbers[currentPage]}
                  >
                    Next
                  </PaginationLink>
                )}
              </PaginationItem>

              <PaginationItem>
                {currentPage === last ? (
                  <PaginationLink disabled>Last</PaginationLink>
                ) : (
                  <PaginationLink
                    onClick={this.handleLastClick}
                    id={pageNumbers[currentPage]}
                    href={pageNumbers[currentPage]}
                  >
                    Last
                  </PaginationLink>
                )}
              </PaginationItem>
            </Pagination>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}

export default withRouter(Vehicles);

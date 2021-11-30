import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import backIcon from "../assets/img/icon/arrow-left.png";
import { useDispatch, useSelector } from "react-redux";
import CounterButton from "../components/CounterButton";
import { countDownAction, countUpAction } from "../redux/actionCreators/count";
import cameraIcon from "../assets/img/icon/camera-icon.png";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";
import { patchVehicleAction } from "../redux/actionCreators/vehicles";

function EditVehicle(props) {
  const url = process.env.REACT_APP_BASE_URL;
  const propsVehicleId = props.match.params.id;
  const counter = useSelector((reduxState) => reduxState.count);
  const reduxAuth = useSelector((reduxState) => reduxState.auth);
  const dispatch = useDispatch();
  const [dataArray, setDataArray] = useState([]);
  const [firstChangeImage, setFirstChangeImage] = useState("");
  const [secondChangeImage, setSecondChangeImage] = useState("");
  const [thirdChangeImage, setThirdChangeImage] = useState("");
  const [firstImageDisplay, setFirstImageDisplay] = useState("");
  const [secondImageDisplay, setSecondImageDisplay] = useState("");
  const [thirdImageDisplay, setThirdImageDisplay] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleLocation, setvehicleLocation] = useState("");
  const [vehicleLocationId, setvehicleLocationId] = useState("");
  const [setVehicleDescription] = useState("");
  const [vehiclePrice, setVehiclePrice] = useState("");
  const [vehicleQuantity, setvehicleQuantity] = useState("");
  const [vehicleTypeId, setvehicleTypeId] = useState("");
  const [vehicleNameType, setvehicleNameType] = useState("");
  const hiddenFileInput1 = React.useRef(null);
  const hiddenFileInput2 = React.useRef(null);
  const hiddenFileInput3 = React.useRef(null);

  useEffect(() => {
    axios
      .get(`${url}/vehicles/${propsVehicleId}`)
      .then(({ data }) => {
        setDataArray(data.result);
        const dataResult = data.result[0];
        if (dataResult.image) {
          setFirstImageDisplay(dataResult.image.split(",")[0]);
          setSecondImageDisplay(dataResult.image.split(",")[1]);
          setThirdImageDisplay(dataResult.image.split(",")[2]);
        }
        setVehicleName(dataResult.name);
        setvehicleLocation(dataResult.city);
        setvehicleLocationId(dataResult.cityId);
        setVehiclePrice(dataResult.price);
        setvehicleQuantity(dataResult.quantity);
        setvehicleNameType(dataResult.type);
        switch (dataResult.type) {
          case "Cars":
            setvehicleTypeId("1");
            break;
          case "Motorcycle":
            setvehicleTypeId("2");
            break;
          case "Bike":
            setvehicleTypeId("3");
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [propsVehicleId, url]);

  const mainPicHandler = () => {
    setFirstChangeImage(hiddenFileInput1.current.click());
  };
  const secondPicHandler = () => {
    setSecondChangeImage(hiddenFileInput2.current.click());
  };
  const thirdPicHandler = () => {
    setThirdChangeImage(hiddenFileInput3.current.click());
  };
  const onSubmit = () => {
    setvehicleQuantity(counter.number);
    if (vehicleTypeId === "" || vehicleTypeId === "categoryTitle") {
      return window.alert("Please Choose Vehicle Type!");
    }
    const form = new FormData();
    form.append("name", vehicleName);
    form.append("city_id", vehicleLocationId);
    form.append("price", vehiclePrice);
    form.append("quantity", vehicleQuantity);
    form.append("type_id", vehicleTypeId);
    if (firstChangeImage !== "") {
      form.append("picture", firstChangeImage);
    }
    if (secondChangeImage !== "") {
      form.append("picture", secondChangeImage);
    }
    if (thirdChangeImage !== "") {
      form.append("picture", thirdChangeImage);
    }
    dispatch(patchVehicleAction(propsVehicleId, form, reduxAuth.token));
    Swal.fire("Vehicle Added!", "", "success");
    props.history.push(`/detail/${propsVehicleId}`);
  };

  return (
    <>
      <Header />
      {dataArray.length > 0 ? (
        <main className="add-vehicle-main">
          <section className="d-flex reservation-title">
            <Link
              to={"/detail/" + propsVehicleId}
              className="d-flex align-items-center"
            >
              <img src={backIcon} alt="" />
            </Link>
            <span>Edit item</span>
          </section>
          <section className="d-flex flex-row add-vehicle-container my-4">
            <div className="add-image-container d-flex flex-column align-items-center justify-content-center">
              <img
                style={{
                  cursor: "pointer",
                }}
                src={url + firstImageDisplay}
                onClick={mainPicHandler}
                className="add-main-image d-flex align-items-center flex-column justify-content-center"
                alt=""
              />
              <input
                className="d-none"
                name="vehicle-photo"
                ref={hiddenFileInput1}
                type="file"
                onChange={(value) => {
                  if (value.target.files[0]) {
                    setFirstChangeImage(value.target.files[0]);
                    setFirstImageDisplay(
                      URL.createObjectURL(value.target.files[0])
                    );
                  }
                }}
              />
              <div className="add-alt-image-container d-flex justify-content-between">
                <div
                  onClick={secondPicHandler}
                  style={{
                    cursor: "pointer",
                  }}
                  className="add-alt-image1"
                >
                  {secondImageDisplay && (
                    <img
                      alt=""
                      src={url + secondImageDisplay}
                      className="second-pic-edit"
                    />
                  )}
                  {!secondImageDisplay && (
                    <div className="cam-container">
                      <img alt="" src={cameraIcon} className="cam-icon" />
                      <span>Click to add image</span>
                    </div>
                  )}
                </div>
                <input
                  className="d-none"
                  ref={hiddenFileInput2}
                  type="file"
                  onChange={(value) => {
                    if (value.target.files[0]) {
                      setSecondChangeImage(value.target.files[0]);
                      setSecondImageDisplay(
                        URL.createObjectURL(value.target.files[0])
                      );
                    }
                  }}
                />
                <div
                  onClick={thirdPicHandler}
                  style={{
                    cursor: "pointer",
                  }}
                  className="add-alt-image1"
                >
                  {thirdImageDisplay && (
                    <img
                      alt=""
                      src={url + thirdImageDisplay}
                      className="second-pic-edit"
                    />
                  )}
                  {!thirdImageDisplay && (
                    <div className="cam-container">
                      <>
                        <div>+</div>
                        Add more
                      </>
                    </div>
                  )}
                </div>
                <input
                  className="d-none"
                  ref={hiddenFileInput3}
                  type="file"
                  onChange={(value) => {
                    if (value.target.files[0]) {
                      setThirdChangeImage(value.target.files[0]);
                      setThirdImageDisplay(
                        URL.createObjectURL(value.target.files[0])
                      );
                    }
                  }}
                />
              </div>
            </div>
            <div className="d-flex flex-column add-vehicle-detail-container justify-content-between pb-5 fs-4">
              <input
                type="text"
                name="vehicleName"
                placeholder="Name (max up to 50 words)"
                value={vehicleName}
                onChange={(value) => setVehicleName(value.target.value)}
              />
              <input
                type="text"
                name="vehicleDescription"
                placeholder="Description (max up to 150 words)"
                // value={vehicleDescription}
                onChange={(value) => setVehicleDescription(value.target.value)}
              />
              <div>
                <p>Location:</p>
                <select
                  className="add-location"
                  name="vehicleLocation"
                  defaultValue={vehicleLocation}
                  onChange={(value) => {
                    setvehicleLocationId(value.target.value);
                  }}
                >
                  <option hidden value="locationTitle">
                    {vehicleLocation}
                  </option>
                  <option className="option-add-vehicle" value="1">
                    Bali
                  </option>
                  <option className="option-add-vehicle" value="2">
                    Yogyakarta
                  </option>
                  <option className="option-add-vehicle" value="3">
                    Jakarta
                  </option>
                  <option className="option-add-vehicle" value="4">
                    Kalimantan
                  </option>
                  <option className="option-add-vehicle" value="5">
                    Malang
                  </option>
                </select>
              </div>
              <div>
                <p>Price:</p>
                <input
                  className="vehiclePrice"
                  type="number"
                  name="vehiclePrice"
                  placeholder="Type the price"
                  value={vehiclePrice}
                  onChange={(value) => setVehiclePrice(value.target.value)}
                />
              </div>
              <div className="vehicle-stock d-flex">
                <p>Stock:</p>
                <CounterButton
                  onClickRemove={() => {
                    dispatch(countDownAction());
                    setvehicleQuantity(vehicleQuantity - 1);
                  }}
                  onClickAdd={() => {
                    dispatch(countUpAction());
                    setvehicleQuantity(vehicleQuantity + 1);
                  }}
                  value={vehicleQuantity}
                />
              </div>
            </div>
          </section>
          <section className="add-vehicle-button d-flex justify-content-center my-4">
            <select
              className="add-item-button"
              name="vehicleCategory"
              defaultValue={vehicleNameType}
              onChange={(value) => {
                setvehicleTypeId(value.target.value);
              }}
            >
              <option hidden value="categoryTitle">
                {vehicleNameType}
              </option>
              <option value="1">Cars</option>
              <option value="2">Motorbike</option>
              <option value="3">Bike</option>
            </select>
            <button className="save-item-button " onClick={onSubmit}>
              Save item
            </button>
          </section>
        </main>
      ) : (
        <div className="loader view-detail-loader">
          <Spinner animation="grow" variant="warning" />
          <Spinner animation="grow" variant="warning" />
          <Spinner animation="grow" variant="warning" />
          <Spinner animation="grow" variant="warning" />
        </div>
      )}
      <Footer />
    </>
  );
}

export default withRouter(EditVehicle);

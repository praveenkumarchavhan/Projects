import {
  Button,
  Form,
  Nav,
  Navbar,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import Navigationbar from "./Navigationbar";
import { Link, useLocation } from "react-router-dom";
import { FaCircle, FaHeart, FaRegHeart } from "react-icons/fa";
import AlertPopup from "./AlertPopup";
import card from "../Images/card2.webp";
import { useEffect, useState } from "react";
import axios from "axios";
function CarPreviewAsCompany() {
  const location = useLocation();
  const receivedValue = location.state?.value || "No value received";
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCarByBrand(receivedValue);
  }, [receivedValue]);

  const fetchCarByBrand = async (carBrand) => {
    try {
      const response = await axios.get(
        `http://localhost:8181/get-car-by-brand?carBrand=${carBrand}`
      );
      setCars(response.data);
      console.log(response.data);
      console.log(cars);
    } catch (error) {
      console.log(error);
    }
  };

  const uniqueCars = Array.from(new Set(cars.map((car) => car.carName))).map(
    (carName) => {
      return cars.find((car) => car.carName === carName);
    }
  );

  const renderTooltip = (description, name) => (
    <Popover id="popover-basic" className="w-100">
      <Popover.Header as="h5" className="text-center text-info">
        {name}
      </Popover.Header>
      <Popover.Body>{description}</Popover.Body>
    </Popover>
  );
  const formatPrice = (price) => {
    if (cars.length !== 0) {
      return price.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
        //   maximumFractionDigits: 2,
      });
    }
  };
  return (
    <>
      <Navigationbar />
      <div
        style={{ backgroundColor: "#fafafa" }}
        className="p-5 mb-0 p-0 d-flex justify-content-center"
      >
        <div className="loader d-flex justify-content-center "></div>
      </div>
      <div
        style={{ backgroundColor: "#fafafa" }}
        className="container-fluid vh-100"
      >
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-sm-12 col-md-8">
              <div className="row m-2 ">
                <div className="col-sm-6 col-md-9 ">
                  <h4>{receivedValue} Car Models</h4>
                </div>
                <div className="col-sm-6 col-md-3">
                  {/* <Form.Select aria-label="Default select example">
                    <option>Change Brand</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select> */}
                </div>
              </div>
              {uniqueCars.map((car) => (
                <div className="row">
                  <div className="col-sm-12 col-md-12 ">
                    <Link
                      className="text-decoration-none"
                      as={Link}
                      to={"/carpreview"}
                      state={{ value: car.newCarId }}
                    >
                      <div class="card mb-3 border-0 shadow-sm" style={{ maxWidth: "840px" }}>
                        <div class="row g-0">
                          <div class="col-md-4">
                            <img
                              src={`data:image/jpeg;base64,${car.carImage}`}
                              class="img-fluid rounded-start"
                              alt="..."
                            />
                          </div>
                          <div class="col-md-6">
                            <div class="card-body">
                              <h5 class="card-title m-0 p-0">
                                {car.carBrand + " " + car.carName}
                              </h5>
                              
                              {/* <p class="card-text">
                                petrol . mileage . transamission
                              </p> */}
                              <p class="card-text">
                                <small
                                  style={{ fontSize: "13px" }}
                                  class="text-body-secondary"
                                >
                                  {car.fuelType + " "}
                                  <FaCircle
                                    style={{ fontSize: "4px", color: "gray" }}
                                  />
                                  {" " + car.araimileage + " "}
                                  <FaCircle
                                    style={{ fontSize: "4px", color: "gray" }}
                                  />
                                  {" " + car.transmission}
                                </small>
                              </p>
                              <h5
                                class="card-title"
                                style={{ fontSize: "16px" }}
                              >
                                {formatPrice(car.carPrice)}
                              </h5>
                              <Link
                                className="text-decoration-none "
                                as={Link}
                                to={"/carpreviewprice"}
                                state={{ value: car.newCarId }}
                              >
                                <Button  variant="warning">
                                  Check On-Road Price
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CarPreviewAsCompany;

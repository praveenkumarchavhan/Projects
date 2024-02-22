import {
  Accordion,
  Button,
  Card,
  Collapse,
  Nav,
  Navbar,
  Placeholder,
  Table,
} from "react-bootstrap";
import Navigationbar from "./Navigationbar";
import { Link, useLocation } from "react-router-dom";
import card from "../Images/card2.webp";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import RatingStars from "./RatingStars";
function CarPreviewPrice() {
  const location = useLocation();
  const receivedValue = location.state?.value || "No value received";
  const [activeTab, setActiveTab] = useState("#"); // Default active tab
  const [car, setCar] = useState([]);
  const [user, setUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [newCarForAllVarient, setNewCarForAllVarient] = useState([]);
  const [carPricingForAllVarient, setCarPricingForAllVarient] = useState([]);
  const [newCarForDieselVarient, setNewCarForDieselVarient] = useState([]);
  const [carPricingForDieselVarient, setCarPricingForDieselVarient] = useState(
    []
  );
  const [newCarForPetrolVarient, setNewCarForPetrolVarient] = useState([]);
  const [carPricingForPetrolVarient, setCarPricingForPetrolVarient] = useState(
    []
  );
  const [newCarForCNGVarient, setNewCarForCNGVarient] = useState([]);
  const [carPricingForCNGVarient, setCarPricingForCNGVarient] = useState([]);
  const [newCarForAutomaticTransmission, setNewCarForAutomaticTransmission] =
    useState([]);
  const [
    carPricingForAutomaticTransmission,
    setCarPricingForAutomaticTransmission,
  ] = useState([]);
  const [firstModelPrice, setFirstModelPrice] = useState(null);
  const [lastModelPrice, setLastModelPrice] = useState(null);
  const [rating, setRating] = useState(null);
  const [totalRatings, setTotalRatings] = useState(null);
  useEffect(() => {
    fetchData(receivedValue);
  }, [receivedValue]);

  const fetchData = async (newCarId) => {
    try {
      const response = await axios.get(
        `http://localhost:8181/find-car-by-id?newCarId=${newCarId}`
      );
      setCar(response.data.newCar);
      console.log(car);

      const email = Cookies.get("email");
      const user = await axios.get(
        `http://localhost:8181/get-user-details?email=${email}`
      );
      setUser(user.data);
      console.log(user);
      const ratingResponse = await axios.get(
        `http://localhost:8181/get-car-rating?newCarId=${newCarId}`
      );
      setRating(ratingResponse.data.rating);
      setTotalRatings(ratingResponse.data.totalRatings);
    } catch (error) {
      console.log(error);
    }
  };

  const formatPrice = (price) => {
    if (newCarForAllVarient.length !== 0) {
      return price.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
        //   maximumFractionDigits: 2,
      });
    }
  };
  const formatPriceForCard = (price) => {
      return price.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
        //   maximumFractionDigits: 2,
      });
  };

  const handleAllVarient = async (eventKey) => {
    setActiveTab(eventKey);
    try {
      const response = await axios.get(
        `http://localhost:8181/get-car-by-car-name?carName=${car.carName}`
      );
      setNewCarForAllVarient(response.data.newCar);
      setCarPricingForAllVarient(response.data.carPricing);
      setFirstModelPrice(response.data.newCar[0].carPrice);
      setLastModelPrice(
        response.data.newCar[response.data.newCar.length - 1].carPrice
      );
      // setFirstAndLastModelPriceState(
      //   response.data.newCar[0].carPrice,
      //   response.data.newCar[response.data.newCar.length - 1].carPrice
      // );

      console.log(response.data.newCar[0].carPrice);
      console.log(
        response.data.newCar[response.data.newCar.length - 1].carPrice
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDieselVarient = async (eventKey) => {
    setActiveTab(eventKey);
    const fueType = "Diesel";
    try {
      const response = await axios.get(
        `http://localhost:8181/get-car-by-fuel-type?fuelType=${fueType}&carName=${car.carName}`
      );
      setNewCarForDieselVarient(response.data.newCar);
      setCarPricingForDieselVarient(response.data.carPricing);
      console.log(response.data.newCar);
      console.log(response.data.carPricing);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePetrolVarient = async (eventKey) => {
    setActiveTab(eventKey);
    const fueType = "Petrol";
    try {
      const response = await axios.get(
        `http://localhost:8181/get-car-by-fuel-type?fuelType=${fueType}&carName=${car.carName}`
      );
      setNewCarForPetrolVarient(response.data.newCar);
      setCarPricingForPetrolVarient(response.data.carPricing);
      console.log(response.data.newCar);
      console.log(response.data.carPricing);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCNGVarient = async (eventKey) => {
    setActiveTab(eventKey);
    const fueType = "CNG";
    try {
      const response = await axios.get(
        `http://localhost:8181/get-car-by-fuel-type?fuelType=${fueType}&carName=${car.carName}`
      );
      setNewCarForCNGVarient(response.data.newCar);
      setCarPricingForCNGVarient(response.data.carPricing);
      console.log(response.data.newCar);
      console.log(response.data.carPricing);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAutomaticVarient = async (eventKey) => {
    setActiveTab(eventKey);
    const transmission = "Auto";
    try {
      const response = await axios.get(
        `http://localhost:8181/get-car-by-transmission?transmission=${transmission}&carName=${car.carName}`
      );
      setNewCarForAutomaticTransmission(response.data.newCar);
      setCarPricingForAutomaticTransmission(response.data.carPricing);
      console.log(response.data.newCar);
      console.log(response.data.carPricing);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navigationbar />
      {car.length !== 0 ? (
        <div style={{ backgroundColor: "#fafafa" }}>
          <div
            style={{ backgroundColor: "#fafafa" }}
            className="p-5 mb-0 p-0 d-flex justify-content-center"
          >
            <div className="loader d-flex justify-content-center"></div>
          </div>
          <div style={{ backgroundColor: "#FFFFFF" }} className="m-0 p-0">
            <div
              style={{ backgroundColor: "#FFFFFF" }}
              className="container-fluid mb-1 shadow-sm"
            >
              <Navbar style={{ backgroundColor: "#FFFFFF" }}>
                <Nav className="d-flex justify-content-center w-100 ">
                  <Nav.Link
                    state={{ value: car.newCarId }}
                    as={Link}
                    to={"/carpreview"}
                  >
                    {car.carName}
                  </Nav.Link>
                  <Nav.Link href="#">Price</Nav.Link>
                  <Nav.Link
                    as={Link}
                    state={{ value: car.newCarId }}
                    to="/userreviews"
                  >
                    User Reviews
                  </Nav.Link>
                  <Nav.Link href="#pricing">Images</Nav.Link>
                </Nav>
              </Navbar>
            </div>
          </div>
          <div
            style={{ backgroundColor: "#FFFFFF" }}
            className="container  shadow-sm "
          >
            <div className="row shadow-sm">
              <div className="col-md-12 p-4">
                <h3>
                  On Road Price of {car.carBrand + " " + car.carName} In{" "}
                  {user.city}
                </h3>
                <p>
                  Discover a range of options when it comes to{" "}
                  {car.carBrand + " " + car.carName} in {user.city}. With prices
                  starting at Rs. {formatPrice(firstModelPrice)} onwards, you
                  have a variety of choices to explore. Whether you're
                  interested in the {formatPrice(firstModelPrice)} or aiming for
                  the top-tier {formatPrice(lastModelPrice)}, we've got you
                  covered. Looking for a pre-owned option? Used {car.carBrand}{" "}
                  {car.carName} are available for sale. Don't miss out on the
                  opportunity to explore the diverse lineup of {car.carBrand}{" "}
                  {car.carName} in {user.city}. Visit our showroom today to
                  experience these incredible vehicles firsthand.
                </p>
              </div>
            </div>
          </div>

          <div
            style={{ backgroundColor: "#FFFFFF" }}
            className="container mt-2 vh-100 "
          >
            <div className="row shadow-sm">
              <div className="col-sm-12 col-md-3 p-3 d-flex justify-content-center">
                <Card style={{ width: "18rem", height:'24rem' }}>
                  <Card.Img
                    variant="top"
                    src={`data:image/jpeg;base64,${car.carImage}`}
                  />
                  <Card.Body>
                    <Card.Title>{car.carBrand + " " + car.carName}</Card.Title>

                    <p className="d-flex m-0 p-0">
                      <RatingStars rating={rating} />
                      &nbsp;
                      <p style={{ marginTop: "4px", fontSize: "13px" }}>
                        {" " + totalRatings + " "}reviews
                      </p>
                    </p>
                    <h5 className="mb-3">
                      {formatPriceForCard(car.carPrice) + " Lakh*"}
                    </h5>
                    <div className="d-grid ">
                      <Button variant="warning">Go Somewhere</Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>

              <div className="col-sm-12 col-md-9 p-4">
                <h5 className="">
                  {car.carBrand + " " + car.carName} On Road Price in{" "}
                  {user.city}
                </h5>
                <p className="mb-0 mt-0">&nbsp;</p>
                <Nav justify variant="tabs" defaultActiveKey="#" className="">
                  <Nav.Item>
                    <Nav.Link
                      onClick={() => handleAllVarient("#")}
                      href="#"
                      active={activeTab === "#"}
                      style={{
                        color: activeTab === "#" ? "white" : "black",
                        backgroundColor:
                          activeTab === "#" ? "#555555" : "transparent",
                      }}
                    >
                      All
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      onClick={() => handleDieselVarient("link-1")}
                      eventKey="link-1"
                      active={activeTab === "link-1"}
                      style={{
                        color: activeTab === "link-1" ? "white" : "black",
                        backgroundColor:
                          activeTab === "link-1" ? "#555555" : "transparent",
                      }}
                    >
                      Diesel
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      onClick={() => handlePetrolVarient("link-2")}
                      eventKey="link-2"
                      active={activeTab === "link-2"}
                      style={{
                        color: activeTab === "link-2" ? "white" : "black",
                        backgroundColor:
                          activeTab === "link-2" ? "#555555" : "transparent",
                      }}
                    >
                      Petrol
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      onClick={() => handleCNGVarient("link-3")}
                      eventKey="link-3"
                      active={activeTab === "link-3"}
                      style={{
                        color: activeTab === "link-3" ? "white" : "black",
                        backgroundColor:
                          activeTab === "link-3" ? "#555555" : "transparent",
                      }}
                    >
                      CNG
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      onClick={() => handleAutomaticVarient("link-4")}
                      eventKey="link-4"
                      active={activeTab === "link-4"}
                      style={{
                        color: activeTab === "link-4" ? "white" : "black",
                        backgroundColor:
                          activeTab === "link-4" ? "#555555" : "transparent",
                      }}
                    >
                      Automatic
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                {activeTab === "#" &&
                  newCarForAllVarient.map((car) => (
                    <div
                      className="p-2 mt-2 bg-light shadow-sm"
                      key={car.newCarId}
                      style={{ backgroundColor: "#f2f2f2" }}
                    >
                      <Accordion>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header
                            className="d-flex"
                            style={{
                              fontSize: "17px",
                            }}
                          >
                            <Link
                              key={car.newCarId}
                              style={{
                                cursor: "pointer",
                                textDecoration: "none",
                              }}
                              onClick={() => setOpen(!open)}
                              className="text-secondary"
                            >
                              {car.carModel}
                            </Link>
                          </Accordion.Header>
                          <Accordion.Body>
                            {carPricingForAllVarient
                              .filter((price) => price.id === car.newCarId) // Adjust the filtering condition
                              .map((price) => (
                                <Table
                                  striped
                                  hover
                                  key={price.id}
                                  borderless="true"
                                >
                                  <tbody style={{ fontSize: "15px" }}>
                                    <tr>
                                      <td colSpan={4}>
                                        {car.carModel +
                                          " (" +
                                          car.fuelType +
                                          ")"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>Ex-ShowroomPrice</td>
                                      <td>
                                        {formatPrice(price.exShowroomPrice)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>RTO</td>
                                      <td>{formatPrice(price.roadTax)}</td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>Insurance</td>
                                      <td>{formatPrice(price.insurance)}</td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>Other Charges</td>
                                      <td>{formatPrice(price.otherCharges)}</td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>Optional Charges</td>
                                      <td>
                                        {formatPrice(price.optionalCharges)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          backgroundColor: "#2176ae",
                                          color: "white",
                                        }}
                                        colSpan={2}
                                      >
                                        On-Road Price
                                      </td>
                                      <td
                                        style={{
                                          backgroundColor: "#2176ae",
                                          color: "white",
                                        }}
                                      >
                                        {formatPrice(price.onRoadPrice)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>EMI</td>
                                      <td>
                                        {formatPrice(parseInt(price.emi)) +
                                          " /month"}
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              ))}
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  ))}
                {activeTab === "link-1" &&
                  newCarForDieselVarient.map((car) => (
                    <div
                      className="p-2 mt-2 bg-light shadow-sm"
                      key={car.newCarId}
                    >
                      <Accordion>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header
                            className="d-flex"
                            style={{
                              fontSize: "17px",
                            }}
                          >
                            <Link
                              key={car.newCarId}
                              style={{
                                cursor: "pointer",
                                textDecoration: "none",
                              }}
                              onClick={() => setOpen(!open)}
                              className="text-secondary"
                            >
                              {car.carModel}
                            </Link>
                          </Accordion.Header>
                          <Accordion.Body>
                            {carPricingForDieselVarient
                              .filter((price) => price.id === car.newCarId) // Adjust the filtering condition
                              .map((price) => (
                                <Table
                                  striped
                                  hover
                                  key={price.id}
                                  borderless="true"
                                >
                                  <tbody>
                                    <tr>
                                      <td colSpan={4}>
                                        {car.carModel +
                                          " (" +
                                          car.fuelType +
                                          ")"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>Ex-ShowroomPrice</td>
                                      <td>
                                        {formatPrice(price.exShowroomPrice)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>RTO</td>
                                      <td>{formatPrice(price.roadTax)}</td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>Insurance</td>
                                      <td>{formatPrice(price.insurance)}</td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>Other Charges</td>
                                      <td>{formatPrice(price.otherCharges)}</td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>Optional Charges</td>
                                      <td>
                                        {formatPrice(price.optionalCharges)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          backgroundColor: "#2176ae",
                                          color: "white",
                                        }}
                                        colSpan={2}
                                      >
                                        On-Road Price
                                      </td>
                                      <td
                                        style={{
                                          backgroundColor: "#2176ae",
                                          color: "white",
                                        }}
                                      >
                                        {formatPrice(price.onRoadPrice)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>EMI</td>
                                      <td>
                                        {formatPrice(parseInt(price.emi)) +
                                          " /month"}
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              ))}
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  ))}
                {activeTab === "link-2" &&
                  newCarForPetrolVarient.map((car) => (
                    <div
                      className="p-2 mt-2 bg-light shadow-sm"
                      key={car.newCarId}
                    >
                      <Accordion>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header
                            className="d-flex"
                            style={{
                              fontSize: "17px",
                            }}
                          >
                            <Link
                              key={car.newCarId}
                              style={{
                                cursor: "pointer",
                                textDecoration: "none",
                              }}
                              onClick={() => setOpen(!open)}
                              className="text-secondary"
                            >
                              {car.carModel}
                            </Link>
                          </Accordion.Header>
                          <Accordion.Body>
                            {carPricingForPetrolVarient
                              .filter((price) => price.id === car.newCarId) // Adjust the filtering condition
                              .map((price) => (
                                <Table
                                  striped
                                  hover
                                  key={price.id}
                                  borderless="true"
                                >
                                  <tbody>
                                    <tr>
                                      <td colSpan={4}>
                                        {car.carModel +
                                          " (" +
                                          car.fuelType +
                                          ")"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>Ex-ShowroomPrice</td>
                                      <td>
                                        {formatPrice(price.exShowroomPrice)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>RTO</td>
                                      <td>{formatPrice(price.roadTax)}</td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>Insurance</td>
                                      <td>{formatPrice(price.insurance)}</td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>Other Charges</td>
                                      <td>{formatPrice(price.otherCharges)}</td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>Optional Charges</td>
                                      <td>
                                        {formatPrice(price.optionalCharges)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          backgroundColor: "#2176ae",
                                          color: "white",
                                        }}
                                        colSpan={2}
                                      >
                                        On-Road Price
                                      </td>
                                      <td
                                        style={{
                                          backgroundColor: "#2176ae",
                                          color: "white",
                                        }}
                                      >
                                        {formatPrice(price.onRoadPrice)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>EMI</td>
                                      <td>
                                        {formatPrice(parseInt(price.emi)) +
                                          " /month"}
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              ))}
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  ))}
                {activeTab === "link-3" &&
                  newCarForCNGVarient.map((car) => (
                    <div
                      className="p-2 mt-2 bg-light shadow-sm"
                      key={car.newCarId}
                    >
                      <Accordion>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header
                            className="d-flex"
                            style={{
                              fontSize: "17px",
                            }}
                          >
                            <Link
                              key={car.newCarId}
                              style={{
                                cursor: "pointer",
                                textDecoration: "none",
                              }}
                              onClick={() => setOpen(!open)}
                              className="text-secondary"
                            >
                              {car.carModel}
                            </Link>
                          </Accordion.Header>
                          <Accordion.Body>
                            {carPricingForCNGVarient
                              .filter((price) => price.id === car.newCarId) // Adjust the filtering condition
                              .map((price) => (
                                <Table
                                  striped
                                  hover
                                  key={price.id}
                                  borderless="true"
                                >
                                  <tbody>
                                    <tr>
                                      <td colSpan={4}>
                                        {car.carModel +
                                          " (" +
                                          car.fuelType +
                                          ")"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>Ex-ShowroomPrice</td>
                                      <td>
                                        {formatPrice(price.exShowroomPrice)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>RTO</td>
                                      <td>{formatPrice(price.roadTax)}</td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>Insurance</td>
                                      <td>{formatPrice(price.insurance)}</td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>Other Charges</td>
                                      <td>{formatPrice(price.otherCharges)}</td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>Optional Charges</td>
                                      <td>
                                        {formatPrice(price.optionalCharges)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          backgroundColor: "#2176ae",
                                          color: "white",
                                        }}
                                        colSpan={2}
                                      >
                                        On-Road Price
                                      </td>
                                      <td
                                        style={{
                                          backgroundColor: "#2176ae",
                                          color: "white",
                                        }}
                                      >
                                        {formatPrice(price.onRoadPrice)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>EMI</td>
                                      <td>
                                        {formatPrice(parseInt(price.emi)) +
                                          " /month"}
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              ))}
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  ))}
                {activeTab === "link-4" &&
                  newCarForAutomaticTransmission.map((car) => (
                    <div
                      className="p-2 mt-2 bg-light shadow-sm"
                      key={car.newCarId}
                    >
                      <Accordion>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header
                            className="d-flex"
                            style={{
                              fontSize: "17px",
                            }}
                          >
                            <Link
                              key={car.newCarId}
                              style={{
                                cursor: "pointer",
                                textDecoration: "none",
                              }}
                              onClick={() => setOpen(!open)}
                              className="text-secondary"
                            >
                              {car.carModel}
                            </Link>
                          </Accordion.Header>
                          <Accordion.Body>
                            {carPricingForAutomaticTransmission
                              .filter((price) => price.id === car.newCarId) // Adjust the filtering condition
                              .map((price) => (
                                <Table
                                  striped
                                  hover
                                  key={price.id}
                                  borderless="true"
                                >
                                  <tbody>
                                    <tr>
                                      <td colSpan={4}>
                                        {car.carModel +
                                          " (" +
                                          car.fuelType +
                                          ")"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>Ex-ShowroomPrice</td>
                                      <td>
                                        {formatPrice(price.exShowroomPrice)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>RTO</td>
                                      <td>{formatPrice(price.roadTax)}</td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>Insurance</td>
                                      <td>{formatPrice(price.insurance)}</td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>Other Charges</td>
                                      <td>{formatPrice(price.otherCharges)}</td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>Optional Charges</td>
                                      <td>
                                        {formatPrice(price.optionalCharges)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          backgroundColor: "#2176ae",
                                          color: "white",
                                        }}
                                        colSpan={2}
                                      >
                                        On-Road Price
                                      </td>
                                      <td
                                        style={{
                                          backgroundColor: "#2176ae",
                                          color: "white",
                                        }}
                                      >
                                        {formatPrice(price.onRoadPrice)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>EMI</td>
                                      <td>
                                        {formatPrice(parseInt(price.emi)) +
                                          " /month"}
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              ))}
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Placeholder className="w-100 bg-light" as="p" animation="wave">
          <Placeholder className=" w-100 bg-light" xs={12} />
          <Placeholder className=" w-100 bg-light" xs={12} />
          <Placeholder className=" w-100 bg-light" xs={12} />
          <Placeholder className=" w-100 bg-light" xs={12} />
          <Placeholder className=" w-100 bg-light" xs={12} />
          <Placeholder className=" w-100 bg-light" xs={12} />
          <Placeholder className=" w-100 bg-light" xs={12} />
          <Placeholder className=" w-100 bg-light" xs={12} />
          <Placeholder className=" w-100 bg-light" xs={12} />
          <Placeholder className=" w-100 bg-light" xs={12} />
          <Placeholder className=" w-100 bg-light" xs={12} />
          <Placeholder className=" w-100 bg-light" xs={12} />
        </Placeholder>
      )}
    </>
  );
}
export default CarPreviewPrice;

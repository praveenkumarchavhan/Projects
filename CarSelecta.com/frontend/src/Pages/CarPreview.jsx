import Navigationbar from "./Navigationbar";
import card from "../Images/card2.webp";
import {
  FaCircle,
  FaHeart,
  FaPen,
  FaPenAlt,
  FaPenFancy,
  FaRegHeart,
  FaStar,
  FaTag,
  FaTags,
} from "react-icons/fa";
import {
  Button,
  Card,
  Container,
  Nav,
  Navbar,
  OverlayTrigger,
  Popover,
  Table,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import AlertPopup from "./AlertPopup";
import RatingStars from "./RatingStars";
function CarPreview() {
  const location = useLocation();
  const receivedValue = location.state?.value || "No value received";
  const [newCar, setNewCar] = useState([]);
  const [carPricing, setCarPricing] = useState([]);
  const [userLocation, setUserLocation] = useState("");
  const [mileageDescription, setMileageDescription] = useState("");
  const [carNameForImages, setCarNameForImages] = useState("");
  const [images, setImages] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(null);
  const [similarCarTypes, setSimilarCarTypes] = useState([]);
  const [user, setUser] = useState([]);
  const [sameBrandCars, setSameBrandCars] = useState([]);
  const [totalRatings, setTotalRatings] = useState(null);
  const [showAlertForAddToFavorite, setShowAlertForAddToFavorite] = useState(
    false
  );
  const [
    showAlertForRemoveFromFavorite,
    setShowAlertForRemoveFromFavorite,
  ] = useState(false);

  const [newCarForAllVarient, setNewCarForAllVarient] = useState([]);
  const [carPricingForAllVarient, setCarPricingForAllVarient] = useState([]);
  const [firstModelPrice, setFirstModelPrice] = useState(null);
  const [lastModelPrice, setLastModelPrice] = useState(null);

  const [showAlert, setShowAlert] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isVerticalMode = windowWidth < 768;

  useEffect(() => {
    fetchCarData(receivedValue);
  }, [receivedValue]);

  const fetchCarData = async (param) => {
    try {
      const email = Cookies.get("email");
      const response = await axios.get(
        `http://localhost:8181/find-car-by-id?newCarId=${param}`
      );
      setNewCar(response.data.newCar);
      setCarPricing(response.data.carPricing);
      setCarNameForImages(response.data.newCar.carName);

      console.log(response.data.newCar);
      setMileageDescription(
        `This ${response.data.newCar.carBrand} ${response.data.newCar.carName} offers impressive mileage figures. With an ARAI-certified mileage of ${response.data.newCar.araimileage}, it provides a balance between city and highway driving. In city conditions, you can expect to achieve around ${response.data.newCar.cityMileage}, while on the highway, the mileage goes up to ${response.data.newCar.highwayMileage}`
      );

      const user = await axios.get(
        `http://localhost:8181/get-user-details?email=${email}`
      );
      userDetails(user.data);
      setUser(user.data);

      const ratingResponse = await axios.get(
        `http://localhost:8181/get-car-rating?newCarId=${param}`
      );
      setRating(ratingResponse.data.rating);
      setTotalRatings(ratingResponse.data.totalRatings);

      const similarBrands = await axios.get(
        `http://localhost:8181/get-same-type-cars?carType=${response.data.newCar.carType}`
      );

      setSimilarCarTypes(similarBrands.data);

      const allVarientresponse = await axios.get(
        `http://localhost:8181/get-car-by-car-name?carName=${response.data.newCar.carName}`
      );
      setNewCarForAllVarient(allVarientresponse.data.newCar);
      setCarPricingForAllVarient(allVarientresponse.data.carPricing);
      setFirstModelPrice(allVarientresponse.data.newCar[0].carPrice);
      setLastModelPrice(
        allVarientresponse.data.newCar[
          allVarientresponse.data.newCar.length - 1
        ].carPrice
      );

      const sameBrandCarsResponse = await axios.get(
        `http://localhost:8181/get-car-by-brand?carBrand=${response.data.newCar.carBrand}`
      );
      setSameBrandCars(sameBrandCarsResponse.data);
      console.log(sameBrandCarsResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  const uniqueCars = Array.from(
    new Set(sameBrandCars.map((car) => car.carName))
  ).map((carName) => {
    return sameBrandCars.find((car) => car.carName === carName);
  });
  //   For images
  useEffect(() => {
    fetchCarImages(carNameForImages);
  }, [carNameForImages]);

  const fetchCarImages = async (carName) => {
    const img = await axios.get(
      `http://localhost:8181/get-car-images?carName=${carName}`
    );
    setImages(img.data);
  };

  useEffect(() => {
    checkIsFavorite(receivedValue);
  }, [receivedValue]);

  const checkIsFavorite = async (newCarId) => {
    try {
      const email = Cookies.get("email");
      const response = await axios.get(
        `http://localhost:8181/is-car-favorite?email=${email}&newCarId=${newCarId}`
      );
      console.log(response.data);
      if (response.data === 200 && !isFavorite) {
        setIsFavorite(true);
        console.log(isFavorite);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const userDetails = (userObject) => setUserLocation(userObject.city);

  //   to formatte price and put (,) in between
  const formatPrice = (price) => {
    if (newCar && newCar.carPrice && firstModelPrice) {
      return price.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
        //   maximumFractionDigits: 2,
      });
    }
  };

  //   Add to wishList
  const addToFavorite = async (newCarId) => {
    setIsFavorite(true);
    try {
      const email = Cookies.get("email");
      await axios.get(
        `http://localhost:8181/add-to-favorite?email=${email}&newCarId=${newCarId}`
      );

      setIsFavorite(true);
      setShowAlertForAddToFavorite(true);
      setTimeout(() => {
        setShowAlertForAddToFavorite(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  const removeFromFavorite = async (newCarId) => {
    console.log(newCarId);
    try {
      const email = Cookies.get("email");
      await axios.get(
        `http://localhost:8181/delete-from-favorite?newCarId=${newCarId}&email=${email}`
      );

      setIsFavorite(false);
      setShowAlertForRemoveFromFavorite(true);
      setTimeout(() => {
        setShowAlertForRemoveFromFavorite(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  //   for showing description for car on hovering on carName
  const renderTooltip = (description, name) => (
    <Popover id="popover-basic" className="w-100">
      <Popover.Header as="h5" className="text-center text-info">
        {name}
      </Popover.Header>
      <Popover.Body>{description}</Popover.Body>
    </Popover>
  );

  return (
    <>
      <Navigationbar />
      <div
        style={{ backgroundColor: "#fafafa" }}
        className="p-5 mb-0 p-0 d-flex justify-content-center"
      >
        <div className="loader d-flex justify-content-center"></div>
      </div>
      <div style={{ backgroundColor: "#fafafa" }} className="m-0 p-0">
        <div
          style={{ backgroundColor: "#FFFFFF" }}
          className="container-fluid mb-1"
        >
          <Navbar className="shadow-sm" style={{ backgroundColor: "#FFFFFF" }}>
            <Nav variant="" className="d-flex justify-content-center w-100">
              <Nav.Link href="#">{newCar.carName}</Nav.Link>
              <Nav.Link
                as={Link}
                state={{ value: newCar.newCarId }}
                to="/carpreviewprice"
              >
                Price
              </Nav.Link>
              <Nav.Link
                as={Link}
                state={{ value: newCar.newCarId }}
                to="/userreviews"
              >
                User Reviews
              </Nav.Link>
              <Nav.Link href="#pricing">Images</Nav.Link>
            </Nav>
          </Navbar>
        </div>
        <div
          style={{ backgroundColor: "#FFFFFF" }}
          className="container-fluid  shadow-sm "
        >
          <div className="row m-4  p-5">
            <div className="col-sm-12 col-md-5 d-flex">
              <img
                style={{
                  width: "30rem",
                  objectFit: "cover",
                  overflow: "hidden",
                }}
                src={`data:image/jpeg;base64,${newCar.carImage}`}
                alt=""
              />
            </div>
            <div className="col-sm-12 col-md-6 mt-2">
              <div
                style={{ justifyContent: "space-between" }}
                className="d-flex  "
              >
                <OverlayTrigger
                  placement="bottom-start"
                  delay={{ show: 250, hide: 200 }}
                  overlay={renderTooltip(
                    newCar.description,
                    newCar.carBrand + " " + newCar.carName
                  )}
                >
                  <h2>{newCar.carBrand + " " + newCar.carName}</h2>
                </OverlayTrigger>
                {newCar.length !== 0 ? (
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <div
                      className="circle-background"
                      style={{
                        width: "35px",
                        height: "35px",
                        backgroundColor: "#e9e9e9",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {isFavorite ? (
                        <FaHeart
                          className="heart-icon"
                          style={{
                            fontSize: "20px",
                            color: "red",
                            cursor: "pointer",
                          }}
                          onClick={() => removeFromFavorite(receivedValue)}
                        />
                      ) : (
                        <FaRegHeart
                          className="heart-icon text-secondary"
                          style={{
                            fontSize: "20px",
                            color: "red",
                            cursor: "pointer",
                          }}
                          onClick={() => addToFavorite(receivedValue)}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              {showAlertForAddToFavorite && (
                <AlertPopup message="Car is added to your collection!" />
              )}
              {showAlertForRemoveFromFavorite && (
                <AlertPopup message="Car is removes from your collection!" />
              )}
              <p className="d-flex">
                <RatingStars rating={rating} />
                &nbsp;
                <p style={{ marginTop: "4px", fontSize: "13px" }}>
                  {" " + totalRatings + " "}review
                </p>
              </p>

              <h4>{formatPrice(newCar.carPrice) + " Lakh*"}</h4>
              <> </>
              <p>
                <small className="text-secondary">
                  *Ex-showroom price in {userLocation}{" "}
                  <FaPen
                    className="mb-1 text-secondary"
                    style={{ fontSize: "10px" }}
                  />
                </small>
              </p>
              <Link
                className="text-decoration-none "
                as={Link}
                to={"/carpreviewprice"}
                state={{ value: newCar.newCarId }}
              >
                <Button style={{ width: "300px" }} variant="warning ">
                  Check On-Road Price
                </Button>
              </Link>
              <p className="mt-2">
                <small className="text-secondary">
                  <FaTags
                    style={{ fontSize: "18px" }}
                    className="text-secondary"
                  />{" "}
                  Don't miss out on the best offers for this month
                </small>
              </p>
            </div>
          </div>
        </div>
        <div className="container mt-3">
          <div className="row">
            <div className="col-sm-12 col-md-9">
              <div style={{ backgroundColor: "#FFFFFF" }} className="shadow-sm">
                <div className="p-4">
                  <h5>
                    <strong>{newCar.carBrand + " " + newCar.carName}</strong>
                  </h5>
                  <p>{newCar.description}</p>
                  <table>
                    <thead>
                      <tr>
                        <th>Variant</th>
                        <th>Ex-showroom price</th>
                        <th>Button</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{newCar.carModel}</td>
                        <td>{formatPrice(newCar.carPrice) + " Lakh*"}</td>
                        <td>
                          <div className="d-grid ">
                            <Button variant="warning">Check Offer</Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                style={{ backgroundColor: "#FFFFFF" }}
                className="shadow-sm mt-3"
              >
                <div className="p-4">
                  <h5>
                    <strong>
                      {newCar.carBrand + " " + newCar.carName} mileage
                    </strong>
                  </h5>
                  <p>{mileageDescription}</p>
                  <table>
                    <thead>
                      <tr>
                        <th>Fuel type</th>
                        <th>Transmission</th>
                        <th>ARAI Mileage</th>
                        <th>City Mileage</th>
                        <th>Highway Mileage</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{newCar.fuelType}</td>
                        <td>{newCar.transmission}</td>
                        <td>{newCar.araimileage}</td>
                        <td>{newCar.cityMileage}</td>
                        <td>{newCar.highwayMileage}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                style={{ backgroundColor: "#FFFFFF" }}
                className="shadow-sm mt-3"
              >
                <div className="p-4">
                  <h5>
                    <strong>
                      {newCar.carBrand + " " + newCar.carName} Images
                    </strong>
                  </h5>
                  {images.length !== 0 ? (
                    <Splide
                      className="d-flex p-5 justify-content-center "
                      options={{
                        type: "loop",
                        perPage: 2,
                        perMove: 1,
                        autoplay: {
                          delay: 100,
                        },
                        //   wheel: true,
                        pauseOnHover: true,
                        speed: 800,
                        drag: "free",
                        easing: "cubic-bezier(0.645, 0.045, 0.355, 1)",
                        keyboard: true,
                        direction: isVerticalMode ? "ttb" : "ltr", // "ttb" for top-to-bottom
                        height: isVerticalMode ? 500 : undefined,
                      }}
                    >
                      {images.map((image) => (
                        <SplideSlide className="p-4  d-flex justify-content-center align-items-center">
                          <Card
                            className="hover-element  overflow-hidden "
                            style={{ width: "18rem" }}
                          >
                            <Card.Img
                              variant="top"
                              src={`data:image/jpeg;base64,${image.carImage}`}
                            />
                          </Card>
                        </SplideSlide>
                      ))}
                    </Splide>
                  ) : (
                    <>Fetching...</>
                  )}
                </div>
              </div>

              <div
                style={{ backgroundColor: "#FFFFFF" }}
                className="shadow-sm mt-3"
              >
                <div className="p-4">
                  <h5>
                    <strong>
                      {newCar.carBrand + " " + newCar.carName} Price
                    </strong>
                  </h5>
                  <p>
                    Discover a range of options when it comes to{" "}
                    {newCar.carBrand + " " + newCar.carName} in {user.city}.
                    With prices starting at Rs. {formatPrice(firstModelPrice)}{" "}
                    onwards, you have a variety of choices to explore. Whether
                    you're interested in the {formatPrice(firstModelPrice)} or
                    aiming for the top-tier {formatPrice(lastModelPrice)}, we've
                    got you covered. Looking for a pre-owned option? Used{" "}
                    {newCar.carBrand} {newCar.carName} are available for sale.
                    Don't miss out on the opportunity to explore the diverse
                    lineup of {newCar.carBrand} {newCar.carName} in {user.city}.
                    Visit our showroom today to experience these incredible
                    vehicles firsthand."
                  </p>
                  <div className="row bg-light p-3">
                    <div
                      style={{ fontSize: "14px" }}
                      className="col-sm-6 col-md-6 text-secondary"
                    >
                      Varient
                    </div>
                    <div
                      style={{ fontSize: "14px" }}
                      className="col-sm-6 col-md-6 text-secondary"
                    >
                      Ex-ShowRoom Price
                    </div>
                  </div>
                  {newCarForAllVarient.map((car, index) => (
                    <div>
                      <div className="row p-1 mt-2">
                        <div className="col-sm-6 col-md-6">
                          <Link
                            className="text-decoration-none text-dark"
                            as={Link}
                            to={"/carpreview"}
                            onClick={() =>
                              (window.location.href = window.location.href)
                            }
                            state={{ value: car.newCarId }}
                          >
                            <p className="mb-0 pb-0">
                              {car.carName + " " + car.carModel}
                            </p>
                          </Link>
                          <p
                            style={{
                              color: "rgba(36,39,44,.5)",
                              fontSize: "14px",
                            }}
                            className="m-0 p-0"
                          >
                            <small>
                              {car.fuelType + " "}
                              <FaCircle style={{ fontSize: "5px" }} />
                              {" " + car.transmission + " "}
                              <FaCircle style={{ fontSize: "5px" }} />
                              {" " + car.araimileage}
                            </small>
                          </p>
                        </div>
                        <div className="col-sm-6 col-md-6">
                          <p className="m-0 p-0">
                            <strong>
                              {formatPrice(
                                carPricingForAllVarient[index].exShowroomPrice
                              ) + " "}
                              Lakh*
                            </strong>
                          </p>
                          <Link
                            style={{ fontSize: "11px", color: "#2176ae" }}
                            className="m-0 p-0 text-decoration-none"
                            as={Link}
                            to={"/carpreviewprice"}
                            state={{ value: newCar.newCarId }}
                          >
                            Get On Road Price
                          </Link>
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{ backgroundColor: "#FFFFFF" }}
                className="shadow-sm mt-3"
              >
                <div className="p-4">
                  <h5>
                    <strong>Get Similar {newCar.carType + "'s"}</strong>
                  </h5>
                  {uniqueCars.length !== 0 ? (
                    <Splide
                      className="d-flex p-5 justify-content-center "
                      options={{
                        type: "loop",
                        perPage: 2,
                        perMove: 1,
                        autoplay: {
                          delay: 100,
                        },
                        //   wheel: true,
                        pauseOnHover: true,
                        speed: 800,
                        drag: "free",
                        easing: "cubic-bezier(0.645, 0.045, 0.355, 1)",
                        keyboard: true,
                        direction: isVerticalMode ? "ttb" : "ltr", // "ttb" for top-to-bottom
                        height: isVerticalMode ? 500 : undefined,
                      }}
                    >
                      {similarCarTypes.map((similarCar) => (
                        <SplideSlide className="p-4  d-flex justify-content-center align-items-center">
                          <Link
                            className="text-decoration-none text-secondary"
                            as={Link}
                            to={"/carpreview"}
                            onClick={() =>
                              (window.location.href = window.location.href)
                            }
                            state={{ value: similarCar.newCarId }}
                          >
                            <Card
                              className="hover-element m-4 overflow-hidden"
                              style={{ width: "18rem" }}
                            >
                              <Card.Img
                                variant="top"
                                src={`data:image/jpeg;base64,${similarCar.carImage}`}
                              />
                              <Card.Body
                                style={{ width: "18rem" }}
                                className="textContent"
                              >
                                <Card.Title>
                                  {similarCar.carBrand +
                                    " " +
                                    similarCar.carName}
                                </Card.Title>
                                <Card.Text className="fs-5 mb-0 mt-0">
                                  <strong>
                                    {formatPrice(similarCar.carPrice)} Lakh
                                  </strong>
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          </Link>
                        </SplideSlide>
                      ))}
                    </Splide>
                  ) : (
                    <>Fetching...</>
                  )}
                </div>
              </div>
            </div>
            <div
              style={{ backgroundColor: "#FFFFFF" }}
              className="col-sm-12 col-md-3 p-3"
            >
              <strong className="mb-3">Tranding {newCar.carBrand} cars</strong>
              {uniqueCars.map((car) => (
                <div className="row">
                  <div className="col-sm-12 col-md-12">
                    <Link
                      className="text-decoration-none "
                      as={Link}
                      to={"/carpreview"}
                      onClick={() =>
                        (window.location.href = window.location.href)
                      }
                      state={{ value: car.newCarId }}
                    >
                      <div
                        class="card mb-3 border-0 shadow-sm hover-element"
                        style={{ maxWidth: "540px" }}
                      >
                        <div class="row g-0">
                          <div class="col-md-6">
                            <img
                              src={`data:image/jpeg;base64,${car.carImage}`}
                              class="img-fluid rounded-start"
                              alt="..."
                            />
                          </div>
                          <div class="col-md-6">
                            <div class="card-body">
                              <small class="card-title m-0 p-0">
                                {car.carBrand + " " + car.carName}
                              </small>
                              <p class="card-text m-0 p-0">
                                {formatPrice(car.carPrice)}
                              </p>
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
export default CarPreview;

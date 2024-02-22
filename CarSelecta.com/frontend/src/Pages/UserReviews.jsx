import { Button, Collapse, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Navigationbar from "./Navigationbar";
import card from "../Images/card2.webp";
import { FaStar } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import RatingStars from "./RatingStars";
function UserReviews() {
  const location = useLocation();
  const receivedValue = location.state?.value || "No value received";
  const [newCar, setNewCar] = useState([]);
  const [rating, setRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(null);
  const [open, setOpen] = useState(false);
  const [individualRating, setIndividualRating] = useState([]);
  const [individualReview, setIndividualReview] = useState([]);
  const [user, setUser] = useState([]);
  
  const [openStates, setOpenStates] = useState(
    new Array(individualRating.length).fill(false)
  );

  const handleCollapseToggle = (index) => {
    const newOpenStates = [...openStates];
    newOpenStates[index] = !newOpenStates[index];
    setOpenStates(newOpenStates);
  };
  useEffect(() => {
    fetchCar(receivedValue);
  }, [receivedValue]);
  const fetchCar = async (newCarId) => {
    try {
      const response = await axios.get(
        `http://localhost:8181/find-car-by-id?newCarId=${newCarId}`
      );
      setNewCar(response.data.newCar);
      console.log(response.data.newCar);

      const ratingResponse = await axios.get(
        `http://localhost:8181/get-car-rating?newCarId=${newCarId}`
      );
      setRating(ratingResponse.data.rating);
      console.log(ratingResponse.data.rating);
      setTotalRatings(ratingResponse.data.totalRatings);

      const ratingAndReviews = await axios.get(
        `http://localhost:8181/get-car-ratings-and-reviews?newCarId=${newCarId}`
      );
      console.log(ratingAndReviews.data.ratings);
      console.log(ratingAndReviews.data.reviews);
      
      console.log(ratingAndReviews.data.user);
      setIndividualRating(ratingAndReviews.data.ratings);
      setIndividualReview(ratingAndReviews.data.reviews);
      setUser(ratingAndReviews.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const formatPrice = (price) => {
    if (newCar && newCar.carPrice) {
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
      <div className="" style={{ backgroundColor: "#fafafa" }}>
        <div
          style={{ backgroundColor: "#fafafa" }}
          className="p-5 mb-0 p-0 d-flex justify-content-center "
        >
          <div className="loader d-flex justify-content-center"></div>
        </div>
        <div style={{ backgroundColor: "#FFFFFF" }} className="m-0 p-0">
          <div
            style={{ backgroundColor: "#FFFFFF" }}
            className="container-fluid mb-1 shadow-sm"
          >
            <Navbar style={{ backgroundColor: "#FFFFFF" }}>
              <Nav
                className="d-flex justify-content-center w-100 "
              >
                <Nav.Link
                  as={Link}
                  to={"/carpreview"}
                  state={{ value: newCar.newCarId }}
                >
                  {newCar.carName}
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  state={{ value: newCar.newCarId }}
                  to="/carpreviewprice"
                >
                  Price
                </Nav.Link>

                <Nav.Link href="#">User Reviews</Nav.Link>
                <Nav.Link href="#pricing">Images</Nav.Link>
              </Nav>
            </Navbar>
          </div>
        </div>
        <div className="container vh-100">
          <div className="row mt-2">
            <div className="col-sm-12 col-md-12">
              <h4 style={{ fontFamily: "roboto,Sans-Serif,Arial" }}>
                {newCar.carBrand + " " + newCar.carName} User Reviews
              </h4>
            </div>
          </div>
          <div className="row mt-2">
            <div
              style={{ backgroundColor: "#FFFFFF" }}
              className="col-sm-12 col-md-9 p-3 shadow-sm"
            >
              <div className="row">
                <div className="col-sm-12 col-md-4">
                  <img
                    style={{ width: "16rem" }}
                    src={`data:image/jpeg;base64,${newCar.carImage}`}
                    alt=""
                  />
                </div>
                <div className="col-sm-12 col-md-4">
                  <h4>{newCar.carBrand + " " + newCar.carName}</h4>
                  <p className="d-flex">
                    <RatingStars rating={rating} />
                    &nbsp;
                    <p style={{ marginTop: "4px", fontSize: "13px" }}>
                      {" " + totalRatings + " "}reviews
                    </p>
                  </p>
                  <h5>{formatPrice(newCar.carPrice) + " Lakh*"}</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div
              style={{ backgroundColor: "#FFFFFF" }}
              className="col-sm-12 col-md-9 p-3 shadow-sm"
            >
              <div className="row">
                <div className="col-sm-12 col-md-12 p-3">
                  <h4 style={{ fontFamily: "roboto,Sans-Serif,Arial" }}>
                    Rating of {newCar.carBrand + " " + newCar.carName}
                  </h4>
                </div>
                <div className="col-sm-12 col-md-2">
                  <h2 style={{ fontFamily: "roboto,Sans-Serif,Arial" }}>
                    {" "}
                    <FaStar
                      className="mb-2"
                      style={{ fontSize: "25px", color: "#ffa236" }}
                    />
                    {!isNaN(rating) ? rating : 0}
                  </h2>
                </div>
                <div className="col-sm-12 col-md-3">
                  <small className="text-secondary">
                    Based on {totalRatings} reviews
                  </small>
                </div>
                <div className="col-sm-12 col-md-5">
                  <Link
                    as={Link}
                    to={"/writereview"}
                    state={{ value: newCar.newCarId }}
                    className="text-decoration-none"
                  >
                    <div className="d-grid ">
                      <Button variant="warning">
                        Write Review
                      </Button>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div
              style={{ backgroundColor: "#FFFFFF" }}
              className="col-sm-12 col-md-9 p-3 shadow-sm"
            >
              <div className="row">
                <div className="col-sm-12 col-md-12 p-3">
                  <h5 style={{ fontFamily: "roboto,Sans-Serif,Arial" }}>
                    {newCar.carBrand + " " + newCar.carName} User Reviews
                  </h5>
                  <hr className="text-dark mt-5 mb-4" />
                  {individualRating.map((rating, index) => (
                    <div key={index}>
                      <p>
                        <RatingStars rating={rating.score} />
                      </p>
                      <p className="m-0 p-0">
                        <strong
                        >
                          {individualReview[index].heading}
                        </strong>
                      </p>
                      <Collapse in={openStates[index]}>
                        <div
                          style={{ fontFamily: "roboto,Sans-Serif,Arial" }}
                          className="mb-1 text-secondary"
                          id="example-collapse-text"
                        >
                          {individualReview[index].comment}
                        </div>
                      </Collapse>
                      <Link
                        className="text-decoration-none m-0 p-0"
                        style={{ color: "#1b5a9d", fontSize:'14px' }}
                        onClick={() => handleCollapseToggle(index)}
                        aria-controls={`example-collapse-text-${index}`}
                        aria-expanded={openStates[index]}
                      >
                        Read more...
                      </Link>
                      <div>&nbsp;</div>
                      <p className="p-0 m-0">
                        <small
                          style={{
                            fontFamily: "roboto,Sans-Serif,Arial",
                            fontSize: "13px",
                          }}
                        >
                          By{" "}
                          {user.length !== 0 ?( user[index].firstName + " " + user[index].lastName):(<></>)}
                        </small>
                      </p>
                      <p className="p-0 m-0">
                        <small
                          style={{ fontSize: "10px" }}
                          className="text-secondary"
                        >
                          On{" " + rating.dateOfRating}
                        </small>
                      </p>
                      <hr />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default UserReviews;

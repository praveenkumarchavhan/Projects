import {
  Button,
  Dropdown,
  DropdownButton,
  Image,
  Navbar,
} from "react-bootstrap";
import logo from "../Images/Purple Badge Car Wash Logo1.png";
import { FaLightbulb, FaStar, FaUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { useEffect } from "react";
import smily1 from "../Images/smily/smily1.svg";
import smily2 from "../Images/smily/smily2.svg";
import smily3 from "../Images/smily/smily3.svg";
import smily4 from "../Images/smily/smily4.svg";
import smily5 from "../Images/smily/smily5.svg";
import { useRef } from "react";
import axios from "axios";
function WriteReview() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [selectedImageKey1, setSelectedImageKey1] = useState(0);
  const [selectedImageKey2, setSelectedImageKey2] = useState(0);
  const [selectedImageKey3, setSelectedImageKey3] = useState(0);
  const [selectedImageKey4, setSelectedImageKey4] = useState(0);
  const [selectedImageKey5, setSelectedImageKey5] = useState(0);
  const [selectedImageKey6, setSelectedImageKey6] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(true);
  const [buttonValidation, setButtonValidation] = useState("outline-success");
  const [buttonText, setButtonText] = useState("Submit Review");
  const [totalRating, setTotalRating] = useState(null);
  const formRef = useRef();
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const location = useLocation();
  const receivedValue = location.state?.value || "No value received";
  const [newCar, setNewCar] = useState([]);
  const [showSmily, setShowSmily] = useState(false);
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
    } catch (error) {}
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const email = Cookies.get("email");
        setUserEmail(email);
        const response = await axios.get(
          `http://localhost:8181/get-user-details?email=${email}`
        );
        setUser(response.data.firstName);
        console.log(response.data.firstName);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  });

  useEffect(() => {
    if (
      selectedImageKey1 !== 0 &&
      selectedImageKey2 !== 0 &&
      selectedImageKey3 !== 0
    ) {
      setShowSmily(true);
    }
  });
  const logOutHandler = () => {
    Cookies.remove("email");
    navigate("/");
  };

  const handleSmily1 = (key) => {
    if (selectedImageKey1 === key) {
      setSelectedImageKey1(0); // Deselect if already selected
    } else {
      setSelectedImageKey1(key);
    }
  };
  const handleSmily2 = (key) => {
    if (selectedImageKey2 === key) {
      setSelectedImageKey2(0); // Deselect if already selected
    } else {
      setSelectedImageKey2(key);
    }
  };
  const handleSmily3 = (key) => {
    if (selectedImageKey3 === key) {
      setSelectedImageKey3(0); // Deselect if already selected
    } else {
      setSelectedImageKey3(key);
    }
  };
  const handleSmily4 = (key) => {
    if (selectedImageKey4 === key) {
      setSelectedImageKey4(0); // Deselect if already selected
    } else {
      setSelectedImageKey4(key);
    }
  };
  const handleSmily5 = (key) => {
    if (selectedImageKey5 === key) {
      setSelectedImageKey5(0); // Deselect if already selected
    } else {
      setSelectedImageKey5(key);
    }
  };
  const handleSmily6 = (key) => {
    if (selectedImageKey6 === key) {
      setSelectedImageKey6(0); // Deselect if already selected
    } else {
      setSelectedImageKey6(key);
    }
  };

  useEffect(() => {
    if (
      selectedImageKey1 !== 0 &&
      selectedImageKey2 !== 0 &&
      selectedImageKey3 !== 0 &&
      selectedImageKey4 !== 0 &&
      selectedImageKey5 !== 0 &&
      selectedImageKey6 !== 0
    ) {
      setShowReviewForm(false);
      setTotalRating(
        (
          (selectedImageKey1 +
            selectedImageKey2 +
            selectedImageKey3 +
            selectedImageKey4 +
            selectedImageKey5 +
            selectedImageKey6) /
          6
        ).toFixed(1)
      );
      console.log(
        (selectedImageKey1 +
          selectedImageKey2 +
          selectedImageKey3 +
          selectedImageKey4 +
          selectedImageKey5 +
          selectedImageKey6) /
          6
      );
    }
  });

  const formData = new FormData();
  formData.append("email", userEmail);
  formData.append("rating", totalRating);
  formData.append("newCarId", newCar.newCarId);
  formData.append("reviewTitle", reviewTitle);
  formData.append("reviewDescription", reviewDescription);
  console.log(formData);
  console.log(userEmail);

  console.log(totalRating);
  console.log(newCar.newCarId);
  console.log(reviewTitle);
  console.log(reviewDescription);
  const handleReview = async () => {
    formRef.current.classList.add("was-validated");
    let formStatus = formRef.current.checkValidity();
    if (!formStatus) {
      setButtonValidation("outline-danger");
      setButtonText("Invalid Details !");
      return;
    }
    try {
      console.log(formData);
      await axios.post(
        "http://localhost:8181/set-user-rating-review",
        formData
      );
      setButtonValidation("outline-success");
      setButtonText("Submit Review");

    } catch (error) {
      console.log(error);
    }
  };

  const carIdAndTotalRating = {
    newCarId: newCar.newCarId,
    totalRating: totalRating,
    reviewTitle: reviewTitle,
    reviewDescription: reviewDescription,
  };
  return (
    <>
      <Navbar
        style={{ justifyContent: "space-between" }}
        className="bg-body-tertiary shadow"
      >
        <Navbar.Brand href="/home">
          <Image
            style={{
              width: "30%",
              // aspectRatio: "3/1",
              mixBlendMode: "darken",
            }}
            src={logo}
            alt=""
          />
        </Navbar.Brand>

        <DropdownButton
          variant="light"
          id="dropdown-basic-button"
          title={"Hello " + user + "!"}
        >
          <Dropdown.Item href="/userprofile">
            <FaUserCircle style={{ fontSize: "35px" }} />
          </Dropdown.Item>
          <Dropdown.Item href="/wishlist">Favorite</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item onClick={logOutHandler}>Log Out</Dropdown.Item>
        </DropdownButton>
      </Navbar>
      <div className="mt-5">&nbsp;</div>
      <div className="row justify-content-center vh-100">
        <div className="col-sm-12 col-md-4 ">
          <h5
            style={{
              fontFamily: "roboto,Sans-Serif,Arial",
            }}
          >
            Rate & Review {newCar.carBrand + " " + newCar.carName}
          </h5>
          <div
            style={{ backgroundColor: "#FFFFF" }}
            className="row mt-4 shadow-sm m-1"
          >
            <div className="col-sm-12 col-md-5 p-2">
              <img
                style={{ width: "10rem" }}
                src={`data:image/jpeg;base64,${newCar.carImage}`}
                alt=""
              />
            </div>
            <div className="col-sm-12 col-md-6 p-4">
              <small style={{ fontSize: "12px" }} className="text-secondary">
                Rate and Review
              </small>
              <p
                style={{
                  fontFamily: "roboto,Sans-Serif,Arial",
                }}
              >
                {newCar.carBrand + " " + newCar.carName}
              </p>
            </div>
          </div>
          {showReviewForm ? (
            <div>
              <div
                style={{ backgroundColor: "#FFFFF" }}
                className="row mt-4 p-2"
              >
                <div className="col-sm-12 col-md-12">
                  <h5
                    style={{
                      fontFamily: "roboto,Sans-Serif,Arial",
                    }}
                  >
                    Rate your experience
                  </h5>
                </div>
              </div>
              <div
                style={{ backgroundColor: "#FFFFF" }}
                className="row p-2 mt-2 text-secondary"
              >
                <div className="col-sm-12 col-md-3 ">Mileage</div>
                <div className="col-sm-12 col-md-1 d-flex">
                  <img
                    src={smily1}
                    style={{
                      cursor: "pointer",
                      filter:
                        selectedImageKey1 === 1
                          ? "saturate(2)"
                          : "saturate(0.1)",
                    }}
                    onClick={() => handleSmily1(1)}
                    alt=""
                  />
                </div>
                <div className="col-sm-12 col-md-1 ">
                  <img
                    src={smily2}
                    style={{
                      cursor: "pointer",
                      filter:
                        selectedImageKey1 === 2
                          ? "saturate(2)"
                          : "saturate(0.1)",
                    }}
                    onClick={() => handleSmily1(2)}
                    alt=""
                  />
                </div>
                <div className="col-sm-12 col-md-1 ">
                  <img
                    src={smily3}
                    style={{
                      cursor: "pointer",
                      filter:
                        selectedImageKey1 === 3
                          ? "saturate(2)"
                          : "saturate(0.1)",
                    }}
                    onClick={() => handleSmily1(3)}
                    alt=""
                  />
                </div>
                <div className="col-sm-12 col-md-1 ">
                  <img
                    src={smily4}
                    style={{
                      cursor: "pointer",
                      filter:
                        selectedImageKey1 === 4
                          ? "saturate(2)"
                          : "saturate(0.1)",
                    }}
                    onClick={() => handleSmily1(4)}
                    alt=""
                  />
                </div>
                <div className="col-sm-12 col-md-1 ">
                  <img
                    src={smily5}
                    style={{
                      cursor: "pointer",
                      filter:
                        selectedImageKey1 === 5
                          ? "saturate(2)"
                          : "saturate(0.1)",
                    }}
                    onClick={() => handleSmily1(5)}
                    alt=""
                  />
                </div>
              </div>
              <div className="row p-2 mt-2 text-secondary">
                <div className="col-sm-12 col-md-3 ">Maintenance Cost</div>
                <div className="col-sm-12 col-md-1 ">
                  <img
                    src={smily1}
                    style={{
                      cursor: "pointer",
                      filter:
                        selectedImageKey2 === 1
                          ? "saturate(2)"
                          : "saturate(0.1)",
                    }}
                    onClick={() => handleSmily2(1)}
                    alt=""
                  />
                </div>
                <div className="col-sm-12 col-md-1 ">
                  <img
                    src={smily2}
                    style={{
                      cursor: "pointer",
                      filter:
                        selectedImageKey2 === 2
                          ? "saturate(2)"
                          : "saturate(0.1)",
                    }}
                    onClick={() => handleSmily2(2)}
                    alt=""
                  />
                </div>
                <div className="col-sm-12 col-md-1 ">
                  <img
                    src={smily3}
                    style={{
                      cursor: "pointer",
                      filter:
                        selectedImageKey2 === 3
                          ? "saturate(2)"
                          : "saturate(0.1)",
                    }}
                    onClick={() => handleSmily2(3)}
                    alt=""
                  />
                </div>
                <div className="col-sm-12 col-md-1 ">
                  <img
                    src={smily4}
                    style={{
                      cursor: "pointer",
                      filter:
                        selectedImageKey2 === 4
                          ? "saturate(2)"
                          : "saturate(0.1)",
                    }}
                    onClick={() => handleSmily2(4)}
                    alt=""
                  />
                </div>
                <div className="col-sm-12 col-md-1 ">
                  <img
                    src={smily5}
                    style={{
                      cursor: "pointer",
                      filter:
                        selectedImageKey2 === 5
                          ? "saturate(2)"
                          : "saturate(0.1)",
                    }}
                    onClick={() => handleSmily2(5)}
                    alt=""
                  />
                </div>
              </div>
              <div className="row p-2 mt-2 text-secondary">
                <div className="col-sm-12 col-md-3 ">Safety</div>
                <div className="col-sm-12 col-md-1 ">
                  <img
                    src={smily1}
                    style={{
                      cursor: "pointer",
                      filter:
                        selectedImageKey3 === 1
                          ? "saturate(2)"
                          : "saturate(0.1)",
                    }}
                    onClick={() => handleSmily3(1)}
                    alt=""
                  />
                </div>
                <div className="col-sm-12 col-md-1 ">
                  <img
                    src={smily2}
                    style={{
                      cursor: "pointer",
                      filter:
                        selectedImageKey3 === 2
                          ? "saturate(2)"
                          : "saturate(0.1)",
                    }}
                    onClick={() => handleSmily3(2)}
                    alt=""
                  />
                </div>
                <div className="col-sm-12 col-md-1 ">
                  <img
                    src={smily3}
                    style={{
                      cursor: "pointer",
                      filter:
                        selectedImageKey3 === 3
                          ? "saturate(2)"
                          : "saturate(0.1)",
                    }}
                    onClick={() => handleSmily3(3)}
                    alt=""
                  />
                </div>

                <div className="col-sm-12 col-md-1 ">
                  <img
                    src={smily4}
                    style={{
                      cursor: "pointer",
                      filter:
                        selectedImageKey3 === 4
                          ? "saturate(2)"
                          : "saturate(0.1)",
                    }}
                    onClick={() => handleSmily3(4)}
                    alt=""
                  />
                </div>
                <div className="col-sm-12 col-md-1 ">
                  <img
                    src={smily5}
                    style={{
                      cursor: "pointer",
                      filter:
                        selectedImageKey3 === 5
                          ? "saturate(2)"
                          : "saturate(0.1)",
                    }}
                    onClick={() => handleSmily3(5)}
                    alt=""
                  />
                </div>
              </div>
                {showSmily?(

                
              <div>
                <div className="row p-2 mt-2 text-secondary">
                  <div className="col-sm-12 col-md-3 ">
                    Features and Styling
                  </div>
                  <div className="col-sm-12 col-md-1 ">
                    <img
                      src={smily1}
                      style={{
                        cursor: "pointer",
                        filter:
                          selectedImageKey4 === 1
                            ? "saturate(2)"
                            : "saturate(0.1)",
                      }}
                      onClick={() => handleSmily4(1)}
                      alt=""
                    />
                  </div>
                  <div className="col-sm-12 col-md-1 ">
                    <img
                      src={smily2}
                      style={{
                        cursor: "pointer",
                        filter:
                          selectedImageKey4 === 2
                            ? "saturate(2)"
                            : "saturate(0.1)",
                      }}
                      onClick={() => handleSmily4(2)}
                      alt=""
                    />
                  </div>
                  <div className="col-sm-12 col-md-1 ">
                    <img
                      src={smily3}
                      style={{
                        cursor: "pointer",
                        filter:
                          selectedImageKey4 === 3
                            ? "saturate(2)"
                            : "saturate(0.1)",
                      }}
                      onClick={() => handleSmily4(3)}
                      alt=""
                    />
                  </div>
                  <div className="col-sm-12 col-md-1 ">
                    <img
                      src={smily4}
                      style={{
                        cursor: "pointer",
                        filter:
                          selectedImageKey4 === 4
                            ? "saturate(2)"
                            : "saturate(0.1)",
                      }}
                      onClick={() => handleSmily4(4)}
                      alt=""
                    />
                  </div>
                  <div className="col-sm-12 col-md-1 ">
                    <img
                      src={smily5}
                      style={{
                        cursor: "pointer",
                        filter:
                          selectedImageKey4 === 5
                            ? "saturate(2)"
                            : "saturate(0.1)",
                      }}
                      onClick={() => handleSmily4(5)}
                      alt=""
                    />
                  </div>
                </div>
                <div className="row p-2 mt-2 text-secondary">
                  <div className="col-sm-12 col-md-3 ">Comfort</div>
                  <div className="col-sm-12 col-md-1 ">
                    <img
                      src={smily1}
                      style={{
                        cursor: "pointer",
                        filter:
                          selectedImageKey5 === 1
                            ? "saturate(2)"
                            : "saturate(0.1)",
                      }}
                      onClick={() => handleSmily5(1)}
                      alt=""
                    />
                  </div>
                  <div className="col-sm-12 col-md-1 ">
                    <img
                      src={smily2}
                      style={{
                        cursor: "pointer",
                        filter:
                          selectedImageKey5 === 2
                            ? "saturate(2)"
                            : "saturate(0.1)",
                      }}
                      onClick={() => handleSmily5(2)}
                      alt=""
                    />
                  </div>
                  <div className="col-sm-12 col-md-1 ">
                    <img
                      src={smily3}
                      style={{
                        cursor: "pointer",
                        filter:
                          selectedImageKey5 === 3
                            ? "saturate(2)"
                            : "saturate(0.1)",
                      }}
                      onClick={() => handleSmily5(3)}
                      alt=""
                    />
                  </div>
                  <div className="col-sm-12 col-md-1 ">
                    <img
                      src={smily4}
                      style={{
                        cursor: "pointer",
                        filter:
                          selectedImageKey5 === 4
                            ? "saturate(2)"
                            : "saturate(0.1)",
                      }}
                      onClick={() => handleSmily5(4)}
                      alt=""
                    />
                  </div>
                  <div className="col-sm-12 col-md-1 ">
                    <img
                      src={smily5}
                      style={{
                        cursor: "pointer",
                        filter:
                          selectedImageKey5 === 5
                            ? "saturate(2)"
                            : "saturate(0.1)",
                      }}
                      onClick={() => handleSmily5(5)}
                      alt=""
                    />
                  </div>
                </div>
                <div className="row p-2 mt-2 text-secondary">
                  <div className="col-sm-12 col-md-3 ">Performance</div>
                  <div className="col-sm-12 col-md-1 ">
                    <img
                      src={smily1}
                      style={{
                        cursor: "pointer",
                        filter:
                          selectedImageKey6 === 1
                            ? "saturate(2)"
                            : "saturate(0.1)",
                      }}
                      onClick={() => handleSmily6(1)}
                      alt=""
                    />
                  </div>
                  <div className="col-sm-12 col-md-1 ">
                    <img
                      src={smily2}
                      style={{
                        cursor: "pointer",
                        filter:
                          selectedImageKey6 === 2
                            ? "saturate(2)"
                            : "saturate(0.1)",
                      }}
                      onClick={() => handleSmily6(2)}
                      alt=""
                    />
                  </div>
                  <div className="col-sm-12 col-md-1 ">
                    <img
                      src={smily3}
                      style={{
                        cursor: "pointer",
                        filter:
                          selectedImageKey6 === 3
                            ? "saturate(2)"
                            : "saturate(0.1)",
                      }}
                      onClick={() => handleSmily6(3)}
                      alt=""
                    />
                  </div>
                  <div className="col-sm-12 col-md-1 ">
                    <img
                      src={smily4}
                      style={{
                        cursor: "pointer",
                        filter:
                          selectedImageKey6 === 4
                            ? "saturate(2)"
                            : "saturate(0.1)",
                      }}
                      onClick={() => handleSmily6(4)}
                      alt=""
                    />
                  </div>
                  <div className="col-sm-12 col-md-1 ">
                    <img
                      src={smily5}
                      style={{
                        cursor: "pointer",
                        filter:
                          selectedImageKey6 === 5
                            ? "saturate(2)"
                            : "saturate(0.1)",
                      }}
                      onClick={() => handleSmily6(5)}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              ):(
                <>
                </>
              )}
            </div>
          ) : (
            <>
              <div className="mt-3 p-3 bg-light shadow-sm">
                <div className="row">
                  <div className="col-sm-12 col-md-12 d-flex justify-content-center">
                    <h5
                      style={{
                        fontFamily: "roboto,Sans-Serif,Arial",
                      }}
                    >
                      Your overall rating:{" "}
                    </h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 col-md-12 d-flex justify-content-center">
                    <FaStar
                      className="mt-1"
                      style={{ color: "orange", fontSize: "25px" }}
                    />{" "}
                    &nbsp;
                    <h3>{totalRating}</h3>
                  </div>
                </div>
              </div>
              <div className="mt-3 p-3 ">
                <form ref={formRef} className="needs-validation">
                  <div className="row">
                    <div className="col-sm-12 col-md-12">
                      <textarea
                        className="form-control"
                        name=""
                        id=""
                        cols="30"
                        rows="4"
                        minLength={80}
                        required
                        value={reviewDescription}
                        onChange={(e) => setReviewDescription(e.target.value)}
                        placeholder="share the details of your experience..."
                      ></textarea>
                      <p
                        className="text-end"
                        style={{ fontSize: "12px", color: "red" }}
                      >
                        Minimum 80 characters
                      </p>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-sm-12 col-md-12">
                      <input
                        className="form-control"
                        name=""
                        id=""
                        minLength={10}
                        placeholder="Title of your Review..."
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        required
                      ></input>
                      <p
                        className="text-end"
                        style={{ fontSize: "12px", color: "red" }}
                      >
                        Minimum 10 characters
                      </p>
                    </div>
                  </div>
                </form>
                <div className="row mt-2">
                  <div className="col-sm-12 col-md-12 d-flex justify-content-center">
                    <Link
                      className="text-decoration-none"
                      as={Link}
                      to={"/thanksforreview"}
                      state={{ value: carIdAndTotalRating }}
                    >
                      <Button
                        variant={buttonValidation}
                        style={{ width: "200px" }}
                        onClick={handleReview}
                      >
                        {buttonText}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div
          style={{ backgroundColor: "#FFFFF" }}
          className="col-sm-12 col-md-3 p-4 shadow-sm"
        >
          <div style={{ marginLeft: "20px" }}>
            <FaLightbulb style={{ color: "rgb(241, 184, 25)" }} />
            &nbsp;
            <strong
              style={{
                fontFamily: "roboto,Sans-Serif,Arial",
              }}
            >
              Tips for a Good Review
            </strong>
          </div>
          <div className="text-secondary">
            <ul>
              <li className="mt-4">
                Tell us about your buying experience and why you shortlisted
                this car
              </li>
              <li className="mt-2">List out the pros and cons of your car</li>
              <li className="mt-2">
                Talk about the overall performance of your car, mileage, pickup,
                comfort level, etc
              </li>
              <li className="mt-2">
                How's the after-sales service and what are the costs involved
              </li>
              <li className="mt-2">
                Give a suitable title to your reviewDescription
              </li>
              <li className="mt-2">
                Don't use all caps and avoid sharing personal details here
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
export default WriteReview;

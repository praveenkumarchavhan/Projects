import { Button, Form } from "react-bootstrap";
import { FaCircle, FaUserLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AlertPopup from "./AlertPopup";
import { useRef, useState } from "react";
import LoginFormVideo from "../Videos/loginform.mp4";
import axios from "axios";

function UserSignup() {
  const [buttonValidationForSignup, setButtonValidationForSignup] = useState(
    "outline-success"
  );
  const [buttonTextForSignup, setButtonTextForSignup] = useState("Sign Up");
  const [showAlert, setShowAlert] = useState(false);
  const formRef = useRef();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: "",
    state: "",
    password: "",
  });
  const validator = require("validator");
  const userSignupAction = async () => {
    formRef.current.classList.add("was-validated");
    let formStatus = formRef.current.checkValidity();
    if (!formStatus) {
      setButtonTextForSignup("Invalid Details!");
      setButtonValidationForSignup("outline-danger");
      return;
    }

    console.log(user.name);

    try {
      let url = "http://localhost:8181/user-signup";
      const response = await axios.post(url, user);

      if (response.status === 200) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          navigate("/userlogin");
        }, 2000);
        setUser("");
        setButtonTextForSignup("Sign Up");
        setButtonValidationForSignup("outline-success");
        formRef.current.classList.remove("was-validated");
      }
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };
  return (
    <>
      <div className="row video-container">
        <video style={{ width: "100%" }} autoPlay loop muted>
          <source src={LoginFormVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div
        style={{ height: "90vh" }}
        className="row justify-content-center align-items-center mt-4 login-container"
      >
        <div className="col-sm-8 col-md-4  p-4 bg-light">
          <h2 className="text-center mt-3 mb-4">
            <FaUserLock
              style={{ fontSize: "80px", mixBlendMode: "difference" }}
              className="text-secondary shadow"
            />
          </h2>
          <form ref={formRef} className="needs-validation">
            <input
              className="form-control input mt-2"
              type="text"
              name="name"
              id="name"
              placeholder="Enter your first name..."
              pattern="[A-Za-z]+"
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              required
            />
            <input
              className="form-control input mt-2"
              type="text"
              name="name"
              id="name"
              pattern="[A-Za-z]+"
              placeholder="Enter your last name..."
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              required
            />
            <input
              className="form-control input mt-2"
              type="email"
              name="email"
              id="email"
              placeholder="Enter email..."
              pattern="^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*@[a-zA-Z0-9.-]+\.(com|in)$"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
            <div class="input-group mb-3">
              <span class="input-group-text mt-2" id="basic-addon1">
                +91
              </span>
              <input
                type="text"
                class="form-control input mt-2"
                placeholder="Enter phone number..."
                pattern="^(?:(?:(?:0{0,2})?|[0]?)?[6789]\d{9})$"
                value={user.phoneNumber}
                onChange={(e) =>
                  setUser({
                    ...user,
                    phoneNumber: e.target.value,
                  })
                }
                required
              />
            </div>
            <Form.Select
              className="form-control input shadow-sm"
              aria-label="Default select example"
              value={user.state}
              onChange={(e) => setUser({ ...user, state: e.target.value })}
              required
            >
              <option value="" selected>
                Select state...
              </option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
            </Form.Select>
            <input
              className="form-control input mt-2"
              type="text"
              name="city"
              id="city"
              placeholder="Enter city name..."
              pattern="^[A-Za-z\s]{2,}$"
              value={user.city}
              onChange={(e) => setUser({ ...user, city: e.target.value })}
              required
            />
            <input
              className="form-control input mt-2"
              type="password"
              name="password"
              id="password"
              placeholder="Create password..."
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$"
              value={user.password}
              onChange={(e) =>
                setUser({
                  ...user,
                  password: e.target.value,
                })
              }
              required
            />
            <Form.Control.Feedback type="invalid">
              <small>
                <li className="text-danger list-unstyled">
                  Password should contain atleast
                </li>
                <li className="text-danger list-unstyled">
                  <FaCircle style={{ fontSize: "5px" }} /> Atleast 1 Uppercase,
                  1 Lowercase and 1 Special character
                </li>
                <li className="text-danger list-unstyled">
                  <FaCircle style={{ fontSize: "5px" }} /> Minimum 8 charcater
                </li>
              </small>
            </Form.Control.Feedback>
          </form>
          <div className="d-grid ">
            <Button
              type="submit"
              className="btn btn-block mt-3"
              variant={buttonValidationForSignup}
              onClick={userSignupAction}
            >
              {buttonTextForSignup}
            </Button>
          </div>
          <div className="text-center mt-3 mb-2 text-secondary">
            Already have an account?
            <Link
              style={{ color: "#1b5a9d" }}
              className="text-decoration-none"
              as={Link}
              to={"/"}
            >
              {" "}
              Login
            </Link>
          </div>
          {showAlert && <AlertPopup message="User signup successful!" />}
        </div>
      </div>
    </>
  );
}
export default UserSignup;

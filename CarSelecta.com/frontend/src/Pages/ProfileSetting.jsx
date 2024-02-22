import {
  FaCircle,
  FaEnvelope,
  FaPhoneAlt,
  FaTimes,
  FaUserLock,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import userIcon from "../Images/userlogin.jpg";
import { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Cookies from "js-cookie";
import axios from "axios";
import AlertPopup from "./AlertPopup";
function ProfileSetting({ userRef }) {
  const [address, setAddress] = useState("No Address Added");
  const [show, setShow] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const [buttonValidationForUpdate, setButtonValidationForUpdate] =
    useState("outline-success");
  const [buttonTextForUpdate, setButtonTextForUpdate] =
    useState("Update Details");
  const [buttonTextForAddress, setButtonTextForAddress] =
    useState("Add Address");
  const [buttonValidationForAddress, setButtonValidationForAddress] =
    useState("outline-success");
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertForAddress, setShowAlertForAddress] = useState(false);

  const formRef = useRef();

  const handleShow = async () => {
    setShow(true);
    const email = Cookies.get("email");
    try {
      const response = await axios.get(
        `http://localhost:8181/get-user-details?email=${email}`
      );
      inputValues(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  let handleClose = () => setShow(false);

  let inputValues = (input) => {
    setUserId(input.userId);
    setFirstName(input.firstName);
    setLastName(input.lastName);
    setEmail(input.email);
    setPhoneNumber(input.phoneNumber);
    setCity(input.city);
    setState(input.state);
    setPassword(input.password);
  };
  const handleUpdate = async () => {
    formRef.current.classList.add("was-validated");
    let formStatus = formRef.current.checkValidity();
    if (!formStatus) {
      setButtonTextForUpdate("Invalid Details!");
      setButtonValidationForUpdate("outline-danger");
      return;
    }
    const updatedUserDetails = {
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      city: city,
      state: state,
      password: password,
    };
    try {
      await axios.post(
        "http://localhost:8181/update-user-details",
        updatedUserDetails
      );
      setShowAlert(true);
      setTimeout(() => {
        setShow(false);
        setShowAlert(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  let handleCloseAddressModel = () => setShowAddressModal(false);

  let handleAddress = async () => {
    setShowAddressModal(true);
    if (showAddressModal) {
      formRef.current.classList.add("was-validated");
      let formStatus = formRef.current.checkValidity();
      if (!formStatus) {
        setButtonTextForAddress("Invalid Details!");
        setButtonValidationForAddress("outline-danger");
        return;
      }
      try {
        const email = Cookies.get("email");
        await axios.get(
          `http://localhost:8181/add-user-address?address=${address}&email=${email}`
        );
        setShowAlert(true);
        setTimeout(() => {
          setShowAddressModal(false);
          setShowAlertForAddress(false);
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchAddress = async () => {
      const email = Cookies.get("email");
      try {
        const response = await axios.get(
          `http://localhost:8181/get-user-details?email=${email}`
        );
        if (response.data.address !== "") {
          setAddress(response.data.address);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAddress();
  }, []);

  return (
    <>
      <div className="card shadow-sm mt-2" style={{ width: "540px" }}>
        <div className="row ">
          <div className="col-md-3">
            <img src={userIcon} className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-7">
            <div className="card-body m-0">
              <p className="card-title mb-0 mt-0">
                {userRef.firstName + " " + userRef.lastName}
              </p>
              <p className="card-text mb-0">
                <FaPhoneAlt
                  style={{ fontSize: "12px" }}
                  className="text-secondary"
                />{" "}
                &nbsp;
                <small style={{ fontSize: "12px" }}>
                  {userRef.phoneNumber}
                </small>
              </p>
              <p className="card-text mb-0">
                <FaEnvelope
                  style={{ fontSize: "12px" }}
                  className="text-secondary"
                />{" "}
                &nbsp;
                <small style={{ fontSize: "12px" }}>{userRef.email}</small>
              </p>
            </div>
          </div>
          <div className=" col-md-2">
            <Link
              onClick={handleShow}
              className="text-decoration-none"
              style={{ fontSize: "12px" }}
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
      <div className="card shadow-sm mt-3" style={{ width: "540px" }}>
        <div className="row ">
          <div className="col-md-7">
            <div className="card-body m-0">
              <p className="card-title m-0 p-0 mt-0">Address Book</p>
              <p className="card-text mb-0">&nbsp;</p>
              <p
                style={{ fontSize: "12px" }}
                className="card-text text-secondary mb-0"
              >
                {address}
              </p>
            </div>
          </div>
          <div
            style={{ textAlign: "end", marginLeft: "35px" }}
            className=" col-md-4"
          >
            <Link
              onClick={handleAddress}
              className="text-decoration-none text-end"
              style={{ fontSize: "12px" }}
            >
              Add Address
            </Link>
          </div>

          <Modal
            style={{ marginTop: "80px" }}
            show={show}
            onHide={handleClose}
            autoFocus={true}
            animation={true}
          >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
              <form className="p-4" ref={formRef}>
                <input
                  className="form-control input mt-2"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your first name..."
                  pattern="[A-Za-z]+"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  className="form-control input mt-2"
                  type="text"
                  name="name"
                  id="name"
                  pattern="[A-Za-z]+"
                  placeholder="Enter your last name..."
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <input
                  className="form-control input mt-2"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter email..."
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\.[a-zA-Z]{2,}$"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div class="input-group mt-2">
                  <span class="input-group-text " id="basic-addon1">
                    +91
                  </span>
                  <input
                    type="text"
                    class="form-control input "
                    placeholder="Enter phone number..."
                    pattern="^(?:(?:(?:0{0,2})?|[0]?)?[6789]\d{9})$"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                <select
                  className="form-control mt-2 input shadow-sm"
                  aria-label="Default select example"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
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
                </select>
                <input
                  className="form-control input mt-2"
                  type="text"
                  name="city"
                  id="city"
                  placeholder="Enter city name..."
                  pattern="^[A-Za-z\s]{2,}$"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                <input
                  className="form-control input mt-2"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Create password..."
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  <small>
                    <li className="text-danger list-unstyled">
                      Password should contain atleast
                    </li>
                    <li className="text-danger list-unstyled">
                      <FaCircle style={{ fontSize: "5px" }} /> Atleast 1
                      Uppercase, 1 Lowercase and 1 Special character
                    </li>
                    <li className="text-danger list-unstyled">
                      <FaCircle style={{ fontSize: "5px" }} /> Minimum 8
                      charcater
                    </li>
                  </small>
                </Form.Control.Feedback>
              </form>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
              <Button
                style={{ width: "200px" }}
                variant={buttonValidationForUpdate}
                onClick={handleUpdate}
              >
                {buttonTextForUpdate}
              </Button>
            </Modal.Footer>
            {showAlert && (
              <AlertPopup message="Details updated successfully!" />
            )}
          </Modal>

          {/* ----------------------------------------Address Modal------------------------------- */}
          <Modal
            style={{ marginTop: "80px" }}
            show={showAddressModal}
            onHide={handleClose}
            autoFocus={true}
            animation={true}
          >
            <Modal.Header >
              <Modal.Title>
                <FaUserLock
                  style={{ fontSize: "80px", mixBlendMode: "difference" }}
                  className="text-secondary text-center shadow "
                />
              </Modal.Title>
              <FaTimes
                style={{ cursor: "pointer" }}
                onClick={handleCloseAddressModel}
              />
            </Modal.Header>
            <Modal.Body>
              <form className="p-4" ref={formRef}>
                <textarea
                  className="form-control"
                  name="address"
                  id=""
                  cols="30"
                  rows="5"
                  placeholder="Enter your address..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                ></textarea>
              </form>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
              <Button
                style={{ width: "200px" }}
                variant={buttonValidationForAddress}
                onClick={handleAddress}
              >
                {buttonTextForAddress}
              </Button>
            </Modal.Footer>
            {showAlertForAddress && (
              <AlertPopup message="Address added successfully!" />
            )}
          </Modal>
        </div>
      </div>
    </>
  );
}
export default ProfileSetting;

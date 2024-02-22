import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Navigationbar from "./Navigationbar";
import React, { useRef, useState } from "react";
import { FaAddressBook, FaCheck, FaExclamationCircle } from "react-icons/fa";
import axios from "axios";
import adminImage from "../Images/admin.jpg";
import AlertPopup from "./AlertPopup";
import Cookies from "js-cookie";
function Admin() {
  let formRef = useRef();
  const navigate = useNavigate();
  let [buttonValidation, setButtonValidation] = useState("outline-success");
  let [isError, setIsError] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  let [admin, setAdmin] = useState({
    username: "",
    password: "",
  });

  let handlerPasswordAction = (e) => {
    let newuser = { ...admin, password: e.target.value };
    setAdmin(newuser);
  };

  let handlerUsernameAction = (e) => {
    let newuser = { ...admin, username: e.target.value };
    setAdmin(newuser);
  };

  let adminLoginAction = async () => {
    formRef.current.classList.add("was-validated");
    let formStatus = formRef.current.checkValidity();
    if (!formStatus) {
      setButtonValidation("outline-danger");
      return;
    } else {
    }

    // BACKEND :: ...
    let url = "http://localhost:8181/admin-login";
    axios.post(url, admin).then((response) => {
      if (response.data == 500) {
        console.log(response.data);
        setButtonValidation("outline-danger");
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 2000);
      } else {
        Cookies.set("admin", admin.username , true);
        setButtonValidation("outline-success");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          navigate("/admindashboard", { replace: true });
        }, 2000);
      }
    });
  };
  return (
    <>
      <div class="card text-bg-dark">
        <img className="vh-100" src={adminImage} class="card-img" alt="..." />
        <div class="card-img-overlay">
          <div className="row justify-content-center align-items-center vh-100 ">
            <div className="col-sm-12 col-md-3 bg-light p-4 shadow-lg">
              <form ref={formRef} className="needs-validation">
                <h3 className="text-center text-secondary mt-4 mb-4">
                  Admin Login
                </h3>
                <input
                  className="form-control"
                  type="password"
                  name="username"
                  placeholder="Enter username..."
                  id="username"
                  value={admin.username}
                  onChange={handlerUsernameAction}
                  required
                />
                <input
                  className="form-control mt-1"
                  type="password"
                  name="Password"
                  placeholder="Enter password..."
                  id="password"
                  value={admin.password}
                  onChange={handlerPasswordAction}
                  required
                />
              </form>
              <div className="d-grid">
                <Button
                  type="submit"
                  className=" mt-3"
                  variant={buttonValidation}
                  onClick={adminLoginAction}
                >
                  Login
                </Button>
              </div>
              {isError && (
                <div className="text-danger text-center mt-2">
                  Invalid username or password
                  <FaExclamationCircle className="ms-1 mb-1" />
                </div>
              )}
              <Link
                className="d-flex justify-content-center mt-3"
                style={{ textDecoration: "none", color: "#1b5a9d" }}
                as={Link}
                to={"#"}
              >
                forgot password?
              </Link>
              {showAlert && (
                <AlertPopup message="Login Successful! Welcome Admin" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Admin;

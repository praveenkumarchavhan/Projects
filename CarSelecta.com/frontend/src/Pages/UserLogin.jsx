import { Button, Form } from "react-bootstrap";
import LoginFormVideo from "../Videos/loginform.mp4";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCircle,
  FaUser,
  FaUserAlt,
  FaUserAltSlash,
  FaUserCircle,
  FaUserClock,
  FaUserEdit,
  FaUserInjured,
  FaUserLock,
  FaUserSlash,
  FaUsersSlash,
} from "react-icons/fa";
import { useRef, useState } from "react";
import axios from "axios";
import AlertPopup from "./AlertPopup";
import Cookies from "js-cookie";

const UserLogin = () => {
  const [buttonValidationForLogin, setButtonValidationForLogin] =
    useState("outline-primary");
  const [buttonTextForLogin, setButtonTextForLogin] = useState("Log In");
  const [
    buttonValidationForForgotPassowrd,
    setButtonValidationForForgotPassowrd,
  ] = useState("outline-primary");
  const [buttonTextForForgotPassowrd, setButtonTextForForgotPassowrd] =
    useState("Change Password");
  const [userIcon, setUserIcon] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertForPasswordChange, setShowAlertForPasswordChange] =
    useState(false);
  const [forgotPassword, setForgotPassword] = useState(true);
  const formRef = useRef();
  const formRefForForgotPassword = useRef();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [userForgotPassword, setUserForgotPassword] = useState({
    email: "",
    password: "",
  });

  const userForgotPasswordAction = async () => {
    formRefForForgotPassword.current.classList.add("was-validated");
    let formStatus = formRefForForgotPassword.current.checkValidity();
    if (!formStatus) {
      setUserIcon(false);
      setButtonTextForForgotPassowrd("Invalid Attempt!");
      setButtonValidationForForgotPassowrd("outline-danger");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8181/user-forgot-password",
        userForgotPassword
      );
      if (response.data === 200) {
        setShowAlertForPasswordChange(true);
        setTimeout(() => {
          setShowAlertForPasswordChange(false);
          setForgotPassword(true);
        }, 2000);

        setUserIcon(true);
        setButtonTextForForgotPassowrd("Change Password");
        setButtonValidationForForgotPassowrd("outline-primary");
        formRefForForgotPassword.current.classList.remove("was-validated");
      } else {
        setUserIcon(false);
        setButtonTextForForgotPassowrd("Invalid email!");
        setButtonValidationForForgotPassowrd("outline-danger");
        formRefForForgotPassword.current.classList.add("was-validated");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const userLoginAction = async () => {
    formRef.current.classList.add("was-validated");
    let formStatus = formRef.current.checkValidity();
    if (!formStatus) {
      setUserIcon(false);
      setButtonTextForLogin("Invalid Attempt!");
      setButtonValidationForLogin("outline-danger");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8181/user-login",
        user
      );
      console.log(response);
      if (response.data === 200) {
        setShowAlert(true);
        localStorage.setItem("loginStatus", "true");
        setTimeout(() => {
          navigate("/home", { replace: true });
          setShowAlert(false);
        }, 2000);

        Cookies.set("email", `${user.email}`,true, { expires: 1 });
        setUserIcon(true);
        setButtonTextForLogin("Log In");
        setButtonValidationForLogin("outline-primary");
        formRef.current.classList.remove("was-validated");
      } else {
        setUserIcon(false);
        setButtonTextForLogin("Invalid Attempt!");
        setButtonValidationForLogin("outline-danger");
        formRef.current.classList.add("was-validated");
      }
    } catch (error) {
      console.log(error);
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
      {forgotPassword ? (
        <div
          style={{ height: "90vh" }}
          className="row justify-content-center align-items-center mt-5 login-container"
        >
          <div
            style={{ borderRadius: "10px" }}
            className="col-sm-8 col-md-3 p-4 bg-light"
          >
            <h2 className="text-center mt-4 mb-4">
              {userIcon ? (
                <FaUserCircle
                  style={{ fontSize: "80px", mixBlendMode: "difference" }}
                  className="text-secondary shadow"
                />
              ) : (
                <FaUserSlash
                  style={{ fontSize: "80px", mixBlendMode: "difference" }}
                  className="text-secondary shadow"
                />
              )}
            </h2>
            <form ref={formRef} className="needs-validation">
              <input
                className="form-control mt-2 mt-1"
                type="email"
                name="email"
                id="email"
                placeholder="Enter email..."
                pattern="^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*@[a-zA-Z0-9.-]+\.(com|in)$"
                required
                value={user.email}
                onChange={(e) =>
                  setUser({
                    ...user,
                    email: e.target.value,
                  })
                }
              />
              <input
                className="form-control mt-2 mt-2"
                type="password"
                name="password"
                id="password"
                placeholder="Enter password..."
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
              <div className="text-end text-secondary">
                <Link
                  className="text-secondary text-decoration-none"
                  style={{ fontSize: "12px" }}
                  onClick={() => setForgotPassword(false)}
                >
                  Forgot Password?
                </Link>
              </div>
            </form>
            <div className="d-grid ">
              <Button
                type="submit"
                className="btn btn-block mt-3"
                variant={buttonValidationForLogin}
                onClick={userLoginAction}
              >
                {buttonTextForLogin}
              </Button>
            </div>
            <div
              style={{ fontSize: "15px" }}
              className="text-center mt-3 mb-2 text-secondary"
            >
              Don't have an account?
              <Link
                as={Link}
                to={"/usersignup"}
                style={{ color: "#1b5a9d" }}
                className="text-decoration-none"
              >
                {" "}
                Signup
              </Link>
            </div>
            <div className="text-center  mb-2 text-secondary">
              <Link
                as={Link}
                to={"/admin"}
                style={{ color: "#1b5a9d", fontSize: "15px" }}
                className="text-decoration-none "
              >
                {" "}
                Admin Login?
              </Link>
            </div>
            {showAlert && <AlertPopup message="Login successful!" />}
          </div>
        </div>
      ) : (
        <div
          style={{ height: "90vh" }}
          className="row justify-content-center align-items-center mt-5 login-container"
        >
          <div
            style={{ borderRadius: "10px" }}
            className="col-sm-8 col-md-3 p-4 bg-light"
          >
            <h2 className="text-center mt-4 mb-4">
              {userIcon ? (
                <FaUserCircle
                  style={{ fontSize: "80px", mixBlendMode: "difference" }}
                  className="text-secondary shadow"
                />
              ) : (
                <FaUserSlash
                  style={{ fontSize: "80px", mixBlendMode: "difference" }}
                  className="text-secondary shadow"
                />
              )}
            </h2>
            <form ref={formRefForForgotPassword} className="needs-validation">
              <input
                className="form-control mt-2 mt-1"
                type="email"
                name="email"
                id="email"
                placeholder="Enter email..."
                required
                value={userForgotPassword.email}
                onChange={(e) =>
                  setUserForgotPassword({
                    ...userForgotPassword,
                    email: e.target.value,
                  })
                }
              />
              <input
                className="form-control mt-2 mt-2"
                type="password"
                name="password"
                id="password"
                placeholder="Create new password..."
                value={userForgotPassword.password}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$"
                onChange={(e) =>
                  setUserForgotPassword({
                    ...userForgotPassword,
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
                    <FaCircle style={{ fontSize: "5px" }} /> Atleast 1
                    Uppercase, 1 Lowercase and 1 Special character
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
                className=" mt-3"
                variant={buttonValidationForForgotPassowrd}
                onClick={userForgotPasswordAction}
              >
                {buttonTextForForgotPassowrd}
              </Button>
            </div>
            <div
              style={{ fontSize: "15px" }}
              className="text-center mt-3 mb-2 text-secondary"
            >
              Don't have an account?
              <Link
                as={Link}
                to={"/usersignup"}
                style={{ color: "#1b5a9d" }}
                className="text-decoration-none"
              >
                Signup
              </Link>
            </div>
            {showAlertForPasswordChange && (
              <AlertPopup message="Password changed successfully" />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserLogin;

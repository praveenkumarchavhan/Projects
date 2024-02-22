import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Registration.css";
import img from "./edutrain.jpeg";
import RegistrationInstructions from "./RegistrationInstructions";

import Footer1 from "./Footer";
import Bottom1 from "./Bottom";
import NewNavbar from "./Navbar";

const Facultyreg = () => {
  let [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    mobile: "",
    empid: ""
  });

  let [errors, setErrors] = useState({
    nameError: "",
    passwordError: "",
    confirmPasswordError: "",
    emailError: "",
    mobileError: "",
    empidError: ""
  });

  let handlerEmpidAction = (e) => {
    let newuser = { ...user, empid: e.target.value };
    setUser(newuser);
    setErrors({ ...errors, empidError: "" });
  };

  let handlerUsernameAction = (e) => {
    let newuser = { ...user, username: e.target.value };
    setUser(newuser);
    setErrors({ ...errors, nameError: "" });
  };

  let handlerPasswordAction = (e) => {
    let newuser = { ...user, password: e.target.value };
    setUser(newuser);
    setErrors({ ...errors, passwordError: "" });
  };

  let handlerConfirmPasswordAction = (e) => {
    let newuser = { ...user, confirmPassword: e.target.value };
    setUser(newuser);
    setErrors({ ...errors, confirmPasswordError: "" });
  };

  let handlerEmailAction = (e) => {
    let newuser = { ...user, email: e.target.value };
    setUser(newuser);
    setErrors({ ...errors, emailError: "" });
  };

  let handlerMobileAction = (e) => {
    let newuser = { ...user, mobile: e.target.value };
    setUser(newuser);
    setErrors({ ...errors, mobileError: "" });
  };

  let validateForm = () => {
    let isValid = true;
    let newErrors = {
      nameError: "",
      passwordError: "",
      confirmPasswordError: "",
      emailError: "",
      mobileError: "",
      empidError: ""
    };

    if (user.username.trim() === "") {
      newErrors.nameError = "Name is required";
      isValid = false;
    } else if (!isValidName(user.username)) {
      newErrors.nameError =
        "Name should contain only alphabets and be less than 50 characters";
      isValid = false;
    }

    if (user.password.trim() === "") {
      newErrors.passwordError = "Password is required";
      isValid = false;
    } else if (!isValidPassword(user.password)) {
      newErrors.passwordError =
        "Password must be 6-20 characters with special characters";
      isValid = false;
    }

    if (user.confirmPassword.trim() === "") {
      newErrors.confirmPasswordError = "Confirm Password is required";
      isValid = false;
    } else if (user.password !== user.confirmPassword) {
      newErrors.confirmPasswordError = "Passwords do not match";
      isValid = false;
    }

    if (user.email.trim() === "") {
      newErrors.emailError = "Email is required";
      isValid = false;
    } else if (!isValidEmail(user.email)) {
      newErrors.emailError = "Invalid email format";
      isValid = false;
    }

    if (user.mobile.trim() === "") {
      newErrors.mobileError = "Mobile number is required";
      isValid = false;
    } else if (!isValidMobile(user.mobile)) {
      newErrors.mobileError = "Invalid mobile number format";
      isValid = false;
    }

    if (user.empid.trim() === "") {
      newErrors.prnError = "Employee Id is required";
      isValid = false;
    } else if (!isValidempid(user.empid)) {
      newErrors.empidError = "Invalid EmployeeId number format";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  let [showPopup, setShowPopup] = useState(false);
  let registerAction = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      // BACKEND
      let url = `http://localhost:4000/addfaculty?username=${user.username}&password=${user.password}&email=${user.email}&mobile=${user.mobile}&empid=${user.empid}`;
      await fetch(url);

      let newuser = {
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        mobile: "",
        empid: ""
      };
      setUser(newuser);
      setErrors({
        nameError: "",
        passwordError: "",
        confirmPasswordError: "",
        emailError: "",
        mobileError: "",
        empidError: ""
      });
      alert("Registration successful!");
      setShowPopup(false);
    }
  };

  let isValidName = (name) => {
    // Name should contain only alphabets and be less than 50 characters
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
  };

  let isValidPassword = (password) => {
    // Password should be 6-20 characters and contain at least one special character
    const passwordRegex = /^(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,20}$/;
    return passwordRegex.test(password);
  };

  let isValidEmail = (email) => {
    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  let isValidMobile = (mobile) => {
    // Indian mobile number validation
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
  };

  let isValidempid = (empid) => {
    // PRN should start with "230340" and be 12 digits long
    const prnRegex = /^[0-9]{9}$/;
    return prnRegex.test(empid);
  };

  return (
    <>
    <NewNavbar />
      <div>
        <div className="portion shadow-lg container-fluid">
          <h1 className="d-flex p-5 text-white">Student Registration Page</h1>
        </div>

        <div className="registration-page col-sm-12 col-md-8 shadow-lg p-3 bg-white rounded p-3 mb-4">
          <div className="row" style={{ marginBottom: "20px" }}>
            <img className="img-fluid" src={img} alt="" />
          </div>
          <h2>Registration Page</h2>
          <hr></hr>
          <form>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={user.username}
                    onChange={handlerUsernameAction}
                  />
                  <span className="form-text">
                    As per Degree Certificate / Govt issued ID Card
                  </span>
                  {errors.nameError && (
                    <div className="error">{errors.nameError}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handlerEmailAction}
                  />
                  <span className="form-text">e.g. example123@abc.com</span>
                  {errors.emailError && (
                    <div className="error">{errors.emailError}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="mobile">Mobile Number *</label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    pattern="[0-9]{10}"
                    value={user.mobile}
                    onChange={handlerMobileAction}
                  />
                  <span className="form-text">
                    Enter 10 digit Mobile No. e.g. 9876543210
                  </span>
                  {errors.mobileError && (
                    <div className="error">{errors.mobileError}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="prn">Employee ID *</label>
                  <input
                    type="text"
                    id="empid"
                    name="empid"
                    value={user.empid}
                    onChange={handlerEmpidAction}
                    pattern="[0-9]{9}"
                    title="Please enter a 9-digit Employee Id"
                  />
                  <span className="form-text">
                  Enter 9 digit Employee ID No. e.g. 987456321
                  </span>
                  {errors.empidError && (
                    <div className="error">{errors.empidError}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="password">Password *</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={handlerPasswordAction}
                  />
                  <span className="form-text">Min:6 & Max:20 Characters</span>
                  {errors.passwordError && (
                    <div className="error">{errors.passwordError}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password *</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handlerConfirmPasswordAction}
                    autoComplete="new-password"
                  />
                  {errors.confirmPasswordError && (
                    <div className="error">{errors.confirmPasswordError}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-center mt-4">
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={registerAction}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </form>

          <RegistrationInstructions></RegistrationInstructions>
        </div>
        <Footer1 />
        <Bottom1 />
      </div>
    </>
  );
};

export default Facultyreg;

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Registration.css";
import img from "./edutrain.jpeg";
import RegistrationInstructions from "./RegistrationInstructions";
import Navbar from './Navbar'
import Footer1 from "./Footer";
import Bottom1 from "./Bottom";
import NewNavbar from "./Navbar";

const StudentRegistration = () => {


  let [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    mobile: "",
    prnnumber:""
  });
  let handlerPrnAction = (e) => {
    let newuser = { ...user, prnnumber: e.target.value };
    setUser(newuser);
  };
  let handlerUsernameAction = (e) => {
    let newuser = { ...user, username: e.target.value };
    setUser(newuser);
  };

  let handlerPasswordAction = (e) => {
    let newuser = { ...user, password: e.target.value };
    setUser(newuser);
  };

  let handlerEmailAction = (e) => {
    let newuser = { ...user, email: e.target.value };
    setUser(newuser);
  };

  let handlerMobileAction = (e) => {
    let newuser = { ...user, mobile: e.target.value };
    setUser(newuser);
  };

  let registerAction = async () => {
    // BACKEND
    let url = `http://localhost:4000/addUserRecord?username=${user.username}&password=${user.password}&email=${user.email}&mobile=${user.mobile}=${user.prnnumber}`;
    await fetch(url);

    let newuser = {
      username: "",
      password: "",
      email: "",
      mobile: "",
      prnnumber:""
    };
    setUser(newuser);
  };










  const [formData, setFormData] = useState({
    
    name: "",
    email: "",
    mobile: "",
    prn: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    prn: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prevData) => ({ ...prevData, [name]: value }));
   
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      // Perform form submission logic here
      console.log("Form submitted!");
      alert("Registration Successful!");
    }
  };

  const validateForm = () => {
    const { name, email, mobile, prn, password, confirmPassword } = formData;
    const errors = {};

    // Perform validations and set error messages
    if (!name) {
      errors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      errors.name = "Name should only contain alphabets";
    } else if (name.length > 50) {
      errors.name = "Name is too long";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email format";
    }
    if (!mobile) {
      errors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(mobile)) {
      errors.mobile = "Mobile number should be 10 digits";
    }
    if (!prn) {
      errors.prn = "PRN number is required";
    } else if (!/^[0-9]{12}$/.test(prn)) {
      errors.prn = "PRN number should be 12 digits";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}/.test(password)
    ) {
      errors.password =
        "Password should be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setErrors(errors);

    // Return true if there are no errors, false otherwise
    return Object.keys(errors).length === 0;
  };

  const { name, email, mobile, prn, password, confirmPassword } = formData;

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
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                    onChange={handleChange}
                />
                <span className="form-text">
                  As per Degree Certificate / Govt issued ID Card
                </span>
                {errors.name && <p className="error">{errors.name}</p>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
                <span className="form-text">e.g. example123@abc.com</span>
                {errors.email && <p className="error">{errors.email}</p>}
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
                  value={mobile}
                  onChange={handleChange}
                />
                <span className="form-text">
                  Enter 10 digit Mobile No. e.g. 9876543210
                </span>
                {errors.mobile && <p className="error">{errors.mobile}</p>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="prn">PRN Number *</label>
                <input
                  type="text"
                  id="prn"
                  name="prn"
                  value={prn}
                  onChange={handleChange}
                  pattern="[0-9]{12}"
                  title="Please enter a 12-digit PRN number"
                />
                <span className="form-text">
                  Enter 12 digit PRN No. e.g. 230340256001
                </span>
                {errors.prn && <p className="error">{errors.prn}</p>}
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
                  value={password}
                  onChange={handleChange}
                />
                <span class="form-text">Min:6 & Max:20 Characters</span>
                {errors.password && <p className="error">{errors.password}</p>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                
                />
                <span class="form-text">Retype the password</span>
                {errors.confirmPassword && (
                  <p className="error">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center mt-4">
              <div className="form-group">
                <button type="submit" className="btn btn-primary" onClick={registerAction}>
                  Register
                </button>
              </div>
            </div>
          </div>
        </form>

        <RegistrationInstructions></RegistrationInstructions>
      </div>
      <Footer1/>
      <Bottom1/>
      </div>
    </>
  );
};

export default StudentRegistration;

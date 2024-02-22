
import Bottom1 from "./Bottom";
import "./ContactCss.css";




import React, { useState } from "react";
import Footer1 from "./Footer";
import NewNavbar from "./Navbar";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: ""
  });

  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, email, phone, location, message } = formData;
    const errors = {};

    if (!name) {
      errors.name = "Please provide a name.";
    }

    if (!email) {
      errors.email = "Please provide an email.";
    } else if (!isValidEmail(email)) {
      errors.email = "Please provide a valid email address.";
    }

    if (!phone) {
      errors.phone = "Please provide a phone number.";
    }

    if (!location) {
      errors.location = "Please provide a location.";
    }

    if (!message) {
      errors.message = "Please provide a message.";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
    } else {
      // Submit form
      console.log("Form submitted:", formData);
      // Reset form data
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        message: ""
      });
      // Reset validation errors
      setValidationErrors({});
    }
  };

  const isValidEmail = (email) => {
    // Simple email validation check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
    <NewNavbar />
    <div>
    <div className="contact2" style={{ backgroundImage: "url('https://www.cdac.in/img/hpc.png')" }} id="contact">
    <h1 style={{color:"orange",fontSize:70}}>Contact Us</h1>
   
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-info" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-dark" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    
        
      <div className="container">
        <div className="row contact-container">
          <div className="col-lg-12">
            <div className="card card-shadow border-0 mb-4">
              <div className="row">
                <div className="col-lg-8">
                  <div className="contact-box p-4">
                    <h4 className="title">Contact Us</h4>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group mt-3">
                            <input
                              className={`form-control ${validationErrors.name ? "is-invalid" : ""}`}
                              type="text"
                              placeholder="Name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                            />
                            {validationErrors.name && <div className="invalid-feedback">{validationErrors.name}</div>}
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group mt-3">
                            <input
                              className={`form-control ${validationErrors.email ? "is-invalid" : ""}`}
                              type="text"
                              placeholder="Email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                            />
                            {validationErrors.email && <div className="invalid-feedback">{validationErrors.email}</div>}
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group mt-3">
                            <input
                              className={`form-control ${validationErrors.phone ? "is-invalid" : ""}`}
                              type="text"
                              placeholder="Phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                            />
                            {validationErrors.phone && <div className="invalid-feedback">{validationErrors.phone}</div>}
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group mt-3">
                            <input
                              className={`form-control ${validationErrors.location ? "is-invalid" : ""}`}
                              type="text"
                              placeholder="Location"
                              name="location"
                              value={formData.location}
                              onChange={handleChange}
                            />
                            {validationErrors.location && <div className="invalid-feedback">{validationErrors.location}</div>}
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group mt-3">
                            <input
                              className={`form-control ${validationErrors.message ? "is-invalid" : ""}`}
                              type="text"
                              placeholder="Message"
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                            />
                            {validationErrors.message && <div className="invalid-feedback">{validationErrors.message}</div>}
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <button type="submit" className="btn btn-danger-gradiant mt-3 mb-3 text-white border-0 py-2 px-3">
                            <span>SUBMIT NOW <i className="ti-arrow-right"></i></span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-4 bg-image" style={{ backgroundImage: "url('https://www.cdac.in/img/int-banner2.jpg')" }}>
                  <div className="detail-box p-4">
                    <h5 className="text-white font-weight-light mb-3">ADDRESS</h5>
                    <p className="text-white op-7">Center For Devlopment of Advance Computing 
                      <br /> C-DAC Innovation Park</p>
                    <h5 className="text-white font-weight-light mb-3 mt-4">CALL US</h5>
                    <p className="text-white op-7">Phone: +91-20-25503100
                      <br /> Fax: +91-20-25503100</p>
                    <div className="round-social light">
                      <a href="#" className="ml-0 text-decoration-none text-white border border-white rounded-circle"><i className="icon-social-facebook"></i></a>
                      <a href="#" className="text-decoration-none text-white border border-white rounded-circle"><i className="icon-social-twitter"></i></a>
                      <a href="#" className="text-decoration-none text-white border border-white rounded-circle"><i className="icon-social-youtube"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer1 />
      <Bottom1/>
    </div>
   </> 
  );
};

export default Contact;

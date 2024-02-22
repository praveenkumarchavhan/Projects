import React, { useRef, useState } from "react";
import "./candidateLogin1.css";
import "bootstrap/dist/css/bootstrap.min.css";
import img from "./edutrain.jpeg";
import Footer1 from "./Footer";
import Bottom1 from "./Bottom";
import { useNavigate } from "react-router-dom";
import NewNavbar from "./Navbar";

function FacultyLogin() {
 
  const navigate = useNavigate();
  let formRef = useRef();
  let [isSuccess, setIsSuccess] = useState(false);
  let [isError, setIsError] = useState(false);
  let [errorFields, setErrorFields] = useState([]);

  let [user, setUser] = useState({
    email: "",
    password: "",
  });

  let handlerPasswordAction = (e) => {
    let newuser = { ...user, password: e.target.value };
    setUser(newuser);
  };

  let handlerEmailAction = (e) => {
    let newuser = { ...user, email: e.target.value };
    setUser(newuser);
  };

  let loginAction = async () => {
    try {
      formRef.current.classList.add("was-validated");
      let formStatus = formRef.current.checkValidity();
      if (!formStatus) {
        return;
      }

      // BACKEND :: ...
      let url = `http://localhost:4000/login-by-post-faculty`;
      let data = { email: user.email, password: user.password };
      let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 500) {
        let errorMessage = await res.text();
        throw new Error(errorMessage);
      }

      localStorage.setItem("loginStatusfac", "true");
      navigate("/facnavbar", { replace: true });
    } catch (err) {
      alert(err.message);
      setIsError(true);
      setErrorFields(["password"]);
    } finally {
      setTimeout(() => {
        setIsError(false);
        setIsSuccess(false);
        setErrorFields([]);
      }, 5000);
    }
  };

  return (
    <>
    <NewNavbar />
    <div>
      <div className="App">
        <div className="portion shadow-lg">
          <h1 className="d-flex p-5 text-white">Faculty Login</h1>
          <br />
        </div>
        <div className="container ">
          <div className="row justify-content-center mt-3">
            <div className="col-sm-12 col-md-8 shadow-lg p-3 bg-white rounded p-3">
              <img src={img} alt="Student" className="img-fluid" />

              <form ref={formRef} className="needs-validation">
                <div
                  className="row justify-content-center"
                  style={{ marginTop: "80px" }}
                >
                  <div className="col-7 form-group mt-4">
                    <label htmlFor="email">
                      <h5>Faculty Email Id:</h5>
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        errorFields.includes("email") ? "is-invalid" : ""
                      }`}
                      id="email"
                      placeholder="Enter Email Id"
                      value={user.email}
                      onChange={handlerEmailAction}
                      required
                    />
                    {errorFields.includes("email") && (
                      <div className="invalid-feedback">
                        Please enter a valid email.
                      </div>
                    )}
                  </div>
                  <div className="col-7 form-group mt-4">
                    <label htmlFor="password">
                      {" "}
                      <h5>Password:</h5>{" "}
                    </label>
                    <input
                      type="password"
                      className={`form-control ${
                        errorFields.includes("password") ? "is-invalid" : ""
                      }`}
                      id="password"
                      placeholder="Enter password"
                      value={user.password}
                      onChange={handlerPasswordAction}
                      required
                    />
                    {errorFields.includes("password") && (
                      <div className="invalid-feedback">
                        Please enter a password.
                      </div>
                    )}
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <input
                      type="button"
                      value="Login"
                      className="custom-btn btn-1 m-2"
                      onClick={loginAction}
                    />
                  </div>
                  {isSuccess && (
                    <div className="alert alert-success">Success</div>
                  )}
                  {isError && (
                    <div className="alert alert-danger">Login failed</div>
                  )}
                  <div style={{ paddingLeft: "70px" }}>
                    <div className="row justify-content-center mt-3">
                      <div className="col-12 col-md-5 mr-5 fs-5">
                        Not yet Registered? <a href="/falreg">Register</a>
                      </div>
                    </div>
                    <div className="row justify-content-center mt-1">
                      <div className="col-12 col-md-5 fs-5 mr-5">
                        Forgot Password? <a href="/falfor">Click Here</a>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <div className="form-group col-md-12 col-sm-12 col-xs-12">
                <div
                  className="alert alert-warning"
                  style={{ marginTop: "50px" }}
                >
                  <div className="panel-heading" style={{ color: "#7a1212" }}>
                    <h4 className="panel-title" style={{ fontWeight: "bold" }}>
                      <i className="bi bi-megaphone"> </i> Instructions
                    </h4>
                    <ul style={{ textAlign: "justify" }}>
                      <li style={{ margin: "5px 0px 0px 0px" }}>
                        Please use Firefox, Chrome, and Edge browsers on desktop
                        only.
                      </li>
                      <li style={{ margin: "5px 0px 0px 0px" }}>
                        Please use Firefox, Chrome, and Edge browsers on desktop
                        only. Govt issued ID Card.
                      </li>
                      <li style={{ margin: "5px 0px 0px 0px" }}>
                        Please use the Form No and Password sent to your
                        registered email.
                      </li>
                      <li style={{ margin: "5px 0px 0px 0px" }}>
                        In case you are found ineligible during any stage of the
                        admission process or course delivery, your admission
                        will be canceled with immediate effect. The penalty
                        clauses as given in the Cancellation and Refund section
                        of the Admission Booklet will be applied.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer1 />
      <Bottom1 />
    </div>
    </>
  );
}

export default FacultyLogin;

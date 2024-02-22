import "./candidateLogin1.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useRef, useState } from "react";
import img from "./edutrain.jpeg";
import { useNavigate } from "react-router-dom";
import Footer1 from "./Footer";
import Bottom1 from "./Bottom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import NewNavbar from "./Navbar";

function CandidateForgotPassword() {
  const navigate = useNavigate();
  let formRef = useRef();
  let [showModal, setShowModal] = useState(false);
  let [modalContent, setModalContent] = useState("");

  let [user, setUser] = useState({
    email: "",
  });

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
      let url = `http://localhost:4000/findstd`;
      let data = { email: user.email };
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

      let response = await res.text();
      setModalContent(response);
      setShowModal(true);
    } catch (err) {
      alert(err.message);
    }
  };

  let handleCloseModal = () => {
    setShowModal(false);
    setModalContent("");
  };

  return (
    <>
   <NewNavbar />
    <div>
      <div className="App">
        <div className="portion shadow-lg">
          <h1 className="d-flex p-5 text-white">Student Forgot Password</h1>
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
                    <label htmlFor="text">
                      <h5>Email Id:</h5>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="PRNid"
                      placeholder="Enter Email Id"
                      value={user.email}
                      onChange={handlerEmailAction}
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <input
                      type="button"
                      value="Verify"
                      className="custom-btn btn-1 m-2"
                      onClick={loginAction}
                    />
                  </div>

                  <div style={{ paddingLeft: "70px" }}>
                    <div className="row justify-content-center mt-3">
                      <div className="col-12 col-md-5 mr-5 fs-5">
                        Not yet Registered?
                        <a href="/stdreg">Register</a>
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
                    <h4
                      className="panel-title"
                      style={{ fontWeight: "bold" }}
                    >
                      <i className="bi bi-megaphone"> </i> Instructions
                    </h4>
                    <ul style={{ textAlign: "justify" }}>
                      <li style={{ margin: "5px 0px 0px 0px" }}>
                        Please use Firefox, Chrome, and Edge browsers on
                        desktop only.
                      </li>
                      <li style={{ margin: "5px 0px 0px 0px" }}>
                        Please use Firefox, Chrome, and Edge browsers on
                        desktop only. Govt issued ID Card.
                      </li>
                      <li style={{ margin: "5px 0px 0px 0px" }}>
                        Please use the Form No and Password sent to your
                        registered email.
                      </li>
                      <li style={{ margin: "5px 0px 0px 0px" }}>
                        In case you are found ineligible during any stage of
                        the admission process or course delivery, your
                        admission will be canceled with immediate effect. The
                        penalty clauses as given in the Cancellation and Refund
                        section of the Admission Booklet will be applied.
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Response</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );

}

export default CandidateForgotPassword;

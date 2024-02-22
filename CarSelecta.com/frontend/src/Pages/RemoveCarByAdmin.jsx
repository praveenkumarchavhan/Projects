import { useEffect, useRef, useState } from "react";
import Navigationbar from "./Navigationbar";
import axios from "axios";
import { Button, Card, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Cards.css";
import AlertPopup from "./AlertPopup";
import { car } from "fontawesome";
import { FaTimes } from "react-icons/fa";
import AdminNavBar from "./AdminNavBar";

function RemoveCarByAdmin() {
  let [inputPlaceholder, setInputPlaceholder] = useState("");
  let [searchCarBy, setSearchCarBy] = useState("");
  let [validationPattern, setValidationPattern] = useState("");
  let [buttonValidation, setButtonValidation] = useState("outline-success");
  let [inputValue, setInputValue] = useState("");
  let [url, setUrl] = useState("");

  const formRef = useRef();
  const [cars, setCars] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [carIdForDelete, setCarIdForDelete] = useState("");

  

  const formatPrice = (price) => {
    if (cars.length !== 0) {
      return price.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
        //   maximumFractionDigits: 2,
      });
    }
  };

  let handleCarSearch = (e) => {
    console.log(e.target.value);
    setSearchCarBy(e.target.value);
    if (e.target.value == "Car Name") {
      setInputPlaceholder("Enter Car Name...");
      setValidationPattern("^[a-zA-Z0-9 ]*$");
      setUrl("search-by-model-name");
    } else if (e.target.value == "Car Type") {
      setInputPlaceholder("Enter Car Type...");
      setValidationPattern("^[a-zA-Z ]*$");
      setUrl("search-by-model-type");
    } else if (e.target.value == "Brand Name") {
      setInputPlaceholder("Enter Brand Name...");
      setValidationPattern("^[a-zA-Z ]*$");
      setUrl("search-by-brand-name");
    } else if (e.target.value == "Car Year") {
      setInputPlaceholder("Enter Car Year...");
      setValidationPattern("^(199\\d|20[0-1]\\d|202[0-9])$");
      setUrl("search-by-model-year");
    } else {
      setInputPlaceholder("********************");
      setInputValue("*************************");
      setValidationPattern("[*]*");
      setUrl("get-all-cars-for-update");
    }
  };

  let searchCarAction = async () => {
    formRef.current.classList.add("was-validated");
    let formStatus = formRef.current.checkValidity();
    if (!formStatus) {
      setButtonValidation("outline-danger");
      return;
    }
    console.log(inputValue);
    const formData = new FormData();
    formData.append("carName", inputValue);
    formData.append("carBrand", inputValue);
    formData.append("carType", inputValue);
    formData.append("modelYear", inputValue);

    try {
      const response = await axios.post(
        `http://localhost:8181/${url}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setCars(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading data", error);
      setButtonValidation("outline-danger");
    }
    setInputValue("");
    setSearchCarBy("");
    setInputPlaceholder("");
    setButtonValidation("outline-success");
    formRef.current.classList.remove("was-validated");
  };

  let handleCloseConfirmModel = () => setShowConfirmModal(false);

  let handleConfirmation = (newCarId) => {
    setShowConfirmModal(true);
    setCarIdForDelete(newCarId);
    console.log(carIdForDelete);
  };

  const handleDeleteCar = async () => {
    try {
      await axios.get(
        `http://localhost:8181/delete-car-by-id?newCarId=${carIdForDelete}`
      );
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <AdminNavBar/>
      {/* fetching car by search */}

      <div className="row justify-content-center p-5 m-5">
        <div className="col-sm-12 col-md-4 bg-light p-4 shadow">
          <form ref={formRef} className="needs-validation">
            <select
              className="form-control shadow-sm mt-4"
              aria-label="Default select example"
              value={searchCarBy}
              onChange={handleCarSearch}
              required
            >
              <option value="" selected>
                Search Car By...
              </option>
              <option value="Car Name">Car Name</option>
              <option value="Car Type">Car Type</option>
              <option value="Brand Name">Brand Name</option>
              <option value="Car Year">Car Year</option>
              <option value="Get All Cars">Get All Cars</option>
            </select>
            <input
              className="mt-2 form-control"
              type="text"
              name="carName"
              id="carName"
              pattern={validationPattern}
              placeholder={inputPlaceholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
            />
          </form>
          <Button
            style={{ width: "200px", marginLeft: "90px" }}
            type="submit"
            className="btn shadow-sm mt-3"
            variant={buttonValidation}
            onClick={searchCarAction}
          >
            Search
          </Button>
        </div>
      </div>

      <div className={`row m-5 p-5 justify-content-center  `}>
        {cars.map((car) => (
          <div className="col-sm-12 col-md-3 mt-5">
            <Link
              className="text-secondary"
              onClick={() => handleConfirmation(car.newCarId)}
            >
              <Card
                className="hover-element overflow-hidden"
                style={{ width: "18rem" }}
              >
                <Card.Img
                  variant="top"
                  src={`data:image/jpeg;base64,${car.carImage}`}
                />
                <Card.Body style={{ width: "18rem" }} className="textContent">
                  <Card.Title className="mb-0">
                    {car.carBrand + " " + car.carName}
                  </Card.Title>
                  <Card.Text className="mb-0 mt-0">
                    <small>{car.carModel}</small>{" "}
                  </Card.Text>
                  <Card.Text className="mb-0">
                    <small>{formatPrice(car.carPrice) + " Lakh*"}</small>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </div>
        ))}
        <Modal
          style={{ marginTop: "200px" }}
          show={showConfirmModal}
          onHide={handleCloseConfirmModel}
          autoFocus={true}
          animation={true}
        >
          <Modal.Header>
            <Modal.Title></Modal.Title>
            <FaTimes
              style={{ cursor: "pointer" }}
              onClick={handleCloseConfirmModel}
            />
          </Modal.Header>
          <Modal.Body className="p-5 text-center">
            Are you sure you want to delete this?
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <Button
              style={{ width: "200px" }}
              variant="outline-danger"
              onClick={handleDeleteCar}
            >
              Delete
            </Button>
          </Modal.Footer>
          {showAlert && <AlertPopup message="Car deleted successfully!" />}
        </Modal>
      </div>
    </>
  );
}
export default RemoveCarByAdmin;

import { useRef, useState } from "react";
import Navigationbar from "./Navigationbar";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";

function AdminUpdateCar() {
  let formRef = useRef();

  let [inputPlaceholder, setInputPlaceholder] = useState("");
  let [searchCarBy, setSearchCarBy] = useState("");
  let [validationPattern, setValidationPattern] = useState("");
  let [buttonValidation, setButtonValidation] = useState("outline-success");
  let [inputValue, setInputValue] = useState("");
  let [url, setUrl] = useState("");
  let [items, setItems] = useState([]);

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
  let response;
  let addCarAction = async () => {
    formRef.current.classList.add("was-validated");
    let formStatus = formRef.current.checkValidity();
    if (!formStatus) {
      setButtonValidation("outline-danger");
      return;
    }

    const formData = new FormData();
    formData.append("carName", inputValue);
    formData.append("carBrand", inputValue);
    formData.append("carType", inputValue);
    formData.append("modelYear", inputValue);

    try {
      response = await axios.post(`http://localhost:8181/${url}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setItems(response.data);
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

  const formatPrice = (price) => {
      return price.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
        //   maximumFractionDigits: 2,
      });
  };
  return (
    <>
      <AdminNavBar/>
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
            onClick={addCarAction}
          >
            Search
          </Button>
        </div>
      </div>
      <div className="row  justify-content-center m-5 p-5">
        {items.map((item) => (
          <div className="col-sm-12 col-md-3 d-flex justify-content-center mt-5">
            <Link
              to="/updatecarbyadmin"
              state={{ value: item.newCarId }}
              className="text-secondary"
              //   onClick={() =>
              //     handleShowPopup(
              //       car.carBrand + " " + car.carName,
              //       car.newCarId
              //     )
              //   }
            >
              <Card
                className="hover-element overflow-hidden"
                style={{ width: "18rem" }}
              >
                <Card.Img
                  variant="top"
                  src={`data:image/jpeg;base64,${item.carImage}`}
                />
                <Card.Body style={{ width: "18rem" }} className="textContent">
                  <Card.Title className="mb-0">
                    {item.carBrand + " " + item.carName}
                  </Card.Title>
                  <Card.Text className="mb-0">
                    <small>{formatPrice(item.carPrice)+" Lakh*"}</small>
                  </Card.Text>
                  <Card.Text className="mb-0 mt-0">
                    <small>{"Mileage: " + item.araimileage}</small>{" "}
                  </Card.Text>
                  <Card.Text className="mb-0 mt-0">
                    <small>{"Fuel: " + item.fuelType}</small>{" "}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default AdminUpdateCar;

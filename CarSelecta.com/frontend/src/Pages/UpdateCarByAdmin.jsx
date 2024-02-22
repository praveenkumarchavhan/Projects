import {
  Button,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
} from "react-bootstrap";
import Navigationbar from "./Navigationbar";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import AlertPopup from "./AlertPopup";
import Cookies from "js-cookie";
import AdminNavBar from "./AdminNavBar";

function UpdateCarByAdmin() {
  //fetching data from ::AdminUpdateCar component which is passed by
  //<Link to='/updatecarbyadmin' state={{ value: item.newCarId }}>
  const location = useLocation();
  const receivedValue = location.state?.value || "No value received";

  let formRef = useRef();

  let [buttonValidation, setButtonValidation] = useState("outline-success");
  const [showAlert, setShowAlert] = useState(false);

  const [newCarId, setNewCarId] = useState("");
  const [carName, setCarName] = useState("");
  const [carBrand, setCarBrand] = useState("");
  const [carType, setCarType] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carPrice, setCarPrice] = useState("");
  const [ARAIMileage, setARAIMileage] = useState("");
  const [cityMileage, setCityMileage] = useState("");
  const [highwayMileage, setHighwayMileage] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [modelYear, setModelyear] = useState("");
  const [description, setDescription] = useState("");
  const [carImage, setCarImage] = useState(null);

  const [exShowroomPrice, setExShowroomPrice] = useState("");
  const [roadTax, setRoadTax] = useState("");
  const [insurance, setInsurance] = useState("");
  const [otherCharges, setOtherCharges] = useState("");
  const [optionalCharges, setOptionalCharges] = useState("");
  const [EMI, setEMI] = useState("");

  //it trigger automatically when page renders
  // it will render page with ::AdminUpdateCar component values
  useEffect(() => {
    fetchData(receivedValue);
  }, [receivedValue]);

  //to fetch data from database by the value which is passed by ::AdminUpdateCar component
  const fetchData = async (paramValue) => {
    try {
      const response = await axios.get(
        `http://localhost:8181/find-car-by-id?newCarId=${paramValue}`
      );


      //here we are passing response data to populate all the input fields for update purpose
      insertDataIntoNewCar(response.data.newCar);
      insertDateIntoCarPricing(response.data.carPricing);
      
      console.log(response.data.carPricing);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //these will populate all the inputs with the data that is to be updated
  const insertDataIntoNewCar = (responseData) => {
    setNewCarId(receivedValue);
    setCarName(responseData.carName);
    setCarModel(responseData.carModel);
    setCarBrand(responseData.carBrand);
    setCarType(responseData.carType);
    setCarPrice(responseData.carPrice);
    setARAIMileage(responseData.araimileage.replace(' kmpl', ''));
    setCityMileage(responseData.cityMileage.replace(' kmpl', ''));
    setHighwayMileage(responseData.highwayMileage.replace(' kmpl', ''));
    setFuelType(responseData.fuelType);
    setTransmission(responseData.transmission);
    setModelyear(responseData.modelYear);
    setDescription(responseData.description);
    
  };
  const insertDateIntoCarPricing=(responseData)=>{
    setExShowroomPrice(responseData.exShowroomPrice);
    setRoadTax(responseData.roadTax);
    setInsurance(responseData.insurance);
    setOtherCharges(responseData.otherCharges);
    setOptionalCharges(responseData.optionalCharges);
    setEMI(responseData.emi);
  }

  //The code below is for update purpose

  const handleCarImage = (e) => {
    setCarImage(e.target.files[0]);
  };

  let updateCarAction = async () => {
    formRef.current.classList.add("was-validated");
    let formStatus = formRef.current.checkValidity();
    if (!formStatus) {
      setButtonValidation("outline-danger");
      return;
    }
    const username = Cookies.get("admin");
      //it is built-in javascript object which provides way to store form data as key value pairs
    const formData = new FormData();
    formData.append("newCarId", newCarId);
    formData.append("carImage", carImage);
    formData.append("carName", carName);
    formData.append("carModel", carModel);
    formData.append("carBrand", carBrand);
    formData.append("carType", carType);
    formData.append("carPrice", carPrice);
    formData.append("ARAIMileage", ARAIMileage + " kmpl");
    formData.append("cityMileage", cityMileage + " kmpl");
    formData.append("highwayMileage", highwayMileage + " kmpl");
    formData.append("fuelType", fuelType);
    formData.append("transmission", transmission);
    formData.append("modelYear", modelYear);
    formData.append("description", description);
    formData.append("exShowroomPrice", exShowroomPrice);
    formData.append("roadTax", roadTax);
    formData.append("insurance", insurance);
    formData.append("otherCharges", otherCharges);
    formData.append("optionalCharges", optionalCharges);
    formData.append("EMI", EMI);
    formData.append("username", username);

    //for storing the updated data
    try {
      const response = await axios.post(
        "http://localhost:8181/update-new-car",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        setButtonValidation("outline-success");
      }
    } catch (error) {
      setButtonValidation("outline-danger");
      console.error("Error uploading data", error);
    }

    setCarName("");
    setCarBrand("");
    setCarType("");
    setCarPrice("");
    setARAIMileage("");
    setFuelType("");
    setTransmission("");
    setModelyear("");
    setDescription("");
    setCarImage(null);
    formRef.current.classList.remove("was-validated");

  };

  return (
    <>
      <AdminNavBar/>
      <h2 className="text-secondary text-center mt-5">
        Add car into collection
      </h2>
      <div className="bg-light p-5 m-5 shadow">
        <form ref={formRef} className="needs-validation">
          {/* ----------------------------------------------------ROW::1--------------------------------- */}
          <div className="row m-5 ">
            <div className="col-sm-12 col-md-4 mt-1">
              <input
                className="form-control shadow-sm"
                type="text"
                name="carName"
                id="carName"
                placeholder="Enter car name..."
                value={carName}
                onChange={(e) => setCarName(e.target.value)}
                required
              />
              <Form.Control.Feedback className="m-1" type="invalid">
                Please enter a car name*
              </Form.Control.Feedback>
            </div>
            <div className="col-sm-12 col-md-4 mt-1">
              <input
                className="form-control shadow-sm"
                type="text"
                name="carModel"
                id="carModel"
                placeholder="Enter car model..."
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                required
              />
              <Form.Control.Feedback className="m-1" type="invalid">
                Please enter a car model name*
              </Form.Control.Feedback>
            </div>
            <div className="col-sm-12 col-md-4 mt-1">
              <select
                className="form-control shadow-sm"
                aria-label="Default select example"
                value={carType}
                onChange={(e) => setCarType(e.target.value)}
                required
              >
                <option value="" selected>
                  Select car type...
                </option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Coupe">Coupe</option>
                <option value="MUV">MUV</option>
                <option value="Wagon">Wagon</option>
                <option value="Minivan">Minivan</option>
                <option value="Convertible">Convertible</option>
                <option value="Van">Van</option>
                <option value="Pickup Truck">Pickup Truck</option>
                <option value="CUV">CUV</option>
                <option value="Sports Car">Sports Car</option>
              </select>
              <Form.Control.Feedback className="m-1" type="invalid">
                Please select a car type*
              </Form.Control.Feedback>
            </div>
          </div>
          {/* ----------------------------------------------------ROW::2--------------------------------- */}
          <div className="row m-5">
            <div className="col-sm-12 col-md-4 mt-1">
              <select
                className="form-control shadow-sm"
                aria-label="Default select example"
                value={carBrand}
                onChange={(e) => setCarBrand(e.target.value)}
                required
              >
                <option value="" selected>
                  Select car brand...
                </option>
                <option value="Mercedes-Benz">Mercedes-Benz</option>
                <option value="BMW">BMW</option>
                <option value="Audi">Audi</option>
                <option value="Porche">Porche</option>
                <option value="Ford">Ford</option>
                <option value="Chevrolet">Chevrolet</option>
                <option value="Lamborghini">Lamborghini</option>
                <option value="Bently">Bently</option>
                <option value="Nissan">Nissan</option>
                <option value="Jeep">Jeep</option>
                <option value="Cadillac">Cadillac</option>
                <option value="Hyundai">Hyundai</option>
                <option value="Dodge">Dodge</option>
                <option value="Honda">Honda</option>
                <option value="Aston Martin">Aston Martin</option>
                <option value="Lexus">Lexus</option>
                <option value="Tesla">Tesla</option>
                <option value="Chrysler">Chrysler</option>
                <option value="Renault">Renault</option>
                <option value="Volkswagen">Volkswagen</option>
                <option value="Toyota">Toyota</option>
                <option value="Ferrari">Ferrari</option>
                <option value="Jaguar">Jaguar</option>
                <option value="Buggati">Buggati</option>
                <option value="Rolls Royse">Rolls Royse</option>
                <option value="Kia">Kia</option>
                <option value="Volvo">Volvo</option>
                <option value="Maruti Suzuki">Maruti Suzuki</option>
                <option value="Fiat">Fiat</option>
                <option value="Land Rover">Land Rover</option>
                <option value="Skoda">Skoda</option>
                <option value="Tata">Tata</option>
                <option value="Isuzu">Isuzu</option>
                <option value="MG">MG</option>
                <option value="Mahindra">Mahindra</option>
              </select>
              <Form.Control.Feedback className="m-1" type="invalid">
                Please select a car brand*
              </Form.Control.Feedback>
            </div>

            <div className="col-sm-12 col-md-4 mt-1">
              <InputGroup className="mb-3">
                <Form.Control
                  aria-label="Text input with dropdown button"
                  pattern="^[0-9,]*$"
                  placeholder="Enter car price..."
                  value={carPrice}
                  onChange={(e) => setCarPrice(e.target.value)}
                  required
                />
                <Form.Control.Feedback className="m-1" type="invalid">
                  Please enter car price*
                </Form.Control.Feedback>
              </InputGroup>
            </div>
            <div className="col-sm-12 col-md-4 mt-1">
              <input
                className="form-control shadow-sm "
                type="file"
                name="carImage"
                id="formFile"
                placeholder="Choose car image"
                onChange={handleCarImage}
                required
              />
              <Form.Control.Feedback className="m-1" type="invalid">
                Please upload car image*
              </Form.Control.Feedback>
            </div>
          </div>
          {/* ----------------------------------------------------ROW::3--------------------------------- */}
          <div className="row m-5">
            <div className="col-sm-12 col-md-4 mt-1">
              <select
                className="form-control shadow-sm"
                aria-label="Default select example"
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                required
              >
                <option value="" selected>
                  Select fuel type...
                </option>
                <option value="Diesel">Diesel</option>
                <option value="Petrol">Petrol</option>
                <option value="Electric">Electric</option>
                <option value="CNG">CNG</option>
                <option value="Bio Diesel">Bio Diesel</option>
                <option value="LPG">LPG</option>
                <option value="Ethanol or Methanol">Ethanol or Methanol</option>
              </select>
              <Form.Control.Feedback className="m-1" type="invalid">
                Please select car fuel type*
              </Form.Control.Feedback>
            </div>
            <div className="col-sm-12 col-md-4 mt-1">
              <select
                className="form-control shadow-sm"
                aria-label="Default select example"
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                required
              >
                <option value="" selected>
                  Select Transmission...
                </option>
                <option value="Auto">Auto</option>
                <option value="Manual">Manual</option>
              </select>
              <Form.Control.Feedback className="m-1" type="invalid">
                Please select transmission*
              </Form.Control.Feedback>
            </div>
            <div className="col-sm-12 col-md-4 mt-1">
              <select
                className="form-control shadow-sm"
                aria-label="Default select example"
                value={modelYear}
                onChange={(e) => setModelyear(e.target.value)}
                required
              >
                <option value="" selected>
                  Select car year...
                </option>
                <option value="2000">2000</option>
                <option value="2001">2001</option>
                <option value="2002">2002</option>
                <option value="2003">2003</option>
                <option value="2004">2004</option>
                <option value="2005">2005</option>
                <option value="2006">2006</option>
                <option value="2007">2007</option>
                <option value="2008">2008</option>
                <option value="2009">2009</option>
                <option value="2010">2010</option>
                <option value="2011">2011</option>
                <option value="2012">2012</option>
                <option value="2013">2013</option>
                <option value="2014">2014</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
              <Form.Control.Feedback className="m-1" type="invalid">
                Please select car year*
              </Form.Control.Feedback>
            </div>
          </div>
          {/* ----------------------------------------------------ROW::4--------------------------------- */}
          <div className="row m-5">
            <div className="col-sm-12 col-md-4 mt-1">
              <input
                className="form-control shadow-sm"
                type="text"
                name="exShowroomPrice"
                id="exShowroomPrice"
                placeholder="Enter ex-showroom price..."
                pattern="^[0-9,]*$"
                value={exShowroomPrice}
                onChange={(e) => setExShowroomPrice(e.target.value)}
                required
              />
              <Form.Control.Feedback className="m-1" type="invalid">
                Please enter ex-showroom price*
              </Form.Control.Feedback>
            </div>
            <div className="col-sm-12 col-md-4 mt-1">
              <input
                className="form-control shadow-sm"
                type="text"
                name="roadTax"
                id="roadTax"
                placeholder="Enter road tax..."
                pattern="^[0-9,]*$"
                value={roadTax}
                onChange={(e) => setRoadTax(e.target.value)}
                required
              />
              <Form.Control.Feedback className="m-1" type="invalid">
                Please enter road-tax*
              </Form.Control.Feedback>
            </div>
            <div className="col-sm-12 col-md-4 mt-1">
              <input
                className="form-control shadow-sm "
                type="text"
                name="insurance"
                id="insurance"
                placeholder="Enter insurance price..."
                pattern="^[0-9,]*$"
                value={insurance}
                onChange={(e) => setInsurance(e.target.value)}
                required
              />
              <Form.Control.Feedback className="m-1" type="invalid">
                Please enter car insurance price*
              </Form.Control.Feedback>
            </div>
          </div>
          {/* ----------------------------------------------------ROW::5--------------------------------- */}
          <div className="row m-5">
            <div className="col-sm-12 col-md-4 mt-1">
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Enter EMI..."
                  title="Mileage must be a number with up to 2 decimal places"
                  value={EMI}
                  pattern="^[0-9,]*$"
                  onChange={(e) => setEMI(e.target.value)}
                  required
                />
                <InputGroup.Text>month</InputGroup.Text>
                <Form.Control.Feedback className="m-1" type="invalid">
                  Please enter EMI/month*
                </Form.Control.Feedback>
              </InputGroup>
            </div>
            <div className="col-sm-12 col-md-4 mt-1">
              <input
                className="form-control shadow-sm"
                type="text"
                name="otherCharges"
                id="otherCharges"
                placeholder="Enter other charges..."
                pattern="^[0-9,]*$"
                value={otherCharges}
                onChange={(e) => setOtherCharges(e.target.value)}
                required
              />
              <Form.Control.Feedback className="m-1" type="invalid">
                Please enter other charges*
              </Form.Control.Feedback>
            </div>
            <div className="col-sm-12 col-md-4 mt-1">
              <input
                className="form-control shadow-sm"
                type="text"
                name="optionalCharges"
                id="optionalCharges"
                placeholder="Enter optional charges..."
                pattern="^[0-9,]*$"
                value={optionalCharges}
                onChange={(e) => setOptionalCharges(e.target.value)}
                required
              />
              <Form.Control.Feedback className="m-1" type="invalid">
                Please enter optional charges*
              </Form.Control.Feedback>
            </div>
          </div>
          {/* ----------------------------------------------------ROW::6--------------------------------- */}
          <div className="row m-5">
            <div className="col-sm-12 col-md-4 mt-1">
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Enter ARAI mileage"
                  pattern="^[0-9]*\.?[0-9]*$"
                  title="Mileage must be a number with up to 2 decimal places"
                  value={ARAIMileage}
                  onChange={(e) => setARAIMileage(e.target.value)}
                  required
                />
                <InputGroup.Text>kmpl</InputGroup.Text>
                <Form.Control.Feedback className="m-1" type="invalid">
                  Please enter ARAI mileage*
                </Form.Control.Feedback>
              </InputGroup>
            </div>
            <div className="col-sm-12 col-md-4 mt-1">
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Enter city mileage"
                  pattern="^[0-9]*\.?[0-9]*$"
                  title="Mileage must be a number with up to 2 decimal places"
                  value={cityMileage}
                  onChange={(e) => setCityMileage(e.target.value)}
                  required
                />
                <InputGroup.Text>kmpl</InputGroup.Text>
                <Form.Control.Feedback className="m-1" type="invalid">
                  Please enter city mileage*
                </Form.Control.Feedback>
              </InputGroup>
            </div>
            <div className="col-sm-12 col-md-4 mt-1">
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Enter highway mileage"
                  pattern="^[0-9]*\.?[0-9]*$"
                  title="Mileage must be a number with up to 2 decimal places"
                  value={highwayMileage}
                  onChange={(e) => setHighwayMileage(e.target.value)}
                  required
                />
                <InputGroup.Text>kmpl</InputGroup.Text>
                <Form.Control.Feedback className="m-1" type="invalid">
                  Please enter highway mileage*
                </Form.Control.Feedback>
              </InputGroup>
            </div>
          </div>

          <div className="row m-5">
            <div className="col-sm-12 col-md-12">
              <textarea
                className="form-control shadow-sm"
                name="description"
                id=""
                cols="30"
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              >
                Enter Description...
              </textarea>
            </div>
          </div>
        </form>

        <div className="row m-5 justify-content-center">
          <div className="col-sm-12 col-md-2">
            <Button
              style={{ width: "200px" }}
              type="submit"
              className="btn shadow mt-3"
              variant={buttonValidation}
              onClick={updateCarAction}
            >
              Update Car Details
            </Button>
            {showAlert && (
              <AlertPopup message="Car details updated successfully!" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default UpdateCarByAdmin;

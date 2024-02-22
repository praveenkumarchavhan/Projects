import { useEffect, useState } from "react";
import Navigationbar from "./Navigationbar";
import Cookies from "js-cookie";
import {
  Button,
  Card,
  OverlayTrigger,
  Popover,
  Tooltip,
} from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaCircle, FaRegHeart, FaTimes } from "react-icons/fa";
import AlertPopup from "./AlertPopup";

function WishList({ Cars }) {
  const [showAlert, setShowAlert] = useState(false);
  const [carList, setCarList] = useState(Cars);

  const removeFromFavHandle = async (newCarId) => {
    const email = Cookies.get("email");
    try {
      await axios.get(
        `http://localhost:8181/delete-from-favorite?newCarId=${newCarId}&email=${email}`
      );
      const updatedCarList = carList.filter((car) => car.newCarId !== newCarId);
      setCarList(updatedCarList);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const renderTooltip = (description, name) => (
    <Popover id="popover-basic" className="w-100">
      <Popover.Header as="h3" className="text-center text-info">
        {name}
      </Popover.Header>
      <Popover.Body>{description}</Popover.Body>
    </Popover>
  );
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
      {carList.map((car) => (
        <div
          key={car.newCarId}
          style={{ borderRadius: "10px" }}
          className="row bg-light mb-3 shadow-sm"
        >
            <div className="col-md-4 p-2 card">
          <Link
            className="text-decoration-none text-dark"
            as={Link}
            to={"/carpreview"}
            state={{ value: car.newCarId }}
          >
              <img
                style={{ borderRadius: "10px" }}
                src={`data:image/jpeg;base64,${car.carImage}`}
                className="img-fluid rounded-start card-image"
                alt="..."
              />
          </Link>
            </div>
          <div className="col-md-7 p-3 mt-2">
            <div className="card-body">
              <OverlayTrigger
                placement="bottom-start"
                delay={{ show: 250, hide: 200 }}
                overlay={renderTooltip(
                  car.description,
                  car.carBrand + " " + car.carName
                )}
              >
                <h5 className="card-title">
                  {car.carBrand + " " + car.carName}
                </h5>
              </OverlayTrigger>
              <p
                style={{ fontSize: "14px", marginLeft: "4px" }}
                className="card-text text-secondary"
              >
                <small className="card-title">
                  {car.fuelType}&nbsp;&nbsp;
                  <FaCircle className="mb-1" style={{ fontSize: "5px" }} />
                  &nbsp;&nbsp;{car.transmission}
                </small>
              </p>
              <p className="card-text">
                <p className="text-body-secondary">
                  {formatPrice(car.carPrice) + " Lakh*"}
                </p>
              </p>
            </div>
          </div>
          <p className="col-md-1 text-secondary text-end p-2">
            <FaTimes
              onClick={() => removeFromFavHandle(car.newCarId)}
              style={{ cursor: "pointer" }}
            />
          </p>
        </div>
      ))}
      {showAlert && <AlertPopup message="Car removed from your collection!" />}
    </>
  );
}
export default WishList;

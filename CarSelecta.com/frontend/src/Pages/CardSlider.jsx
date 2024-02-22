import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Card } from "react-bootstrap";
import Card1 from "../Images/card1.webp";
import Card2 from "../Images/card2.webp";
import Card3 from "../Images/card3.webp";
import Card4 from "../Images/card4.webp";
import Card5 from "../Images/card5.webp";
import Card6 from "../Images/card6.webp";
import { useEffect, useState } from "react";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { Link } from "react-router-dom";
import { FaCircle, FaRegHeart } from "react-icons/fa";
import Cookies from "js-cookie";
import AlertPopup from "./AlertPopup";
import axios from "axios";

const CardSlider = ({ cars }) => {
  const [showAlert, setShowAlert] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isVerticalMode = windowWidth < 768;

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
      <Splide
        className="d-flex p-5 m-5 justify-content-center "
        options={{
          type: "loop",
          perPage: 4,
          perMove: 1,
          autoplay: {
            delay: 100,
          },
          //   wheel: true,
          pauseOnHover: true,
          speed: 800,
          drag: "free",
          easing: "cubic-bezier(0.645, 0.045, 0.355, 1)",
          keyboard: true,
          direction: isVerticalMode ? "ttb" : "ltr", // "ttb" for top-to-bottom
          height: isVerticalMode ? 1000 : undefined,
        }}
      >
        {cars.map((car) => (
          <SplideSlide className="p-4  d-flex justify-content-center align-items-center" key={car.newCarId}>
            <Link
              as={Link}
              state={{ value: car.newCarId }}
              to={"/carpreview"}
              className="text-decoration-none text-secondary "
            >
              <Card
                className="hover-element  overflow-hidden "
                style={{ width: "18rem" }}
              >
                <Card.Img
                  variant="top"
                  src={`data:image/jpeg;base64,${car.carImage}`}
                />
                <Card.Body style={{ width: "18rem" }} className="textContent">
                  <Card.Title>{car.carBrand + " " + car.carName}</Card.Title>
                  <Card.Text className="fs-5 mb-0 mt-0">
                    <strong>{formatPrice(car.carPrice)} Lakh</strong>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </SplideSlide>
        ))}
      </Splide>
      {showAlert && <AlertPopup message="Car Added to your collection!" />}
    </>
  );
};

export default CardSlider;

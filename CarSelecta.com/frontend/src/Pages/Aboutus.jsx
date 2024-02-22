import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./aboutus.css";
import aboutus from "../Images/aboutus.jpg";
import Navigationbar from "./Navigationbar";

function AboutUs() {
  const founders = [
    { name: "Anand", description: "Co-founder" },
    { name: "Anuj", description: "Co-founder" },
    { name: "Jayesh", description: "Co-founder" },
    { name: "Kunal", description: "Co-founder" },
    { name: "Minal", description: "Co-founder" },
    { name: "Praveenkumar", description: "Co-founder" },
  ];

  const shapeStyles = {
    width: "50px",
    height: "50px",
    margin: "0 auto",
    backgroundColor: "#2ecc71",
  };

  return (
    <>
      <Navigationbar />
      <div class="card mb-3" style={{ maxWidth: "1540px" }}>
        <div class="row g-0">
          <div class="col-md-7">
            <img
              src={aboutus}
              class="img-fluid rounded-start w-100"
              alt="..."
            />
          </div>
          <div class="col-md-5">
            <div class="card-body">
              <h5 class="card-title">About Carselecta</h5>
              <p class="card-text">
                CarSelecta.com is a leading car search venture that empowers
                users to make informed decisions when purchasing cars. Our
                platform is dedicated to providing comprehensive automotive
                information to assist users in finding the perfect vehicle that
                suits their preferences, needs, and budget. With an extensive
                collection of expert reviews, detailed specifications, pricing
                details, side-by-side comparisons, immersive videos, and an
                extensive gallery of images, we ensure that our users have
                access to all the necessary information they need to make the
                right choice. Whether you're looking for a sleek and stylish
                sedan, a rugged SUV, an eco-friendly hybrid, or a
                high-performance sports car, CarSelecta.com offers an
                unparalleled resource to explore and evaluate various car brands
                and models. Our user-friendly interface and intuitive search
                filters simplify the car-buying journey, making it an enjoyable
                experience for both car enthusiasts and casual buyers.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* <div className="row">
          <div className="col-md-4 mb-4">
            
            <div className="big-square-card">
              
              <img src={aboutus} alt="" />
            </div>
          </div>
          <div className="col-md-8">
            <h1 className="mt-4 mb-4">About CarSelecta</h1>
            <p className="lead" style={{ fontSize: "18px" }}>
              CarSelecta.com is a leading car search venture that empowers users
              to make informed decisions when purchasing cars. Our platform is
              dedicated to providing comprehensive automotive information to
              assist users in finding the perfect vehicle that suits their
              preferences, needs, and budget. With an extensive collection of
              expert reviews, detailed specifications, pricing details,
              side-by-side comparisons, immersive videos, and an extensive
              gallery of images, we ensure that our users have access to all the
              necessary information they need to make the right choice. Whether
              you're looking for a sleek and stylish sedan, a rugged SUV, an
              eco-friendly hybrid, or a high-performance sports car,
              CarSelecta.com offers an unparalleled resource to explore and
              evaluate various car brands and models. Our user-friendly
              interface and intuitive search filters simplify the car-buying
              journey, making it an enjoyable experience for both car
              enthusiasts and casual buyers. Our team of passionate car
              aficionados is dedicated to curating accurate and up-to-date
              information, ensuring that you stay well-informed about the latest
              developments in the automotive industry. At CarSelecta, we believe
              that buying a car should be an exciting and confident decision,
              and we're here to guide you every step of the way.
            </p>
            
          </div>
        </div> */}

        <div className="row mt-5">
          {founders.map((founder, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card">
                <div className="card-body">
                  <div style={shapeStyles}></div>
                  <h5 className="card-title">{founder.name}</h5>
                  <p className="card-text">{founder.description}</p>
                  <hr />
                  {/* Add additional information about the founder if needed */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AboutUs;

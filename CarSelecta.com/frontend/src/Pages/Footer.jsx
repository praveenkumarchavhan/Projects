import React from "react";
import "./Footer.css";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
const Footer = () => {
  return (
    <footer>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <hr />
          {/* Main footer content code */}
          <div className="col-md-4">
            <ul type="none">
              <li className="lightb">ABOUT CARDEKHO</li>
              <li>About</li>
              <li>Careers With Us</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Corporate Policies</li>
              <li>Investors</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div className="col-md-4">
            <ul type="none">
              <li className="lightb">CONNECT WITH US</li>
              <li>Feedback</li>
              <li>Contact Us</li>
              <li>Advertise with Us</li>
            </ul>
          </div>
          <div className="col-md-4">
            <ul type="none">
              <li className="lightb">OTHERS</li>
              <li>Health Insurance</li>
              <li>Term life insurance</li>
              <li>Crack-Ed</li>
              <li>Personal loan</li>
              <li>TyreDekho</li>
              <li>BatteryDekho</li>
            </ul>
          </div>
        </div>
        {/* Code after horizontal line */}
        <hr />
        <div className="row">
          <div className="col-md-6">
            <p>© 2023 carselecta-frontend</p>
          </div>

          <div className="col-md-6">
            <span className="icon">
              <span className="connect"> Connect: </span>
              &nbsp;
              <a href="#" className="me-4">
                <FaFacebook/>
              </a>
              <a href="#" className="me-4">
                <FaTwitter/>
              </a>
              <a href="#" className="me-4">
                <FaYoutube/>
              </a>
              <a href="#" className="me-4">
                <FaInstagram/>
              </a>
              <a href="#" className="me-4">
                <FaLinkedinIn/>
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

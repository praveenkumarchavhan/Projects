import React from "react";
import ReactDOM from "react-dom/client";
import Carousel from "better-react-carousel";
import "./style.css";
import { toBePartiallyChecked } from "@testing-library/jest-dom/matchers";
function Footer1() {
    return (
      <div className="container fas fa-car-side fa-3x" ata-mdb-toggle="animation"
      data-mdb-animation="drop-in"
      data-mdb-animation-start="onScroll"
   data-mdb-animation-on-scroll="repeat">
          
        <div className="row">
          <div className="col footer-pt aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
          <div className="pb-2 mb-4 pt-3 footer_title text-uppercase">
                    <h5>Centers</h5>
                    <hr></hr>
                  </div>
                  <ul className="pb-4">
                     <li><a href="/index.aspx?id=BL" style={{textDecorationLine:"none"}} className="tab-link-text link-dark">Bengaluru </a></li>
                    <li><a href="/index.aspx?id=CH" style={{textDecorationLine:"none"}} className="tab-link-text link-dark">Chennai </a></li>
                    <li><a href="/index.aspx?id=DL" style={{textDecorationLine:"none"}} className="tab-link-text link-dark">Delhi</a></li>
                    <li><a href="/index.aspx?id=HY" style={{textDecorationLine:"none"}} className="tab-link-text link-dark">Hyderabad </a></li>
                    <li><a href="/index.aspx?id=KL" style={{textDecorationLine:"none"}} className="tab-link-text link-dark">Kolkata</a></li>
                    <li><a href="/index.aspx?id=ML" style={{textDecorationLine:"none"}} className="tab-link-text link-dark">Mohali</a></li>
                    <li><a href="/index.aspx?id=MB" style={{textDecorationLine:"none"}} className="tab-link-text link-dark">Mumbai</a></li>
                    <li><a href="/index.aspx?id=ND" style={{textDecorationLine:"none"}} className="tab-link-text link-dark">Noida </a></li>
                    <li><a href="/index.aspx?id=PT" style={{textDecorationLine:"none"}} className="tab-link-text link-dark">Patna </a></li>
                    <li><a href="/index.aspx?id=PN" style={{textDecorationLine:"none"}} className="tab-link-text link-dark">Pune </a></li>
                    <li><a href="/index.aspx?id=SL" style={{textDecorationLine:"none"}} className="tab-link-text link-dark">Silchar</a></li>
                    <li><a href="/index.aspx?id=TVM" style={{textDecorationLine:"none"}} className="tab-link-text link-dark">Thiruvananthapuram</a></li>
                  </ul>
          
          </div>
  
  
  
          <div className="col footer-pt aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
          <div className="pb-2 mb-4 pt-3 footer_title text-uppercase">
                    <h5>Links</h5>
                    <hr></hr>
                  </div>
                  <ul className="pb-4">
                    <li><a href="/index.aspx?id=about" style={{textDecorationLine:"none"}} className="tab-link-text link-dark">About Us</a></li>
                    <li><a href="/index.aspx?id=products_services" style={{textDecorationLine:"none"}} className="tab-link-text link-dark">Products &amp; Services</a></li>
                    <li><a href="/index.aspx?id=research" style={{textDecorationLine:"none"}} className="tab-link-text link-dark">R&amp;D </a></li>
                    <li><a href="/index.aspx?id=career" style={{textDecorationLine:"none"}} className="tab-link-text link-dark">Careers</a></li>
                    <li><a href="/index.aspx?id=tenders" style={{textDecorationLine:"none"}} className="tab-link-text link-dark">Tenders</a></li>
                    <li><a href="/index.aspx?id=news" style={{textDecorationLine:"none"}} className="tab-link-text link-dark">Press Kit</a></li>
                    <li><a href="/index.aspx?id=audiov" style={{textDecorationLine:"none"}} className="tab-link-text link-dark">Video Gallery</a></li>
                    <li><a href="/index.aspx?id=events" style={{textDecorationLine:"none"}} className="tab-link-text link-dark">Events</a></li>
                    <li><a href="/index.aspx?id=Awards" style={{textDecorationLine:"none"}} className="tab-link-text link-dark">Awards</a></li>
                    <li><a href="/index.aspx?id=download" style={{textDecorationLine:"none"}} className="tab-link-text link-dark">Downloads</a></li>
                    <li><a href="/index.aspx?id=cdac_achievements" style={{textDecorationLine:"none"}} className="tab-link-text link-dark">Achievements</a></li>
                    <li><a href="/index.aspx?id=alliance"style={{textDecorationLine:"none"}}  className="tab-link-text link-dark">Alliance</a></li>
                    
                  </ul>
          </div>
  
  
  
  
  
  
          <div className="col footer-pt aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
          <div className="pb-2 mb-4 pt-3 footer_title text-uppercase">
                    <h5>Contact Us</h5>
                    <hr></hr>
                  </div>
                  <div className="pb-4">
                    <a href="https://goo.gl/maps/Ee1Yg7QBgMSqbTat9" onClick="return external_link();" target="_blank"><img src="https://www.cdac.in/img/map.jpg" className="img-fluid border w-100 shadow"/></a>
                    <p className="py-3"/> <strong>Centre for Development of Advanced Computing</strong><br/>
                      <strong>C-DAC Innovation Park</strong>,<br/>
                      Panchavati, Pashan,
                      Pune - 411 008, Maharashtra (India)<br/>
                      Phone: +91-20-25503100<br/>
                      Fax: +91-20-25503131
                    <p/>
                    <br/>
                  <div>
          </div>
  
        </div>
      </div>
      </div>
      </div>
  
      
    );
  }
  export default Footer1;
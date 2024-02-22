import React from 'react';


const Carousel = () => {
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner container-fluid">
        <div className="carousel-item active">
        <img
            src={require('./index-PhotoRoom.png')}
            className="d-block w-100 img-fluid"
            alt="..."
           
            />
        <div className="char">
          <p style={{ height:600 }}></p>
        </div>
        <div class="carousel-captions d-none d-md-block order-2">       
         
        </div>
        </div>
       
        <div className="carousel-item">
          <img
           src={require('./index1.jpg')}
            className="d-block w-100 img-fluid"
            alt="..."
           
          />
          <div className="char">
            <p style={{ height:600 }}></p>
          </div>
          
        </div>
        <div className="carousel-item">
          <img
            src={require('./index2.jpg')}
            className="d-block w-100 img-fluid"
            alt="..."
          />
          <div className="char">
            <p style={{ height:600 }}></p>
          </div>
        </div>
      </div>
     
    </div>
  );
}
export default Carousel;
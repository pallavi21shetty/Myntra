import React from 'react';

const Carousel = () => {
  return (
    <div id="carouselExampleRide" className="carousel slide" data-bs-ride="true">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="https://morecustomersapp.com/wp-content/uploads/2020/08/banner-and-eCommerce.jpg" className="d-block w-100" alt="Slide 1" style={{maxHeight:"650px"}} />
        </div>
        <div className="carousel-item">
          <img src="https://img.freepik.com/free-psd/banner-template-online-shopping_23-2148559048.jpg" className="d-block w-100" alt="Slide 2"  style={{maxHeight:"650px"}}/>
        </div>
        <div className="carousel-item">
          <img src="https://img.freepik.com/premium-vector/online-shop-ads-banner-template_653829-12.jpg" className="d-block w-100" alt="Slide 3"  style={{maxHeight:"650px"}}/>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;

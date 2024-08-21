import React from "react";
import Image1 from "../assets/home/carousel-img-1.webp";
import Image2 from "../assets/home/carousel-img-2.webp";
import Image3 from "../assets/home/carousel-img-3.webp";
import "./Carousel.css";

const Carousel = () => {
  return (
    <div className="image-grid">
      <img src={Image1} alt="Carousel Image 1" className="carousel-image" />
      <img src={Image2} alt="Carousel Image 2" className="carousel-image" />
      <img src={Image3} alt="Carousel Image 3" className="carousel-image" />
    </div>
  );
};

export default Carousel;

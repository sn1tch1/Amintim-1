import React from "react";
import Image1 from "../assets/home/carousel-img-1.webp";
import Image2 from "../assets/home/carousel-img-2.webp";
import Image3 from "../assets/home/carousel-img-3.webp";
import "./Carousel.css";

const Carousel = () => {
  return (
    <div className="image-grid debug-border">
      <img src={Image1} alt="Carousel Image 1" className="carousel-image debug-border" />
      <img src={Image2} alt="Carousel Image 2" className="carousel-image debug-border" />
      <img src={Image3} alt="Carousel Image 3" className="carousel-image debug-border" />
    </div>
  );
};

export default Carousel;

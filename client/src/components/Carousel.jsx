import React from "react";
import Image1 from "../assets/home/carousel-img-1.webp";
import Image2 from "../assets/home/carousel-img-2.webp";
import Image3 from "../assets/home/carousel-img-3.webp";
import { FaArrowRight } from "react-icons/fa"; // Import arrow icon
import { IoIosArrowForward } from "react-icons/io"; // Import arrow icon
import "./Carousel.css";

const Carousel = () => {
  return (
    <div className="image-grid debug-border">
      <div className="carousel-item debug-border">
        <div className="image-container debug-border">
          <img
            src={Image1}
            alt="Carousel Image 1"
            className="carousel-image debug-border"
          />
          <p className="image-caption debug-border">Scaneaza codul QR</p>
        </div>
      </div>
      <IoIosArrowForward className="arrow-icon debug-border" />
      <div className="carousel-item debug-border">
        <img
          src={Image2}
          alt="Carousel Image 2"
          className="carousel-image debug-border"
        />
        <p className="image-caption debug-border">Create Profile</p>
      </div>

      <IoIosArrowForward className="arrow-icon debug-border" />
      <div className="carousel-item debug-border">
        <div className="image-container debug-border">
        <img
          src={Image3}
          alt="Carousel Image 3"
          className="carousel-image debug-border"
        />
        <p className="image-caption debug-border">Share Memories</p>
          </div>
      </div>
    </div>
  );
};

export default Carousel;

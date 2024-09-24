import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const testimonials = [
  {
    name: "Michael Hofmann",
    rating: 5,
    message:
      "I came across this QR code on TikTok and I have to say, it's a nice way to preserve and share memories.",
  },
  {
    name: "Andreas Richter",
    rating: 5,
    message:
      "I was skeptical at first, but the soul star convinced me. The ease of use and the ability to keep my mother's memory alive are priceless.",
  },
  {
    name: "Lena Bauer",
    rating: 5,
    message:
      "After losing my partner, I often felt alone. The soul star helped me to preserve the beautiful moments and share them with others, even with people with whom I had not had much contact before.",
  },
];

const NextArrow = ({ onClick }) => {
  return (
    <div className="custom-arrow next-arrow" onClick={onClick}>
      <span className="arrow-text">
        <FaChevronRight size={20} />
      </span>
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div className="custom-arrow prev-arrow" onClick={onClick}>
      <span className="arrow-text">
        <FaChevronLeft />
      </span>
    </div>
  );
};

const HappyCustomersCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    afterChange: (current) => setCurrentSlide(current),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    setTotalSlides(testimonials.length);
  }, []);

  return (
    <div className="my-8 px-4 relative">
      <h2 className="text-3xl font-bold text-center mb-4">Happy customers</h2>
      <p className="text-center mb-8">
        Our goal is to have satisfied customers. We are committed to responding
        to the wishes of every customer and constantly improving our service.
      </p>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-4">
            <div className="bg-gray-100 p-6 rounded shadow">
              <div className="mb-4">
                {[...Array(testimonial.rating)].map((star, i) => (
                  <span key={i} className="text-yellow-500">
                    &#9733;
                  </span>
                ))}
              </div>
              <h3 className="font-bold mb-2">{testimonial.name}</h3>
              <p className="font-[300] text-gray-800">{testimonial.message}</p>
            </div>
          </div>
        ))}
      </Slider>
      <div className="flex items-center mt-4">
        <div className="flex-grow">
          <div
            style={{
              width: `${((currentSlide + 1) / totalSlides) * 100}%`,
              height: "2px",
              backgroundColor: "black",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HappyCustomersCarousel;

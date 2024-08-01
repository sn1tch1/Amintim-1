import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import Image1 from "../assets/home/carousel-img-1.webp";
import Image2 from "../assets/home/carousel-img-2.webp";
import Image3 from "../assets/home/carousel-img-3.webp";
import "./Carousel.css";

const Carousel = () => {
  return (
    <Swiper
      effect={"cards"}
      grabCursor={true}
      modules={[EffectCards, Navigation]}
      className="mySwiper"
      navigation
    >
      <SwiperSlide className="">
        <div className="relative h-[311.82px] w-[224.55px] rounded-[9.14px] ">
          <div
            className="h-full w-full rounded-[9.14px]"
            style={{
              backgroundImage: `url(${Image1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="">
        <div className="relative h-[311.82px] w-[224.55px] rounded-[9.14px] ">
          <div
            className="h-full w-full rounded-[9.14px]"
            style={{
              backgroundImage: `url(${Image2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="">
        <div className="relative h-[311.82px] w-[224.55px] rounded-[9.14px] ">
          <div
            className="h-full w-full rounded-[9.14px]"
            style={{
              backgroundImage: `url(${Image3})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;

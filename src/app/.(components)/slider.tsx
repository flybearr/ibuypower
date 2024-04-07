"use client";
import React from "react";
import Image from "next/image";

import data from "./mock/data.json";
import { debounce } from "lodash";
import { useState } from "react";

interface Data {
  pc: {
    name: string;
    system: string;
    cpu: string;
    gpu: string;
    ssd: string;
    ram: string;
    src: string;
    discount: number;
    price: number;
  }[];
}

const padding = 15;
const cardWidth = 350;
const pc: Data["pc"] = data?.pc;
const containerWidth = pc.length * (cardWidth + padding);

const Slider: React.FC = () => {
  const displayPic = 4;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const goToPrevSlide = () => {
    const newIndex = (currentIndex - 1 + pc.length) % pc.length;
    if (currentIndex === 0) return;
    setCurrentIndex(newIndex);
    setIsActive(!isActive);
  };

  const goToNextSlide = () => {
    const newIndex = (currentIndex + 1) % pc.length;
    if (currentIndex + displayPic === pc.length) return;
    setCurrentIndex(newIndex);
    setIsActive(!isActive);
  };

  const debouncedGoToPrevSlide = debounce(goToPrevSlide, 160);
  const debouncedGoToNextSlide = debounce(goToNextSlide, 160);
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return;
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!startX || !isDragging) return;
    const deltaX = e.clientX - startX;
    const threshold = 50; // Adjust this value as needed
    if (deltaX > threshold) {
      goToPrevSlide();
      setStartX(null);
      setIsDragging(false);
    } else if (deltaX < -threshold) {
      goToNextSlide();
      setStartX(null);
      setIsDragging(false);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging) return;
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!startX || !isDragging) return;
    const deltaX = e.touches[0].clientX - startX;
    const threshold = 50; // Adjust this value as needed
    if (deltaX > threshold) {
      goToPrevSlide();
      setStartX(null);
      setIsDragging(false);
    } else if (deltaX < -threshold) {
      goToNextSlide();
      setStartX(null);
      setIsDragging(false);
    }
  };

  // const goToPrevSlide = () => {
  //   const newIndex = (currentIndex - 1 + pc.length) % pc.length;
  //   if (currentIndex === 0) return;
  //   setCurrentIndex(newIndex);
  // };

  // const goToNextSlide = () => {
  //   const newIndex = (currentIndex + 1) % pc.length;
  //   if (currentIndex + displayPic === pc.length) return;
  //   setCurrentIndex(newIndex);
  // };

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">Best Selling Gaming PC</h1>
        <h2 className="text-2xl font-bold">Prebuilt & Custom</h2>
      </div>
      <div className="flex justify-end gap-5 mb-5">
        <button
          className={`w-10 h-10  rounded-full text-black bg-gray-300  z-10 
           ${
             currentIndex === 0
               ? ""
               : "active:text-white active:bg-black  lg:hover:text-white lg:hover:bg-black   "
           } `}
          style={currentIndex === 0 ? { opacity: 0.3, cursor: "default" } : {}}
          onClick={debouncedGoToPrevSlide}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button
          className={`w-10 h-10  rounded-full text-black bg-gray-300  z-10 
          ${
            currentIndex === pc.length - displayPic
              ? ""
              : " active:text-white active:bg-black lg:hover:text-white lg:hover:bg-black "
          } `}
          style={
            currentIndex === pc.length - displayPic
              ? { opacity: 0.3, cursor: "default" }
              : {}
          }
          onClick={debouncedGoToNextSlide}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
      <div
        className={`w-[385px] md:relative overflow-hidden mx-auto md:w-[750px] xl:w-[1445px] lg:w-[1100px] sm:w-[385px]`}
      >
        <div
          className={` flex transition-transform duration-500 ease-in-out`}
          style={{
            width: containerWidth,
            transform: `translateX(-${
              currentIndex * padding + currentIndex * cardWidth
            }px)`,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {pc.map((data: any, index: number) => {
            return (
              <div
                key={index}
                style={{
                  padding: `0 ${padding}px`,
                  marginLeft: `-${padding}px`,
                }}
              >
                <div
                  className={`rounded-xl border border-gray-300 overflow-hidden `}
                  style={{ width: `${cardWidth}px` }}
                >
                  <div className="p-5 pb-7">
                    <div className="flex justify-center w-full select-none relative">
                      <Image
                        src={data.src}
                        alt={`Slide ${index + 1}`}
                        width={200}
                        height={300}
                      />
                      <div className="absolute top-[-10] left-0 rounded-full border border-gray-400 py-[0.5] px-2 flex justify-center items-center">
                        <span className="text-[9px] font-semibold text-gray-500">
                          {data?.custom ? "Custom PC" : "Prebuilt PC"}
                        </span>
                      </div>
                    </div>
                    <h4 className=" mb-12 text-md font-extrabold cursor-pointer hover:text-red-500">
                      {data.name}
                    </h4>
                    <div className="flex flex-col gap-1 font-normal text-xs xl:text-sm">
                      <p>{data.system}</p>
                      <p>{data.cpu}</p>
                      <p>{data.gpu}</p>
                      <p>{data.ssd}</p>
                      <p>{data.ram}</p>
                    </div>
                  </div>
                  <div className="p-5  bg-blue-50 select-none">
                    <div className="bg-blue-50 flex flex-col">
                      <div className="w-[80px] rounded-full bg-red-500 flex justify-center items-center text-white text-[10px] py-1 px-2 mb-3">
                        <span>SAVE $${data.discount}</span>
                      </div>
                      <div className="flex gap-3 items-center">
                        <p className="text-[20px] font-black">
                          ${data.price - data.discount}
                        </p>
                        <span className="text-gray-400 text-xs line-through">
                          ${data.price}
                        </span>
                      </div>
                      <div className="flex items-center mt-[-7px] mb-3">
                        <p className="text-xs">
                          Starting at
                          <span className="text-blue-400 "> $118/mo</span> with
                        </p>
                        <Image
                          src={"/images/icon-affirm.svg"}
                          alt={`Slide ${index + 1}`}
                          width={40}
                          height={40}
                          className="translate-y-[-2px]"
                        ></Image>
                      </div>
                      <div className="flex flex-col justify-between gap-5 md:flex-row">
                        <div>
                          <p className="text-xs font-medium">Free Shopping</p>
                          <p className="text-xs">Delivery By Tuesday Apr 9</p>
                        </div>
                        <div className="">
                          <button className="text-[15px] text-red-500 mr-2 py-1 px-3 rounded-full border border-red-500 hover:bg-red-500 hover:text-white">
                            {data?.custom ? "Customize" : "Buy Now"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Slider;

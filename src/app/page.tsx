/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState } from "react";
import Head from "next/head";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LogoLogin } from "../../public/icon/form";
import styled from "styled-components";

import SingInComponent from "./signin/page";
import SingUpComponent from "./signup/page";


export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => {
    setIsLogin(true);
  };

  const toggleSignup = () => {
    setIsLogin(false);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <div className="overflow-hidden">
      <Head>
        <title>หน้าแรก</title>
        <meta name="description" content="หน้าแรกของเว็บไซต์" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative w-full h-full">
        <StyledSlider {...settings} className="relative w-full h-screen">
          <div className="w-full h-screen">
            <img src="/Rectangle.svg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="w-full h-screen">
            <img src="/Rectangle1.svg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="w-full h-screen">
            <img src="/Rectangle2.svg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </StyledSlider>
        <div
          className="absolute top-0 right-0 bottom-0 flex justify-center items-center bg-white bg-opacity-50"
          style={{
            background: 'linear-gradient(110.34deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.06) 100%)',
            boxShadow: '0px 8.6926px 43.463px rgba(0, 0, 0, 0.25)',
            backdropFilter: 'blur(32.5972px)',
            width:'100%',
            maxWidth:'40rem'
          }}
        >
          <div className="">
            <div className="flex justify-center">
              <LogoLogin />
            </div>
            <div className="flex">
              <div
                className={`flex justify-center items-center font-bold w-full relative top-50 border-tl-16 font-semibold text-black cursor-pointer text-xl font-bold ${isLogin ? 'z-10' : 'z-10'}`}
                onClick={toggleLogin}   
                style={{
                  height:"50px",
                  top: 50,
                }}
              >
                Log In
              </div>
              <div
                className={`flex justify-center items-center font-bold w-full relative top-50 border-tl-16 font-semibold text-black cursor-pointer text-xl font-bold ${isLogin ? 'z-10' : 'z-10'}`}
                onClick={toggleSignup}
                style={{
                  height:"50px",
                  top: 50,
                }}
              >
                Sign Up
              </div>
            </div>

            {isLogin ? (
              <SingInComponent />
            ) : (
              <SingUpComponent />
            )}

          </div>
        </div>
      </div>
      <footer></footer>
    </div>
  );
}


const StyledSlider = styled(Slider)`
  ul {
  }
  .slick-dots {
    bottom: 10%;
  }
  .slick-dots li {
    margin-right: 15px;
    background: rgba(255, 255, 255, 0.5);
    width: 16px;
    height: 16px;
    transform: rotate(45deg);
  }

  .slick-dots li button {
    background: transparent;
    border: none;
    width: 20px;
    height: 20px;
  }

  .slick-dots li.slick-active {
    background: #D9D9D9;
    width: 20px;
    height: 20px;
  }
  .slick-dots li button:before{
  font-size:0px;
  }
`;
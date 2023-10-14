"use client"
import React, { useState, useEffect, useRef } from "react";
import "../Styles/footer.css";
import arrow from '../img/up-arrow-alt-regular-24.png'
import Image from 'next/image'


const Footer = () => {
  const scroll = useRef();
  const [scrollUp, setScrollUp] = useState(0);
  const [sections, setSections] = useState([]);
  useEffect(() => {
    const handleScroll = () => {
      setScrollUp(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  useEffect(() => {
    if (scrollUp>= 350) {
      scroll.current.classList.add("show-scroll");
    } else {
      scroll.current.classList.remove("show-scroll");
    }
  }, [scrollUp]);

  const goTop = ()=>{
    if(window !== undefined){
      window.scroll(0,0)
    }
  }

  return (
    <div>
      <footer className="footer">
        <div className="footer_wrapper">
          <div className="info_list" data-aos="fade-up-right">
            <p>Our information</p>
            <ul>
              <li>1234 - Peru</li>
              <li>La Libertad 43210</li>
              <li>123-456-789</li>
            </ul>
          </div>
          <div className="about_list" data-aos="fade-up-right">
            <p>About Us</p>
            <ul>
              <li>Support Center</li>
              <li>Customer Support</li>
              <li>About Us</li>
              <li>Copy Right</li>
            </ul>
          </div>
          <div className="products_list" data-aos="fade-up-left">
            <p>Products</p>
            <ul>
              <li>Road bikes</li>
              <li>Mountain bikes</li>
              <li>Electric</li>
              <li>Accesories</li>
            </ul>
          </div>
          <div className="socials" data-aos="fade-up-left">
            <p>Socials</p>
            <div className="social_icons">
              <i className="bx bxl-facebook"></i>
              <i className="bx bxl-twitter"></i>
              <i className="bx bxl-instagram"></i>
            </div>
          </div>
        </div>
      </footer>
      <div className="hr_foot_name">
      <hr className="hr_foot" />
      </div>
      <div className="name_wrapper">
        <h1 className="code_name">&#169; GoldexcoolCodes. All rights reserved</h1>
      </div>

      <div className="scrollup" id="scroll-up" onClick={goTop} ref={scroll} >
        <Image src={arrow} alt="" width={30} height={30} className="scrollup__icon"/>
      </div>
    </div>
  );
};

export default Footer;

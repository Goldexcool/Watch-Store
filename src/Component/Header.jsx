/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import "../Styles/navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { cartUiActions } from "../store/shopping-cart/cartUiSlice";
// import { useRouter } from "next/navigation";
import {
  auth,
  googleProvider,
  githubProvider,
} from "../../Firebase/initFirebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import initFirebase from "../../Firebase/initFirebase";
import profile from "../img/3135715.png";
import { Router } from "next/router";

const Header = () => {
  const header = useRef();
  const themeButton = useRef();
  const theme = useRef();
  const cart = useRef();
  const grid = useRef();
  const navMenu = useRef();
  const [scrollY, setScrollY] = useState(0);
  const dispatch = useDispatch();

  const [isScrolling, setIsScrolling] = useState(false);


  const hamburger = () => {
    setHamMenu(!hamMenu);
  };

 

  // check if local storage is avilable
  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;
  const [selectedTheme, setSelectedTheme] = useState(
    isLocalStorageAvailable
      ? localStorage.getItem("selected-theme") || "light"
      : null
  );
  const [selectedIcon, setSelectedIcon] = useState(
    isLocalStorageAvailable
      ? localStorage.getItem("selected-icon") || "bx-moon"
      : null
  );

  const darkTheme = "dark-theme";
  const iconTheme = "bx-sun"; // Without specific icon class

  const getCurrentTheme = useCallback(() => (selectedTheme === "dark" ? "dark" : "light"));
  const getCurrentIcon = () =>
    selectedIcon === "bx bx-sun" ? "bx bx-sun" : "bx bx-moon";

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
        darkTheme
      );
      themeButton.current.classList[
        selectedIcon === "bx bx-sun" ? "add" : "remove"
      ](iconTheme);
    }
  }, [selectedTheme, selectedIcon, darkTheme, iconTheme]);

  const handleButtonClick = () => {
    setSelectedTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark"
    );
    setSelectedIcon((currentIcon) =>
      currentIcon === "bx bx-sun" ? "bx bx-moon" : "bx bx-sun"
    );
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selected-theme", getCurrentTheme());
      localStorage.setItem("selected-icon", getCurrentIcon());
    }
  }, [selectedTheme, selectedIcon]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  useEffect(() => {
    const isDarkMode = getCurrentTheme() === "dark";
    const cartIcon = cart.current;
    const moonIcon = themeButton.current;
    const gridIcon = grid.current;
  
    if (scrollY >= 50) {
      header.current.classList.add("scroll-header");
      moonIcon.classList.add("moon_hh");
  
      // Toggle cart styles based on theme
      if (isDarkMode) {
        cartIcon.style.color = "white";
        moonIcon.style.color = "white";
        gridIcon.style.color = "white";
      } else {
        cartIcon.style.color = "black";
        moonIcon.style.color = "black";
        gridIcon.style.color = "black";
      }
  
      grid.current.classList.add("grid_alt");
    } else {
      header.current.classList.remove("scroll-header");
      moonIcon.classList.remove("moon_hh");
  
      // Reset styles when not scrolled
      if (isDarkMode && !isScrolling) {
        cartIcon.style.color = "black"; // Dark in dark mode without scrolling
        moonIcon.style.color = "black"; // Dark in dark mode without scrolling
        gridIcon.style.color = "black"; // Dark in dark mode without scrolling
      } else {
        cartIcon.style.color = isDarkMode ? "white" : "black";
        moonIcon.style.color = isDarkMode ? "white" : "black";
        gridIcon.style.color = isDarkMode ? "white" : "black";
      }
  
      grid.current.classList.remove("grid_alt");
    }
  }, [scrollY, getCurrentTheme, isScrolling]);


  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsScrolling(true);
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  useEffect(() => {
    // Reset isScrolling after a brief delay (adjust the delay as needed)
    const scrollTimeout = setTimeout(() => {
      setIsScrolling(false);
    }, 200);
  
    return () => clearTimeout(scrollTimeout);
  }, [scrollY]);

  
  
  

  const ToggleCart = () => {
    dispatch(cartUiActions.toggle());
  };
  const totalQuantity = useSelector((state) => state.cart.totalQuantity ?? 0);

  const navToggle = () => {
    navMenu.current.classList.toggle("show-menu");
  };
  return (
    <div>
      <header className="header" ref={header}>
        <nav className="navbar">
          <div className="header_wrapper" ref={navMenu}>
            <div className="image_fav">
              <i className="bx bxs-watch watch_header"></i>
              <h1 className="rolex">Rolex</h1>
            </div>
            <div className="header_list">
              <ul>
                <li>Home</li>
                <li>Featured</li>
                <li>Products</li>
                <li>New</li>
              </ul>
            </div>
          </div>
          <div className="icon_header">
            <i
              className="bx bx-moon moon_h moon_hh"
              ref={themeButton}
              onClick={handleButtonClick}
            ></i>
            <div className="grid_menu" onClick={navToggle} ref={grid}>
              <i className="bx bx-grid-alt grid_alt"></i>
            </div>
            <div>
              <i className="bx bx-cart cart_h cart_hh" ref={cart} onClick={ToggleCart}></i>
              <span className="cart__badge">{totalQuantity}</span>
            </div>
          </div>
        </nav>
      </header>

      {/*################################### Hamburger Menu ############################*/}
      <div className="nav__menu" id="nav-menu" ref={navMenu}>
        <ul className="nav__list">
          <li className="nav__item" onClick={navToggle}>
            <a href="#home" className="nav__link active-link">
              Home
            </a>
          </li>
          <li className="nav__item" onClick={navToggle}>
            <a href="#featured" className="nav__link">
              Featured
            </a>
          </li>
          <li className="nav__item" onClick={navToggle}>
            <a href="#products" className="nav__link">
              Products
            </a>
          </li>
          <li className="nav__item" onClick={navToggle}>
            <a href="#new" className="nav__link">
              New
            </a>
          </li>
        </ul>

        <div
          className="nav__close"
          id="nav-close"
          style={{ cursor: "pointer" }}
        >
          <i
            className="bx bx-x close_btn"
            style={{ cursor: "pointer" }}
            onClick={navToggle}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Header;

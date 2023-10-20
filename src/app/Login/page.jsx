"use client";
import React, { useState, useEffect } from "react";
import homeImg from "../../img/home.png";
import "../../Styles/sign.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth, googleProvider,githubProvider } from "../../../Firebase/initFirebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";

const Page = () => {
  const [popUp, setPopUp] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const unRegistered = onAuthStateChanged(auth, (user) => {
      console.log("user", user);
      setUser(user);
      if (user) {
        router.push("/home");
      }
    });

    return () => unRegistered();
  }, [router]);
  const signUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("success");
      setEmail("");
      setPassword("");
    } catch (err) {
      alert(err);
    }
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      if (user) {
        alert("success");
        setEmail("");
        setPassword("");
        router.push("/");
      } else {
        alert("failed");
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className="signup_">
      <div className="signup_wrapper">
        <div className="home_bg">
          <Image src={homeImg} alt="home" width={100} height={100} />
        </div>
        <div className="form_wrapper">
          <div className="header_signup">
            <h1>SIGN In</h1>
            <p>Sign In to get access to the store</p>
            <form>
              <div className="email">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="password">
                <label>Password</label>
                <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}/>
              </div>
            </form>
            <div className="signupbtn">
              <button onClick={signIn}>Sign IN</button>
            </div>
            <div className="google_wrap">
              <div className="google_signup">
                <i className="bx bxl-google"></i>
                <p>Sign in with Google</p>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Page;

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
        router.push("/");
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
  const googleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
      alert("success");
    } catch (err) {
      alert(err);
    }
  };
  const logIn = () => {
    router.push("/Login");
  }
  return (
    <div className="signup_">
      <div className="signup_wrapper">
        <div className="home_bg">
          <Image src={homeImg} alt="home" width={100} height={100} />
        </div>
        <div className="form_wrapper">
          <div className="header_signup">
            <h1>SIGN UP</h1>
            <p>Sign up to get access to the store</p>
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
              <button onClick={signUp}>Sign up</button>
            </div>
            <div className="google_wrap">
              <div className="google_signup" onClick={googleSignUp}>
                <i className="bx bxl-google"></i>
                <p>Sign up with Google</p>
              </div>
            </div>
          </div>
          <div className="acct_">
            <div className="acct_wrap">
          <p>Already have an account? <span className="login" onClick={logIn}>Login</span></p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

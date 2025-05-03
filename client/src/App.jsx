import React, {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Profile from "./components/Profile/Profile"
import Programs from "./components/Programs/Programs";
import About from "./components/About/About";
import Enroll from "./components/Enroll/Enroll";
import Registration from "./components/register/register";
import Login from "./components/Login/Login";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/enroll" element={<Enroll />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/programs" element={<Programs />} />
          <Route exact path="/about-us" element={<About />} />
          <Route exact path="/sign-up" element={<Registration />} />
          <Route exact path="/login" element={<Login />} />
          
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
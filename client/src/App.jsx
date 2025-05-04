import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Profile from "./components/Profile/Profile";
import Programs from "./components/Programs/Programs";
import About from "./components/About/About";
import Enroll from "./components/Enroll/Enroll";
import Registration from "./components/register/register";
import Login from "./components/Login/Login";
import { AuthProvider } from "./context/auth-context";
import ProtectedRoute from "./components/routes/protected-routes"; // Add this import

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className={styles.appContainer}>
          <NavBar />
          <main className={styles.mainContent}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/enroll" element={<ProtectedRoute><Enroll /></ProtectedRoute>} />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route path="/programs" element={<Programs />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/sign-up" element={<Registration />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
























// import React, {useState} from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import styles from "./App.module.css";
// import Home from "./components/Home/Home";
// import NavBar from "./components/NavBar/NavBar";
// import Footer from "./components/Footer/Footer";
// import Profile from "./components/Profile/Profile"
// import Programs from "./components/Programs/Programs";
// import About from "./components/About/About";
// import Enroll from "./components/Enroll/Enroll";
// import Registration from "./components/register/register";
// import Login from "./components/Login/Login";
// import { AuthProvider } from "./context/auth-context";


// const App = () => {
//   return (
//     <>
//     <AuthProvider>
//       <BrowserRouter>
//         <NavBar />
//         <Routes>
//           <Route exact path="/" element={<Home />} />
//           <Route exact path="/enroll" element={<Enroll />} />
//           <Route exact path="/profile" element={<Profile />} />
//           <Route exact path="/programs" element={<Programs />} />
//           <Route exact path="/about-us" element={<About />} />
//           <Route exact path="/sign-up" element={<Registration />} />
//           <Route exact path="/login" element={<Login />} />
          
//         </Routes>
//         <Footer />
//       </BrowserRouter>
//       </AuthProvider>
//     </>
//   )
// }

// export default App
import React, { useState, useEffect } from "react";
import styles from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSun, 
  faMoon, 
  faBook, 
  faUsers, 
  faGraduationCap, 
  faPhone, 
  faBars, 
  faTimes, 
  faChevronDown,
  faChalkboardTeacher,
  faIdCard,
  faSignOutAlt,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle Navbar on Mobile
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // Toggle Dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close Navbar on Resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsOpen(false);
        document.body.style.overflow = 'auto';
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Theme Toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Check for saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${theme === "dark" ? styles.dark : ''}`}>
      <div className={styles.container}>
        <a className={styles.brand} href="/">
          <FontAwesomeIcon icon={faChalkboardTeacher} className={styles.brandIcon} />
          <span>EduCare</span>
        </a>
        
        {/* Mobile Toggle Button */}
        <button 
          className={styles.navToggle} 
          onClick={toggleNavbar}
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </button>
        
        {/* Navbar Links */}
        <div className={`${styles.navCollapse} ${isOpen ? styles.show : ''}`}>
          <ul className={styles.navbarNav}>
            <li className={styles.navItem}>
              <a className={styles.navLink} href="/enroll">
                <FontAwesomeIcon icon={faBook} className={styles.navIcon} />
                <span>Enroll</span>
              </a>
            </li>
            
            <li 
              className={`${styles.navItem} ${styles.dropdown}`}
              onMouseEnter={!isMobile ? () => setDropdownOpen(true) : undefined}
              onMouseLeave={!isMobile ? () => setDropdownOpen(false) : undefined}
            >
              <Link className={styles.navLink} to="/programs">
                <FontAwesomeIcon icon={faGraduationCap} className={styles.navIcon} />
                <span>Programs</span>
              </Link>
            </li>
            
            <li className={styles.navItem}>
              <a className={styles.navLink} href="/about-us">
                <FontAwesomeIcon icon={faPhone} className={styles.navIcon} />
                <span>About Us</span>
              </a>
            </li>

            <li className={styles.navItem}>
              <a className={styles.navLink} href="/profile">
                <FontAwesomeIcon icon={faIdCard} className={styles.navIcon} />
                <span>Profile</span>
              </a>
            </li>

            {/* User Profile or Auth Buttons */}
            {user ? (
              <li className={`${styles.navItem} ${styles.userProfile}`}>
                <div className={styles.userDropdown}>
                  <button 
                    className={styles.userBtn}
                    onClick={toggleDropdown}
                    aria-label="User menu"
                  >
                    <FontAwesomeIcon icon={faUserCircle} className={styles.userIcon} />
                    <span>{user.fname}</span>
                    <FontAwesomeIcon 
                      icon={faChevronDown} 
                      className={`${styles.dropdownIcon} ${dropdownOpen ? styles.rotate : ''}`} 
                    />
                  </button>
                  {dropdownOpen && (
                    <div className={styles.userDropdownMenu}>
                      <Link 
                        to="/profile" 
                        className={styles.dropdownItem}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <FontAwesomeIcon icon={faIdCard} />
                        <span>My Profile</span>
                      </Link>
                      <button 
                        className={styles.dropdownItem}
                        onClick={handleLogout}
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ) : (
              <>
                <li className={`${styles.navItem} ${styles.authItem}`}>
                  <a className={styles.loginBtn} href="/login">
                    Login
                  </a>
                </li>
                <li className={`${styles.navItem} ${styles.authItem}`}>
                  <a className={styles.signupBtn} href="/sign-up">
                    Sign Up
                  </a>
                </li>
              </>
            )}
          </ul>
          
          {/* Theme Toggle */}
          <button 
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;





























// import React, { useState, useEffect } from "react";
// import styles from "./NavBar.module.css";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faSun, 
//   faMoon, 
//   faBook, 
//   faUsers, 
//   faGraduationCap, 
//   faPhone, 
//   faBars, 
//   faTimes, 
//   faChevronDown,
//   faChalkboardTeacher,
//   faIdCard
// } from '@fortawesome/free-solid-svg-icons';

// const NavBar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [theme, setTheme] = useState("light");
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   const [scrolled, setScrolled] = useState(false);

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Toggle Navbar on Mobile
//   const toggleNavbar = () => {
//     setIsOpen(!isOpen);
//     if (!isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'auto';
//     }
//   };

//   // Toggle Dropdown
//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   // Close Navbar on Resize
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//       if (window.innerWidth > 768) {
//         setIsOpen(false);
//         document.body.style.overflow = 'auto';
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Theme Toggle
//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);
//     document.documentElement.setAttribute('data-theme', newTheme);
//     localStorage.setItem('theme', newTheme);
//   };

//   // Check for saved theme preference
//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme') || 'light';
//     setTheme(savedTheme);
//     document.documentElement.setAttribute('data-theme', savedTheme);
//   }, []);

//   return (
//     <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${theme === "dark" ? styles.dark : ''}`}>
//       <div className={styles.container}>
//         <a className={styles.brand} href="/">
//           <FontAwesomeIcon icon={faChalkboardTeacher} className={styles.brandIcon} />
//           <span>EduCare</span>
//         </a>
        
//         {/* Mobile Toggle Button */}
//         <button 
//           className={styles.navToggle} 
//           onClick={toggleNavbar}
//           aria-label="Toggle navigation"
//         >
//           <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
//         </button>
        
//         {/* Navbar Links */}
//         <div className={`${styles.navCollapse} ${isOpen ? styles.show : ''}`}>
//           <ul className={styles.navbarNav}>
//             <li className={styles.navItem}>
//               <a className={styles.navLink} href="/enroll">
//                 <FontAwesomeIcon icon={faBook} className={styles.navIcon} />
//                 <span>Enroll</span>
//               </a>
//             </li>
            
//             <li 
//               className={`${styles.navItem} ${styles.dropdown}`}
//               onMouseEnter={!isMobile ? () => setDropdownOpen(true) : undefined}
//               onMouseLeave={!isMobile ? () => setDropdownOpen(false) : undefined}
//             >
//               <Link className={styles.navLink} to="/programs">
//               <FontAwesomeIcon icon={faGraduationCap} className={styles.navIcon} />
//               <span>Programs</span>
//               </Link>
//             </li>
            
//             <li className={styles.navItem}>
//               <a className={styles.navLink} href="/about-us">
//                 <FontAwesomeIcon icon={faPhone} className={styles.navIcon} />
//                 <span>About Us</span>
//               </a>
//             </li>

//             <li className={styles.navItem}>
//               <a className={styles.navLink} href="/profile">
//                 <FontAwesomeIcon icon={faIdCard} className={styles.navIcon} />
//                 <span>Profile</span>
//               </a>
//             </li>

//             {/* New: Login */}
//             <li className={`${styles.navItem} ${styles.authItem}`}>
//               <a className={styles.loginBtn} href="/login">
//                 Login
//               </a>
//             </li>

//             {/* New: Sign Up */}
//             <li className={`${styles.navItem} ${styles.authItem}`}>
//               <a className={styles.signupBtn} href="/sign-up">
//                 Sign Up
//               </a>
//             </li>
//           </ul>
          
//           {/* Theme Toggle */}
//           <button 
//             className={styles.themeToggle}
//             onClick={toggleTheme}
//             aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
//           >
//             <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;
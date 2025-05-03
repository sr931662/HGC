import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.footerSection}>
            <span className={styles.logo}>PrepElite</span>
            <p className={styles.tagline}>Excellence in Entrance Exam Preparation</p>
          </div>
          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              <li><a href="#" className={styles.footerLink}>Home</a></li>
              <li><a href="#" className={styles.footerLink}>Courses</a></li>
              <li><a href="#" className={styles.footerLink}>About Us</a></li>
              <li><a href="#" className={styles.footerLink}>Contact</a></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>Programs</h4>
            <ul className={styles.linkList}>
              <li><a href="#" className={styles.footerLink}>School Mathematics</a></li>
              <li><a href="#" className={styles.footerLink}>Competition Prep</a></li>
              <li><a href="#" className={styles.footerLink}>Foundation Courses</a></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>Follow Us</h4>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialIcon}>
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className={styles.socialIcon}>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className={styles.socialIcon}>
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className={styles.socialIcon}>
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>&copy; 2024 PrepElite Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
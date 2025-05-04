import React from 'react';
import styles from './Footer.module.css';
import { RiArrowLeftLine, RiMenuLine, RiCheckLine, RiArrowDownSLine, RiBankCardLine, 
         RiQuestionLine, RiInformationLine, RiShieldCheckLine, RiMapPinLine, 
         RiPhoneLine, RiMailLine, RiVisaFill, RiMastercardFill, RiPaypalFill, 
         RiAppleFill, RiFacebookFill, RiTwitterFill, RiInstagramFill, RiLinkedinFill } from 'react-icons/ri';

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
              <li><a href="/" className={styles.footerLink}>Home</a></li>
              <li><a href="/programs" className={styles.footerLink}>Courses</a></li>
              <li><a href="/about-us" className={styles.footerLink}>About Us</a></li>
              <li><a href="/enroll" className={styles.footerLink}>Enrollment</a></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>Follow Us</h4>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialIcon}>
                <RiFacebookFill className={styles.contactIcon}></RiFacebookFill>
              </a>
              <a href="#" className={styles.socialIcon}>
                <RiTwitterFill className={styles.contactIcon}></RiTwitterFill>
              </a>
              <a href="#" className={styles.socialIcon}>
                <RiInstagramFill className={styles.contactIcon}></RiInstagramFill>
              </a>
              <a href="#" className={styles.socialIcon}>
                <RiLinkedinFill className={styles.contactIcon}></RiLinkedinFill>
              </a>
            </div>
          </div>

          
          {/* Column 3 */}
          <div>
            <h4 className={styles.sectionTitle}>Contact Us</h4>
            <ul className={styles.footerList}>
              <li className={styles.footerContactItem}>
                <RiMapPinLine className={styles.contactIcon} />
                <span>Sector 1, Noida, Uttar Pradesh 201301</span>
              </li>
              <li className={styles.footerContactItem}>
                <RiPhoneLine className={styles.contactIcon} />
                <span>+91 8802701339</span>
              </li>
              <li className={styles.footerContactItem}>
                <RiMailLine className={styles.contactIcon} />
                <span>info@excellencecoaching.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>&copy; 2025 PrepElite Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
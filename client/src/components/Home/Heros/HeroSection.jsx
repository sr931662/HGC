import React from 'react';
import styles from './HeroSection.module.css';
import heroImage from '../../../assets/open-book-2.png';

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
            <h1 className={styles.title}>
              Unlock Your Mathematical Potential
            </h1>
            <p className={styles.subtitle}>
              Join MathGenius Academy for expert guidance in mathematics. Our proven methods and experienced faculty ensure excellence in academics and competitions.
            </p>
            <div className={styles.buttonGroup}>
              <button className={`${styles.button} ${styles.primary}`}>Start Learning Today</button>
              <button className={`${styles.button} ${styles.secondary}`}>Learn More</button>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <img src={heroImage} alt="Mathematics Education" className={styles.image} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
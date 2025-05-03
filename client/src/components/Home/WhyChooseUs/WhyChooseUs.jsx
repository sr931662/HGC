import React from 'react';
import styles from './WhyChooseUs.module.css';

const WhyChooseUs = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Why Choose PrepElite</h2>
          <p className={styles.subtitle}>
            Experience excellence in mathematics education with our unique advantages.
          </p>
        </div>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.icon}>
              <i className="fas fa-chalkboard-teacher"></i>
            </div>
            <h3 className={styles.cardTitle}>Expert Faculty</h3>
            <p className={styles.cardText}>Highly qualified and experienced teachers.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>
              <i className="fas fa-chart-line"></i>
            </div>
            <h3 className={styles.cardTitle}>Proven Results</h3>
            <p className={styles.cardText}>Consistent success in academics and competitions.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>
              <i className="fas fa-users"></i>
            </div>
            <h3 className={styles.cardTitle}>Small Batches</h3>
            <p className={styles.cardText}>Personalized attention to every student.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>
              <i className="fas fa-laptop"></i>
            </div>
            <h3 className={styles.cardTitle}>Interactive Learning</h3>
            <p className={styles.cardText}>Modern teaching methods and tools.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
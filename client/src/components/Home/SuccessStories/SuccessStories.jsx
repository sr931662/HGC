import React from 'react';
import styles from './SuccessStories.module.css';

const SuccessStory = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our Success Story</h2>
          <p className={styles.subtitle}>Numbers that speak for themselves.</p>
        </div>
        <div className={styles.grid}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>98%</div>
            <p className={styles.statLabel}>Success Rate</p>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>15+</div>
            <p className={styles.statLabel}>Years Experience</p>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>5000+</div>
            <p className={styles.statLabel}>Students Enrolled</p>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>200+</div>
            <p className={styles.statLabel}>Competition Winners</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStory;
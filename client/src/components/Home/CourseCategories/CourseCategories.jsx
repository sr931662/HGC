import React from 'react';
import styles from './CourseCategories.module.css';

const CourseCategories = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our Course Categories</h2>
          <p className={styles.subtitle}>
            Choose from our comprehensive range of mathematics programs designed to meet your specific learning needs.
          </p>
        </div>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.icon}>
              <i className="fas fa-square-root-alt"></i>
            </div>
            <h3 className={styles.cardTitle}>School Mathematics</h3>
            <p className={styles.cardText}>
              Comprehensive coverage of school curriculum with detailed explanations and practice.
            </p>
            <button className={styles.cardButton}>Learn More</button>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>
              <i className="fas fa-trophy"></i>
            </div>
            <h3 className={styles.cardTitle}>Competition Preparation</h3>
            <p className={styles.cardText}>
              Specialized training for mathematics Olympiads, SAT, and other competitions.
            </p>
            <button className={styles.cardButton}>Learn More</button>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>
              <i className="fas fa-book"></i>
            </div>
            <h3 className={styles.cardTitle}>Foundation Courses</h3>
            <p className={styles.cardText}>
              Build strong mathematical fundamentals with our foundation programs.
            </p>
            <button className={styles.cardButton}>Learn More</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseCategories;
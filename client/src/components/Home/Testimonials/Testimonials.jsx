import React, { useEffect } from 'react';
import styles from './Testimonials.module.css';
import Glide from '@glidejs/glide';

const Testimonials = () => {
  useEffect(() => {
    new Glide('.glide', {
      type: 'carousel',
      perView: 2,
      gap: 32,
      breakpoints: {
        768: {
          perView: 1
        }
      }
    }).mount();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Student Testimonials</h2>
          <p className={styles.subtitle}>
            Hear what our students have to say about their learning journey.
          </p>
        </div>
        <div className="glide">
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              <li className="glide__slide">
                <div className={styles.testimonialCard}>
                  <div className={styles.testimonialHeader}>
                    <img 
                      src="https://creatie.ai/ai/api/search-image?query=A professional headshot of a teenage student with a confident smile, wearing casual attire, against a neutral background&width=100&height=100&orientation=squarish&flag=4e886ce7-2a7b-47e8-a3d6-536d57b1b15c" 
                      alt="Student" 
                      className={styles.testimonialImage}
                    />
                    <div>
                      <h4 className={styles.testimonialName}>Amit Kulshresht</h4>
                      <div className={styles.stars}>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </div>
                    </div>
                  </div>
                  <p className={styles.testimonialText}>
                    "The teaching methods at PrepElite are exceptional. My understanding of mathematics has improved significantly."
                  </p>
                </div>
              </li>
              <li className="glide__slide">
                <div className={styles.testimonialCard}>
                  <div className={styles.testimonialHeader}>
                    <img 
                      src="https://creatie.ai/ai/api/search-image?query=A professional headshot of a young male student with glasses, wearing a casual shirt, against a neutral background&width=100&height=100&orientation=squarish&flag=3e816791-7c8c-4fda-9db0-2a4763d7e356" 
                      alt="Student" 
                      className={styles.testimonialImage}
                    />
                    <div>
                      <h4 className={styles.testimonialName}>Suresh Chauhan</h4>
                      <div className={styles.stars}>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </div>
                    </div>
                  </div>
                  <p className={styles.testimonialText}>
                    "Thanks to PrepElite, I secured first place in the regional mathematics Olympiad. Excellent guidance!"
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="glide__bullets" data-glide-el="controls[nav]">
            <button className="glide__bullet" data-glide-dir="=0"></button>
            <button className="glide__bullet" data-glide-dir="=1"></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
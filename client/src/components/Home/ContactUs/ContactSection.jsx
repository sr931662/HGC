import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import styles from './ContactSection.module.css';

const ContactSection = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_j3wp309', // Replace with your EmailJS service ID
      'template_ma3nvmy', // Replace with your EmailJS template ID
      form.current,
      'mAQn0235i68v5hQVK' // Replace with your EmailJS public key
    )
    .then((result) => {
      console.log(result.text);
      alert('Message sent successfully!');
      form.current.reset(); // Reset the form after successful send
    }, (error) => {
      console.log(error.text);
      alert('Failed to send the message, please try again.');
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
            <h2 className={styles.title}>Get in Touch</h2>
            <form ref={form} onSubmit={sendEmail} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Name</label>
                <input 
                  type="text" 
                  name="user_name" // Important: name attribute required for EmailJS
                  className={styles.input} 
                  placeholder="Your name"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email</label>
                <input 
                  type="email" 
                  name="user_email" // Important: name attribute required for EmailJS
                  className={styles.input} 
                  placeholder="Your email"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Message</label>
                <textarea 
                  name="message" // Important: name attribute required for EmailJS
                  className={styles.textarea} 
                  rows="4" 
                  placeholder="Your message"
                  required
                ></textarea>
              </div>
              <button type="submit" className={styles.submitButton}>
                Send Message
              </button>
            </form>
          </div>
          <div>
            <div className={styles.mapContainer}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2175.918239568448!2d77.30843326534954!3d28.58881853124236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce4f52c768c1d%3A0x106d0bd4d6f0cbe3!2sBirla%20Institute%20of%20Technology%20Mesra%2C%20Off-Campus%20Noida!5e1!3m2!1sen!2sin!4v1745673303838!5m2!1sen!2sin"
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade" 
                className={styles.mapImage}
              ></iframe>
            </div>
            <div className={styles.contactInfo}>
              <h3 className={styles.contactTitle}>Contact Information</h3>
              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Noida 201301, Uttar Pradesh, India</span>
                </div>
                <div className={styles.contactItem}>
                  <i className="fas fa-phone"></i>
                  <span>+91 88027 04062</span>
                </div>
                <div className={styles.contactItem}>
                  <i className="fas fa-envelope"></i>
                  <span>contact@prepelite.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
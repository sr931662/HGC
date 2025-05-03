import React from 'react';
import styles from './Home.module.css';
import HeroSection from './Heros/HeroSection';
import CourseCategories from './CourseCategories/CourseCategories';
import WhyChooseUs from './WhyChooseUs/WhyChooseUs';
import SuccessStory from './SuccessStories/SuccessStories';
import Testimonials from './Testimonials/Testimonials';
import ContactSection from './ContactUs/ContactSection';

const Home = () => {
  return (
    <main>
      <HeroSection />
      <CourseCategories />
      <WhyChooseUs />
      <SuccessStory />
      <ContactSection />
    </main>
  );
};

export default Home;

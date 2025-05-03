import { useState } from 'react';
import styles from './About.module.css';

const About = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const teamMembers = [
    {
      name: "Dr. Elizabeth Chen",
      role: "Founder & CEO",
      bio: "Ph.D. in Education from Stanford University with over 25 years of experience in educational leadership and coaching methodologies.",
      image: "https://readdy.ai/api/search-image?query=Professional%2520headshot%2520of%2520an%2520Asian%2520woman%2520in%2520her%252050s%2520with%2520short%2520black%2520hair%2520and%2520glasses%2C%2520wearing%2520professional%2520business%2520attire.%2520Confident%2520expression%2520with%2520a%2520warm%2520smile.%2520Clean%2520neutral%2520background.%2520High-quality%2520portrait%2520suitable%2520for%2520an%2520executive%2520profile.%2520Professional%2520photography%2520style.&width=400&height=500&seq=2001&orientation=portrait"
    },
    {
      name: "Dr. James Washington",
      role: "Academic Director",
      bio: "Former university professor with a Ph.D. in Mathematics from MIT and 15+ years of experience in curriculum development.",
      image: "https://readdy.ai/api/search-image?query=Professional%2520headshot%2520of%2520an%2520African%2520American%2520man%2520in%2520his%252040s%2520with%2520short%2520hair%2520and%2520glasses%2C%2520wearing%2520professional%2520business%2520attire.%2520Confident%2520expression%2520with%2520a%2520warm%2520smile.%2520Clean%2520neutral%2520background.%2520High-quality%2520portrait%2520suitable%2520for%2520an%2520executive%2520profile.%2520Professional%2520photography%2520style.&width=400&height=500&seq=2002&orientation=portrait"
    },
    {
      name: "Maria Rodriguez",
      role: "Career Development Lead",
      bio: "MBA from Harvard Business School with extensive experience in corporate recruiting and professional coaching.",
      image: "https://readdy.ai/api/search-image?query=Professional%2520headshot%2520of%2520a%2520Hispanic%2520woman%2520in%2520her%252030s%2520with%2520long%2520brown%2520hair%2C%2520wearing%2520professional%2520business%2520attire.%2520Confident%2520expression%2520with%2520a%2520warm%2520smile.%2520Clean%2520neutral%2520background.%2520High-quality%2520portrait%2520suitable%2520for%2520an%2520executive%2520profile.%2520Professional%2520photography%2520style.&width=400&height=500&seq=2003&orientation=portrait"
    },
    {
      name: "Dr. Raj Patel",
      role: "International Programs Director",
      bio: "Ph.D. in International Education with experience working with educational institutions across 15+ countries.",
      image: "https://readdy.ai/api/search-image?query=Professional%2520headshot%2520of%2520an%2520Indian%2520man%2520in%2520his%252030s%2520with%2520short%2520black%2520hair%2C%2520wearing%2520professional%2520business%2520attire.%2520Confident%2520expression%2520with%2520a%2520warm%2520smile.%2520Clean%2520neutral%2520background.%2520High-quality%2520portrait%2520suitable%2520for%2520an%2520executive%2520profile.%2520Professional%2520photography%2520style.&width=400&height=500&seq=2004&orientation=portrait"
    }
  ];

  const testimonials = [
    {
      name: "Emily Chen",
      role: "SAT Prep Program Graduate, Princeton University",
      content: `"The SAT Prep Program at Excellence Coaching Institute was transformative. The personalized approach and strategic techniques helped me improve my score by 240 points. The instructors were not only knowledgeable but also genuinely invested in my success."`,
      image: "https://readdy.ai/api/search-image?query=Professional%2520headshot%2520of%2520a%2520young%2520Asian%2520woman%2520with%2520a%2520confident%2520smile%2C%2520wearing%2520business%2520casual%2520attire%2C%2520clean%2520background%2C%2520high%2520quality%2520portrait%2520suitable%2520for%2520a%2520professional%2520profile&width=100&height=100&seq=5001&orientation=squarish"
    },
    {
      name: "Marcus Johnson",
      role: "Career Transition Program Graduate, Microsoft",
      content: `"After 12 years as an engineer, I was looking to pivot into product management. The Career Transition Program provided me with the roadmap, skills, and confidence I needed. Within three months of completing the program, I landed my dream role at Microsoft."`,
      image: "https://readdy.ai/api/search-image?query=Professional%2520headshot%2520of%2520a%2520middle-aged%2520African%2520American%2520man%2520with%2520a%2520confident%2520smile%2C%2520wearing%2520business%2520casual%2520attire%2C%2520clean%2520background%2C%2520high%2520quality%2520portrait%2520suitable%2520for%2520a%2520professional%2520profile&width=100&height=100&seq=5002&orientation=squarish"
    },
    {
      name: "Priya Sharma",
      role: "Executive Leadership Program Graduate, Healthcare Startup",
      content: `"The Executive Leadership Program was exactly what I needed to take my career to the next level. The blend of strategic thinking, practical leadership tools, and personalized coaching helped me develop a more comprehensive leadership approach."`,
      image: "https://readdy.ai/api/search-image?query=Professional%2520headshot%2520of%2520a%2520young%2520Indian%2520woman%2520with%2520a%2520confident%2520smile%2C%2520wearing%2520professional%2520attire%2C%2520clean%2520background%2C%2520high%2520quality%2520portrait%2520suitable%2520for%2520a%2520professional%2520profile&width=100&height=100&seq=5003&orientation=squarish"
    }
  ];

  const timelineData = [
    {
      year: "2005",
      title: "The Beginning",
      description: "Founded by Dr. Elizabeth Chen with a vision to provide personalized academic coaching to students struggling with standardized tests. Started with just 5 students in a small rented space."
    },
    {
      year: "2010",
      title: "Expansion of Programs",
      description: "Expanded our offerings beyond test preparation to include career coaching and professional development programs. Moved to a larger facility to accommodate growing student body."
    },
    {
      year: "2015",
      title: "National Recognition",
      description: "Received national accreditation and recognition for our innovative teaching methodologies. Opened three additional branches across the country to serve more students."
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Successfully transitioned to hybrid learning models during the global pandemic. Developed proprietary digital learning platforms to enhance student experience and outcomes."
    },
    {
      year: "2025",
      title: "Today & Beyond",
      description: "Now serving over 5,000 students annually across 12 locations and our virtual campus. Continuing to innovate and expand our programs to meet the evolving needs of learners worldwide."
    }
  ];

  return (
    <>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>About Excellence Coaching Institute</h1>
            <p className={styles.heroSubtitle}>Empowering individuals to achieve their full potential through personalized coaching and proven methodologies since 2005.</p>
            <button className={styles.heroButton}>Our Programs</button>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid2Col}>
            <div>
              <h2 className={styles.sectionTitle}>Our Mission & Values</h2>
              <p className={styles.sectionText}>At Excellence Coaching Institute, we are dedicated to transforming lives through education and personalized coaching. Our mission is to empower individuals to achieve their academic and professional goals by providing exceptional guidance, innovative teaching methodologies, and a supportive learning environment.</p>
              
              <div className={styles.valuesContainer}>
                <div className={styles.valueItem}>
                  <div className={styles.valueIcon}>
                    <i className="ri-award-line ri-lg"></i>
                  </div>
                  <div>
                    <h3 className={styles.valueTitle}>Excellence</h3>
                    <p className={styles.valueDescription}>We strive for excellence in everything we do, from our teaching methods to our student support services.</p>
                  </div>
                </div>
                
                <div className={styles.valueItem}>
                  <div className={styles.valueIcon}>
                    <i className="ri-user-heart-line ri-lg"></i>
                  </div>
                  <div>
                    <h3 className={styles.valueTitle}>Personalization</h3>
                    <p className={styles.valueDescription}>We recognize that each student is unique, with different learning styles, strengths, and areas for growth.</p>
                  </div>
                </div>
                
                <div className={styles.valueItem}>
                  <div className={styles.valueIcon}>
                    <i className="ri-heart-line ri-lg"></i>
                  </div>
                  <div>
                    <h3 className={styles.valueTitle}>Integrity</h3>
                    <p className={styles.valueDescription}>We uphold the highest ethical standards in all our interactions with students, parents, and colleagues.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <img 
                src="https://readdy.ai/api/search-image?query=Modern%2520educational%2520environment%2520with%2520diverse%2520students%2520engaged%2520in%2520collaborative%2520learning.%2520Bright%2C%2520airy%2520classroom%2520with%2520contemporary%2520furniture%2520and%2520technology.%2520Instructor%2520guiding%2520students%2520with%2520personalized%2520attention.%2520Professional%2520photography%2520with%2520natural%2520lighting%2520showing%2520positive%2520learning%2520atmosphere.%2520Clean%2520background%2520with%2520educational%2520materials%2520visible.&width=600&height=700&seq=1002&orientation=portrait" 
                alt="Our Mission" 
                className={styles.missionImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our History Section */}
      <section className={`${styles.section} ${styles.historySection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Journey</h2>
            <p className={styles.sectionSubtitle}>From a small tutoring center to a renowned coaching institute, our growth reflects our commitment to educational excellence.</p>
          </div>
          
          <div className={styles.timelineContainer}>
            {timelineData.map((item, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineContent}>
                  <span className={styles.timelineYear}>{item.year}</span>
                  <h3 className={styles.timelineTitle}>{item.title}</h3>
                  <p className={styles.timelineDescription}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Meet Our Expert Team</h2>
            <p className={styles.sectionSubtitle}>Our diverse team of educators, coaches, and industry professionals brings decades of experience and passion to help you succeed.</p>
          </div>
          
          <div className={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <div key={index} className={styles.teamCard}>
                <div className={styles.teamImageContainer}>
                  <img src={member.image} alt={member.name} className={styles.teamImage} />
                </div>
                <div className={styles.teamContent}>
                  <h3 className={styles.teamName}>{member.name}</h3>
                  <p className={styles.teamRole}>{member.role}</p>
                  <p className={styles.teamBio}>{member.bio}</p>
                  
                  <div className={styles.socialLinks}>
                    <a href="#" className={styles.socialLink}>
                      <i className="ri-linkedin-fill ri-sm"></i>
                    </a>
                    <a href="#" className={styles.socialLink}>
                      <i className="ri-twitter-fill ri-sm"></i>
                    </a>
                    <a href="#" className={styles.socialLink}>
                      <i className="ri-mail-fill ri-sm"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.textCenter}>
            <button className={styles.secondaryButton}>View All Team Members</button>
          </div>
        </div>
      </section>

      {/* Teaching Methodology Section */}
      <section className={`${styles.section} ${styles.methodologySection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Teaching Methodology</h2>
            <p className={styles.sectionSubtitle}>We've developed a unique approach to coaching that combines proven educational techniques with innovative strategies.</p>
          </div>
          
          <div className={styles.methodologyGrid}>
            <div className={styles.methodologyCard}>
              <div className={styles.methodologyIcon}>
                <i className="ri-user-settings-line ri-2x"></i>
              </div>
              <h3 className={styles.methodologyTitle}>Personalized Assessment</h3>
              <p className={styles.methodologyDescription}>We begin with a comprehensive assessment to understand each student's unique learning style, strengths, challenges, and goals. This forms the foundation of our personalized coaching approach.</p>
              <div className={styles.successRate}>
                <span>Success Rate: 95%</span>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>
            
            <div className={styles.methodologyCard}>
              <div className={styles.methodologyIcon}>
                <i className="ri-road-map-line ri-2x"></i>
              </div>
              <h3 className={styles.methodologyTitle}>Strategic Learning Paths</h3>
              <p className={styles.methodologyDescription}>Based on the assessment, we create customized learning paths with clear milestones and targeted exercises designed to address specific needs while building on existing strengths.</p>
              <div className={styles.successRate}>
                <span>Improvement Rate: 87%</span>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: '87%' }}></div>
                </div>
              </div>
            </div>
            
            <div className={styles.methodologyCard}>
              <div className={styles.methodologyIcon}>
                <i className="ri-feedback-line ri-2x"></i>
              </div>
              <h3 className={styles.methodologyTitle}>Continuous Feedback Loop</h3>
              <p className={styles.methodologyDescription}>We implement regular progress assessments and provide detailed feedback, allowing us to adjust strategies in real-time and ensure optimal learning outcomes.</p>
              <div className={styles.successRate}>
                <span>Student Satisfaction: 98%</span>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: '98%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>What Our Students Say</h2>
            <p className={styles.sectionSubtitle}>Hear from students who have transformed their academic and professional lives through our coaching programs.</p>
          </div>
          
          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={styles.testimonialCard}>
                <div className={styles.testimonialHeader}>
                  <div className={styles.testimonialImage}>
                    <img src={testimonial.image} alt={testimonial.name} />
                  </div>
                  <div>
                    <h4 className={styles.testimonialName}>{testimonial.name}</h4>
                    <p className={styles.testimonialRole}>{testimonial.role}</p>
                  </div>
                </div>
                <p className={styles.testimonialContent}>{testimonial.content}</p>
                <div className={styles.testimonialRating}>
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="ri-star-fill ri-sm"></i>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.textCenter}>
            <a href="#" className={styles.textLink}>View More Testimonials <i className="ri-arrow-right-line ri-sm"></i></a>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Transform Your Future?</h2>
            <p className={styles.ctaSubtitle}>Join thousands of successful students who have achieved their goals with Excellence Coaching Institute.</p>
            
            <div className={styles.ctaButtons}>
              <button className={styles.primaryButton}>Explore Programs</button>
              <button className={styles.outlineButton}>Schedule Consultation</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
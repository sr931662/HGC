import React, { useState } from 'react';
import styles from './Programs.module.css';

const Programs = () => {
  const [activeCategory, setActiveCategory] = useState('All Programs');
  const [showModal, setShowModal] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const categories = [
    'All Programs',
    'Mathematics & Reasoning',
    'Language & Communication',
    'Technology & Engineering',
    'Competitive Exams'
  ];

  const programs = [
    {
      id: 1,
      title: "Mathematics Mastery",
      category: "Mathematics & Reasoning",
      department: "STEM Department",
      duration: "12 Weeks",
      capacity: "Max 15 Students",
      description: "Comprehensive mathematics program covering school to college level topics with special focus on competitive exam preparation.",
      price: "₹15,000",
      image: 'https://cdn.pixabay.com/photo/2014/07/06/13/55/calculator-385506_1280.jpg'
    },
    {
      id: 2,
      title: "Logical Reasoning Bootcamp",
      category: "Mathematics & Reasoning",
      department: "STEM Department",
      duration: "8 Weeks",
      capacity: "Max 12 Students",
      description: "Intensive training in logical reasoning and analytical thinking for competitive exams and professional assessments.",
      price: "₹12,000",
      image: 'https://cdn.pixabay.com/photo/2015/12/07/10/40/strategy-1080527_1280.jpg'
    },
    {
      id: 3,
      title: "Aptitude Training Program",
      category: "Competitive Exams",
      department: "Career Development Department",
      duration: "10 Weeks",
      capacity: "Max 15 Students",
      description: "Comprehensive quantitative, verbal and abstract aptitude training for campus placements and job interviews.",
      price: "₹10,000",
      image: 'https://www.naukri.com/campus/career-guidance/wp-content/uploads/2023/09/aptitude-tests.jpg'
    },
    {
      id: 4,
      title: "Spoken English Fluency",
      category: "Language & Communication",
      department: "Language Department",
      duration: "12 Weeks",
      capacity: "Max 10 Students",
      description: "Develop confidence and fluency in English communication with personalized coaching and practical exercises.",
      price: "₹18,000",
      image: 'https://cdn.pixabay.com/photo/2021/10/06/05/16/study-6684423_1280.jpg'
    },
    {
      id: 5,
      title: "DevOps Engineering",
      category: "Technology & Engineering",
      department: "Technology Department",
      duration: "16 Weeks",
      capacity: "Max 8 Students",
      description: "Hands-on training in DevOps methodologies, tools, and best practices for software development and deployment.",
      price: "₹25,000",
      image: 'https://cdn.pixabay.com/photo/2018/02/15/18/29/devops-3155973_1280.jpg'
    },
    {
      id: 6,
      title: "Computer Science Fundamentals",
      category: "Technology & Engineering",
      department: "Technology Department",
      duration: "24 Weeks",
      capacity: "Max 15 Students",
      description: "Comprehensive computer science curriculum covering algorithms, data structures, and software engineering principles.",
      price: "₹30,000",
      image: 'https://images.squarespace-cdn.com/content/v1/5fce63270356d927d7eecdbd/033e9988-2ac8-4cb9-8b9f-5bf05fb22dcb/gff.jpg'
    },
    {
      id: 7,
      title: "Database Management",
      category: "Technology & Engineering",
      department: "Technology Department",
      duration: "10 Weeks",
      capacity: "Max 12 Students",
      description: "Master database design, SQL, and NoSQL systems with practical projects and real-world applications.",
      price: "₹20,000",
      image: 'https://cdn.pixabay.com/photo/2019/08/14/05/04/data-4404730_960_720.jpg'
    },
    {
      id: 8,
      title: "JEE/NEET Foundation",
      category: "Competitive Exams",
      department: "STEM Department",
      duration: "36 Weeks",
      capacity: "Max 20 Students",
      description: "Comprehensive preparation for engineering and medical entrance exams with concept building and test series.",
      price: "₹35,000",
      image: 'https://thedigitaleducation.org/wp-content/uploads/2023/10/jee-neet-exams.jpg'
    }
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Mathematics Program Graduate, Now at IIT Delhi",
      content: `"The Mathematics Mastery program helped me strengthen my fundamentals and develop advanced problem-solving skills. The structured approach and expert guidance were instrumental in my JEE Advanced success."`,
      image: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20young%20Indian%20male%20student%20with%20a%20confident%20smile%20wearing%20casual%20attire%20against%20a%20clean%20background&width=100&height=100&seq=5001&orientation=squarish"
    },
    {
      name: "Priya Patel",
      role: "Spoken English Graduate, Now at Deloitte",
      content: `"The Spoken English program transformed my communication skills and confidence. The personalized feedback and practical exercises helped me ace my campus interviews and secure my dream job."`,
      image: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20young%20Indian%20female%20professional%20with%20a%20confident%20smile%20wearing%20business%20attire&width=100&height=100&seq=5002&orientation=squarish"
    },
    {
      name: "Amit Kumar",
      role: "DevOps Graduate, Now at Amazon",
      content: `"The DevOps Engineering program provided hands-on experience with industry-relevant tools and methodologies. The project-based learning approach gave me the practical skills needed for my current role."`,
      image: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20young%20Indian%20male%20IT%20professional%20with%20a%20confident%20smile%20wearing%20business%20casual%20attire&width=100&height=100&seq=5003&orientation=squarish"
    }
  ];

  const faqs = [
    {
      question: "What is the class schedule like?",
      answer: "Most programs offer flexible scheduling with weekday evening and weekend batches. Each program typically has 2-3 sessions per week, each lasting 2 hours."
    },
    {
      question: "Do you provide placement assistance?",
      answer: "Yes, our professional skills and technology programs include placement support with resume building, interview preparation, and connections to our industry partners."
    },
    {
      question: "Are there any prerequisites for the courses?",
      answer: "Basic requirements vary by program. Mathematics programs require school-level math knowledge, while technology programs may require basic programming understanding. Contact us for specific prerequisites."
    }
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Filter programs based on active category
  const filteredPrograms = activeCategory === 'All Programs' 
    ? programs 
    : programs.filter(program => program.category === activeCategory);

  return (
    <>
      {/* Programs Header */}
      <section className={styles.programsHeader}>
        <div className={styles.container}>
          <div className={styles.headerContent}>
            <h1 className={styles.headerTitle}>Our Educational Programs</h1>
            <p className={styles.headerSubtitle}>
              Comprehensive learning solutions organized by departments and categories.
            </p>
          </div>
        </div>
      </section>

      {/* Program Categories */}
      <section className={styles.categoriesSection}>
        <div className={styles.container}>
          <div className={styles.categoriesContainer}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.categoryButton} ${activeCategory === category ? styles.activeCategory : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Program Listings */}
      <section className={styles.programsSection}>
        <div className={styles.container}>
          <div className={styles.programsGrid}>
            {filteredPrograms.map((program) => (
              <div key={program.id} className={styles.programCard}>
                <div className={styles.programImageContainer}>
                  <img src={program.image} alt={program.title} className={styles.programImage} />
                </div>
                <div className={styles.programContent}>
                  <div className={styles.programHeader}>
                    <h3 className={styles.programTitle}>{program.title}</h3>
                    <div className={styles.programMeta}>
                      <span className={styles.programCategory}>{program.category}</span>
                      <span className={styles.programDepartment}>{program.department}</span>
                    </div>
                  </div>
                  <div className={styles.programDetails}>
                    <div className={styles.detailItem}>
                      <i className="ri-time-line"></i>
                      <span>{program.duration}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <i className="ri-user-line"></i>
                      <span>{program.capacity}</span>
                    </div>
                  </div>
                  <p className={styles.programDescription}>{program.description}</p>
                  <div className={styles.programFooter}>
                    <span className={styles.programPrice}>{program.price}</span>
                    <button 
                      className={styles.viewDetailsButton}
                      onClick={() => setShowModal(true)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Detail Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Mathematics Mastery Program</h2>
              <button 
                className={styles.closeModalButton}
                onClick={() => setShowModal(false)}
              >
                <i className="ri-close-line ri-lg"></i>
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalGrid}>
                <div className={styles.modalMainContent}>
                  <img 
                    src="https://readdy.ai/api/search-image?query=Mathematics%20classroom%20with%20students%20solving%20complex%20problems%20on%20whiteboard%20and%20notebooks%20with%20formulas%20visible.%20Modern%20educational%20setting%20with%20professional%20instructor.%20Clean%20well-lit%20space%20with%20math%20learning%20materials.&width=800&height=500&seq=2001&orientation=landscape" 
                    alt="Mathematics Mastery Program" 
                    className={styles.modalImage}
                  />

                  <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Program Overview</h3>
                    <p className={styles.sectionText}>
                      Our Mathematics Mastery Program is designed to build strong mathematical foundations while developing advanced problem-solving skills. The curriculum covers school-level concepts through college-level mathematics with special emphasis on competitive exam preparation.
                    </p>
                    <p className={styles.sectionText}>
                      The program is structured to help students develop logical thinking, analytical abilities, and mathematical intuition that are essential for academic and professional success in STEM fields.
                    </p>
                  </div>

                  <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Curriculum Highlights</h3>
                    <ul className={styles.featureList}>
                      <li className={styles.featureItem}>
                        <i className="ri-checkbox-circle-line"></i>
                        <span><span className={styles.featureTitle}>Comprehensive Coverage:</span> Algebra, Geometry, Calculus, Trigonometry, Number Theory</span>
                      </li>
                      <li className={styles.featureItem}>
                        <i className="ri-checkbox-circle-line"></i>
                        <span><span className={styles.featureTitle}>Problem-Solving Strategies:</span> Multiple approaches to complex mathematical problems</span>
                      </li>
                      <li className={styles.featureItem}>
                        <i className="ri-checkbox-circle-line"></i>
                        <span><span className={styles.featureTitle}>Competitive Exam Focus:</span> JEE, NEET, Olympiad, and other entrance exam patterns</span>
                      </li>
                      <li className={styles.featureItem}>
                        <i className="ri-checkbox-circle-line"></i>
                        <span><span className={styles.featureTitle}>Conceptual Clarity:</span> Emphasis on understanding fundamentals rather than rote learning</span>
                      </li>
                      <li className={styles.featureItem}>
                        <i className="ri-checkbox-circle-line"></i>
                        <span><span className={styles.featureTitle}>Practice Material:</span> Extensive problem sets with varying difficulty levels</span>
                      </li>
                      <li className={styles.featureItem}>
                        <i className="ri-checkbox-circle-line"></i>
                        <span><span className={styles.featureTitle}>Performance Analysis:</span> Regular tests with detailed feedback</span>
                      </li>
                    </ul>
                  </div>

                  <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Learning Outcomes</h3>
                    <ul className={styles.outcomeList}>
                      <li className={styles.outcomeItem}>
                        <i className="ri-arrow-right-circle-line"></i>
                        <span>Strong conceptual understanding of mathematical principles</span>
                      </li>
                      <li className={styles.outcomeItem}>
                        <i className="ri-arrow-right-circle-line"></i>
                        <span>Enhanced problem-solving speed and accuracy</span>
                      </li>
                      <li className={styles.outcomeItem}>
                        <i className="ri-arrow-right-circle-line"></i>
                        <span>Improved performance in school exams and competitive tests</span>
                      </li>
                      <li className={styles.outcomeItem}>
                        <i className="ri-arrow-right-circle-line"></i>
                        <span>Development of logical and analytical thinking skills</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className={styles.modalSidebar}>
                  <div className={styles.detailsCard}>
                    <h3 className={styles.detailsTitle}>Program Details</h3>
                    <div className={styles.detailsGrid}>
                      <div className={styles.detail}>
                        <h4 className={styles.detailLabel}>DURATION</h4>
                        <p className={styles.detailValue}>12 Weeks</p>
                      </div>
                      <div className={styles.detail}>
                        <h4 className={styles.detailLabel}>SCHEDULE</h4>
                        <p className={styles.detailValue}>3 sessions per week (2 hours each)</p>
                      </div>
                      <div className={styles.detail}>
                        <h4 className={styles.detailLabel}>CLASS SIZE</h4>
                        <p className={styles.detailValue}>Maximum 15 students</p>
                      </div>
                      <div className={styles.detail}>
                        <h4 className={styles.detailLabel}>FORMAT</h4>
                        <p className={styles.detailValue}>In-person or online options</p>
                      </div>
                      <div className={styles.detail}>
                        <h4 className={styles.detailLabel}>MATERIALS</h4>
                        <p className={styles.detailValue}>Study materials and practice tests included</p>
                      </div>
                      <div className={styles.detail}>
                        <h4 className={styles.detailLabel}>PRICE</h4>
                        <p className={styles.detailPrice}>₹15,000</p>
                      </div>
                    </div>

                    <div className={styles.buttonGroup}>
                      <button className={styles.primaryButton}>
                        Enroll Now
                      </button>
                      <button className={styles.secondaryButton}>
                        Request Information
                      </button>
                    </div>
                  </div>

                  <div className={styles.instructorSection}>
                    <h3 className={styles.instructorTitle}>Lead Instructor</h3>
                    <div className={styles.instructorProfile}>
                      <div className={styles.instructorImage}>
                        <img 
                          src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20an%20experienced%20Indian%20mathematics%20professor%20with%20glasses%20and%20a%20confident%20smile%20wearing%20formal%20attire&width=100&height=100&seq=3001&orientation=squarish" 
                          alt="Dr. Sanjay Verma" 
                        />
                      </div>
                      <div>
                        <h4 className={styles.instructorName}>Dr. Sanjay Verma</h4>
                        <p className={styles.instructorBio}>20+ years experience in mathematics education</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonials */}
              <div className={styles.testimonialsSection}>
                <h3 className={styles.testimonialsTitle}>Student Testimonials</h3>
                <div className={styles.testimonialsGrid}>
                  <div className={styles.testimonialCard}>
                    <div className={styles.testimonialHeader}>
                      <div className={styles.testimonialImage}>
                        <img 
                          src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20young%20Indian%20female%20student%20with%20a%20confident%20smile%20wearing%20casual%20attire&width=100&height=100&seq=4001&orientation=squarish" 
                          alt="Neha Gupta" 
                        />
                      </div>
                      <div className={styles.testimonialInfo}>
                        <h4 className={styles.testimonialName}>Neha Gupta</h4>
                        <p className={styles.testimonialRole}>JEE Advanced Rank: 450</p>
                      </div>
                    </div>
                    <p className={styles.testimonialContent}>
                      "The Mathematics Mastery program helped me develop a deep understanding of concepts and problem-solving techniques that were crucial for my JEE Advanced success. The faculty's approach made even complex topics accessible."
                    </p>
                    <div className={styles.testimonialRating}>
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="ri-star-fill ri-sm"></i>
                      ))}
                    </div>
                  </div>

                  <div className={styles.testimonialCard}>
                    <div className={styles.testimonialHeader}>
                      <div className={styles.testimonialImage}>
                        <img 
                          src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20young%20Indian%20male%20student%20with%20a%20confident%20smile%20wearing%20casual%20attire&width=100&height=100&seq=4002&orientation=squarish" 
                          alt="Arjun Mehta" 
                        />
                      </div>
                      <div className={styles.testimonialInfo}>
                        <h4 className={styles.testimonialName}>Arjun Mehta</h4>
                        <p className={styles.testimonialRole}>NTSE Scholar</p>
                      </div>
                    </div>
                    <p className={styles.testimonialContent}>
                      "The program's structured approach to mathematical thinking transformed how I approach problems. The emphasis on multiple solution methods was particularly valuable for Olympiad preparation."
                    </p>
                    <div className={styles.testimonialRating}>
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="ri-star-fill ri-sm"></i>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className={styles.faqSection}>
                <h3 className={styles.faqTitle}>Frequently Asked Questions</h3>
                <div className={styles.faqList}>
                  {faqs.map((faq, index) => (
                    <div key={index} className={styles.faqItem}>
                      <button 
                        className={styles.faqQuestion}
                        onClick={() => toggleFaq(index)}
                      >
                        <span>{faq.question}</span>
                        <i className={`ri-arrow-${activeFaq === index ? 'up' : 'down'}-s-line ri-lg`}></i>
                      </button>
                      {activeFaq === index && (
                        <div className={styles.faqAnswer}>
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials Section */}
      <section className={styles.testimonialsMainSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>What Our Students Say</h2>
            <p className={styles.sectionSubtitle}>
              Hear from students who have transformed their academic and professional journeys through our programs.
            </p>
          </div>

          <div className={styles.testimonialsList}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={styles.testimonialMainCard}>
                <div className={styles.testimonialMainContent}>
                  <div className={styles.testimonialMainImage}>
                    <img src={testimonial.image} alt={testimonial.name} />
                  </div>
                  <div>
                    <h4 className={styles.testimonialMainName}>{testimonial.name}</h4>
                    <p className={styles.testimonialMainRole}>{testimonial.role}</p>
                    <p className={styles.testimonialMainText}>{testimonial.content}</p>
                    <div className={styles.testimonialMainRating}>
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="ri-star-fill ri-sm"></i>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Admissions Open for 2025</h2>
            <p className={styles.ctaSubtitle}>Limited Seats Available for Each Program</p>
            <button className={styles.ctaButton}>
              Enroll Now
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Programs;
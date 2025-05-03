import React, { useState } from 'react';
import styles from './Enroll.module.css';
import { RiArrowLeftLine, RiMenuLine, RiCheckLine, RiArrowDownSLine, RiBankCardLine, 
         RiQuestionLine, RiInformationLine, RiShieldCheckLine, RiMapPinLine, 
         RiPhoneLine, RiMailLine, RiVisaFill, RiMastercardFill, RiPaypalFill, 
         RiAppleFill, RiFacebookFill, RiTwitterFill, RiInstagramFill, RiLinkedinFill } from 'react-icons/ri';

const Enroll = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [selectedDay, setSelectedDay] = useState('15');
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    education: '',
    emergencyContact: '',
    emergencyPhone: '',
    emergencyRelation: '',
    termsAgree: false,
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    saveCard: false,
    timezone: 'ET',
    confirmAgree: false
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const courses = [
    {
      id: 'mathematics-mastery',
      name: 'Mathematics Mastery',
      description: 'Comprehensive mathematics program covering school to college level topics with special focus on competitive exam preparation.',
      price: '15,000',
      duration: '12 Weeks',
      topics: ['Algebra & Calculus', 'Competitive Exam Practice', 'Problem Solving Strategies'],
      image: 'https://cdn.pixabay.com/photo/2014/07/06/13/55/calculator-385506_1280.jpg'
    },
    {
      id: 'logical-reasoning',
      name: 'Logical Reasoning Bootcamp',
      description: 'Intensive training in logical reasoning and analytical thinking for competitive exams and professional assessments.',
      price: '12,000',
      duration: '8 Weeks',
      topics: ['Logical Puzzles', 'Pattern Recognition', 'Critical Thinking'],
      image: 'https://cdn.pixabay.com/photo/2015/12/07/10/40/strategy-1080527_1280.jpg'
    },
    {
      id: 'aptitude-training',
      name: 'Aptitude Training Program',
      description: 'Comprehensive quantitative, verbal and abstract aptitude training for campus placements and job interviews.',
      price: '10,000',
      duration: '10 Weeks',
      topics: ['Quantitative Aptitude', 'Verbal Reasoning', 'Abstract Thinking'],
      image: 'https://www.naukri.com/campus/career-guidance/wp-content/uploads/2023/09/aptitude-tests.jpg'
    },
    {
      id: 'spoken-english',
      name: 'Spoken English Fluency',
      description: 'Develop confidence and fluency in English communication with personalized coaching and practical exercises.',
      price: '18,000',
      duration: '12 Weeks',
      topics: ['Conversation Practice', 'Pronunciation', 'Presentation Skills'],
      image: 'https://cdn.pixabay.com/photo/2021/10/06/05/16/study-6684423_1280.jpg'
    },
    {
      id: 'devops-engineering',
      name: 'DevOps Engineering',
      description: 'Hands-on training in DevOps methodologies, tools, and best practices for software development and deployment.',
      price: '25,000',
      duration: '16 Weeks',
      topics: ['CI/CD Pipelines', 'Cloud Infrastructure', 'DevOps Tools'],
      image: 'https://cdn.pixabay.com/photo/2018/02/15/18/29/devops-3155973_1280.jpg'
    },
    {
      id: 'cs-fundamentals',
      name: 'Computer Science Fundamentals',
      description: 'Comprehensive computer science curriculum covering algorithms, data structures, and software engineering principles.',
      price: '30,000',
      duration: '24 Weeks',
      topics: ['Algorithms & Data Structures', 'Programming Fundamentals', 'Software Engineering'],
      image: 'https://images.squarespace-cdn.com/content/v1/5fce63270356d927d7eecdbd/033e9988-2ac8-4cb9-8b9f-5bf05fb22dcb/gff.jpg'
    },
    {
      id: 'database-management',
      name: 'Database Management',
      description: 'Master database design, SQL, and NoSQL systems with practical projects and real-world applications.',
      price: '20,000',
      duration: '10 Weeks',
      topics: ['SQL & NoSQL', 'ER Modeling', 'Database Projects'],
      image: 'https://cdn.pixabay.com/photo/2019/08/14/05/04/data-4404730_960_720.jpg'
    },
    {
      id: 'jee-neet',
      name: 'JEE/NEET Foundation',
      description: 'Comprehensive preparation for engineering and medical entrance exams with concept building and test series.',
      price: '35,000',
      duration: '36 Weeks',
      topics: ['Physics & Chemistry', 'Biology & Mathematics', 'Test Series & Doubt Sessions'],
      image: 'https://thedigitaleducation.org/wp-content/uploads/2023/10/jee-neet-exams.jpg'
    }
  ];
  

  const timeSlotsData = [
    { day: 'Monday', slots: ['9:00 AM - 11:00 AM', '1:00 PM - 3:00 PM', '6:00 PM - 8:00 PM'] },
    { day: 'Wednesday', slots: ['9:00 AM - 11:00 AM', '1:00 PM - 3:00 PM', '6:00 PM - 8:00 PM'] },
    { day: 'Friday', slots: ['9:00 AM - 11:00 AM', '1:00 PM - 3:00 PM', '6:00 PM - 8:00 PM'] }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const selectCourse = (course) => {
    setSelectedCourse(course);
  };

  const selectPaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  const selectDay = (day) => {
    setSelectedDay(day);
  };

  const toggleTimeSlot = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter(s => s !== slot));
    } else if (selectedSlots.length < 2) {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const goToStep = (step) => {
    setCurrentStep(step);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  const totalPrice = selectedCourse ? parseInt(selectedCourse.price) + 50 : 0;

  return (
    <div className={styles.body}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.navLeft}>
            <a href="#" className={styles.logo}>logo</a>
          </div>
          <div className={styles.navLinks}>
            <a href="#" className={styles.navLink}>Home</a>
            <a href="#" className={styles.navLink}>Programs</a>
            <a href="#" className={styles.navLink}>Foundation Courses</a>
            <a href="#" className={styles.navLink}>About Us</a>
            <a href="#" className={styles.navLink}>Contact</a>
          </div>
          <div>
            <a href="#" className={styles.backLink}>
              <RiArrowLeftLine className={styles.backIcon} />
              <span>Back to Courses</span>
            </a>
          </div>
          <div className={styles.mobileMenu}>
            <RiMenuLine className={styles.menuIcon} />
          </div>
        </div>
      </nav>

      {/* Enrollment Form Section */}
      <section className={styles.enrollSection}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>Enroll in Foundation Courses</h1>
            <p>Complete the following steps to enroll in our comprehensive foundation courses and begin your journey to academic excellence.</p>
          </div>

          {/* Progress Steps */}
          <div className={styles.progressContainer}>
            <div className={styles.progressSteps}>
              {[1, 2, 3, 4, 5].map(step => (
                <div 
                  key={step} 
                  className={`${styles.progressStep} ${currentStep > step ? styles.completed : ''} ${currentStep === step ? styles.active : ''}`}
                >
                  <div className={`${styles.stepNumber} ${currentStep >= step ? styles.activeStep : ''}`}>
                    {step}
                  </div>
                  <span className={currentStep >= step ? styles.activeText : ''}>
                    {step === 1 && 'Select Course'}
                    {step === 2 && 'Personal Info'}
                    {step === 3 && 'Payment'}
                    {step === 4 && 'Schedule'}
                    {step === 5 && 'Confirmation'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Enrollment Form */}
          <div className={styles.enrollFormContainer}>
            <form id="enrollmentForm" onSubmit={handleSubmit}>
              {/* Step 1: Course Selection */}
              <div className={`${styles.formStep} ${currentStep === 1 ? styles.active : ''}`} id="step1">
                <h2>Select Your Foundation Course</h2>
                <p>Choose the foundation course that best aligns with your academic goals and interests.</p>

                <div className={styles.courseGrid}>
                  {courses.map(course => (
                    <div 
                      key={course.id}
                      className={`${styles.courseCard} ${selectedCourse?.id === course.id ? styles.selected : ''}`}
                      onClick={() => selectCourse(course)}
                      data-course={course.id}
                      data-price={course.price}
                    >
                      <div className={styles.courseImage}>
                        <img src={course.image} alt={course.name} />
                      </div>
                      <div className={styles.courseInfo}>
                        <h3>{course.name}</h3>
                        <p>{course.description}</p>
                        <div className={styles.courseMeta}>
                          <span className={styles.coursePrice}>₹{course.price}</span>
                          <span className={styles.courseDuration}>{course.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Selected Course Details */}
                {selectedCourse && (
                  <div className={styles.selectedCourseDetails}>
                    <h3>Selected Course Details</h3>
                    <div className={styles.courseDetailsGrid}>
                      <div>
                        <h4>{selectedCourse.name}</h4>
                        <p>{selectedCourse.description}</p>
                        <div className={styles.courseTopics}>
                          {selectedCourse.topics.map((topic, index) => (
                            <div key={index} className={styles.topicItem}>
                              <div className={styles.topicIcon}><RiCheckLine /></div>
                              <span>{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className={styles.courseSummary}>
                          <h4>Course Summary</h4>
                          <div className={styles.summaryItems}>
                            <div className={styles.summaryItem}>
                              <span>Course Fee:</span>
                              <span>₹{selectedCourse.price}</span>
                            </div>
                            <div className={styles.summaryItem}>
                              <span>Duration:</span>
                              <span>{selectedCourse.duration}</span>
                            </div>
                            <div className={styles.summaryItem}>
                              <span>Start Date:</span>
                              <span>May 15, 2025</span>
                            </div>
                            <div className={styles.summaryItem}>
                              <span>Materials:</span>
                              <span>Included</span>
                            </div>
                          </div>
                          <div className={styles.summaryTotal}>
                            <span>Total:</span>
                            <span>₹{selectedCourse.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className={styles.formActions}>
                  <button
                    type="button"
                    onClick={() => goToStep(2)}
                    className={styles.primaryButton}
                    disabled={!selectedCourse}
                  >
                    Continue to Personal Information
                  </button>
                </div>
              </div>

              {/* Step 2: Personal Information */}
              <div className={`${styles.formStep} ${currentStep === 2 ? styles.active : ''}`} id="step2">
                <h2>Personal Information</h2>
                <p>Please provide your personal details to complete your enrollment.</p>

                <div className={styles.formGrid}>
                  <div>
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={styles.fullWidth}>
                    <label htmlFor="address">Address *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode">ZIP Code *</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="country">Country *</label>
                    <div className={styles.selectWrapper}>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="Other">Other</option>
                      </select>
                      <RiArrowDownSLine className={styles.selectIcon} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="education">Highest Education Level *</label>
                    <div className={styles.selectWrapper}>
                      <select
                        id="education"
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Education Level</option>
                        <option value="high-school">High School</option>
                        <option value="associate">Associate Degree</option>
                        <option value="bachelor">Bachelor's Degree</option>
                        <option value="master">Master's Degree</option>
                        <option value="doctorate">Doctorate</option>
                      </select>
                      <RiArrowDownSLine className={styles.selectIcon} />
                    </div>
                  </div>
                  <div className={styles.fullWidth}>
                    <label htmlFor="emergencyContact">Emergency Contact Name *</label>
                    <input
                      type="text"
                      id="emergencyContact"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="emergencyPhone">Emergency Contact Phone *</label>
                    <input
                      type="tel"
                      id="emergencyPhone"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="emergencyRelation">Relationship to Emergency Contact *</label>
                    <input
                      type="text"
                      id="emergencyRelation"
                      name="emergencyRelation"
                      value={formData.emergencyRelation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.checkboxWrapper}>
                  <input
                    type="checkbox"
                    id="termsAgree"
                    name="termsAgree"
                    checked={formData.termsAgree}
                    onChange={handleInputChange}
                    className={styles.customCheckbox}
                    required
                  />
                  <label htmlFor="termsAgree">
                    I agree to the <a href="#" className={styles.link}>Terms and Conditions</a> and <a href="#" className={styles.link}>Privacy Policy</a> of Excellence Coaching Institute.
                  </label>
                </div>

                <div className={styles.formActionsBetween}>
                  <button
                    type="button"
                    onClick={() => goToStep(1)}
                    className={styles.secondaryButton}
                  >
                    Back to Course Selection
                  </button>
                  <button
                    type="button"
                    onClick={() => goToStep(3)}
                    className={styles.primaryButton}
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>

              {/* Step 3: Payment Information */}
              <div className={`${styles.formStep} ${currentStep === 3 ? styles.active : ''}`} id="step3">
                <h2>Payment Information</h2>
                <p>Select your preferred payment method and enter your payment details.</p>

                <div className={styles.paymentMethods}>
                  <div 
                    className={`${styles.paymentMethod} ${paymentMethod === 'credit-card' ? styles.selected : ''}`}
                    onClick={() => selectPaymentMethod('credit-card')}
                    data-method="credit-card"
                  >
                    <div className={styles.paymentRadio}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        id="creditCard"
                        value="credit-card"
                        checked={paymentMethod === 'credit-card'}
                        onChange={() => {}}
                        className={styles.customRadio}
                      />
                      <label htmlFor="creditCard">Credit/Debit Card</label>
                    </div>
                    <div className={styles.paymentIcons}>
                      <RiVisaFill className={styles.paymentIcon} />
                      <RiMastercardFill className={styles.paymentIcon} />
                      <RiPaypalFill className={styles.paymentIcon} />
                    </div>
                  </div>
                  <div 
                    className={`${styles.paymentMethod} ${paymentMethod === 'paypal' ? styles.selected : ''}`}
                    onClick={() => selectPaymentMethod('paypal')}
                    data-method="paypal"
                  >
                    <div className={styles.paymentRadio}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        id="paypal"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={() => {}}
                        className={styles.customRadio}
                      />
                      <label htmlFor="paypal">PayPal</label>
                    </div>
                    <div className={styles.paymentIcons}>
                      <RiPaypalFill className={styles.paymentIcon} />
                    </div>
                  </div>
                  <div 
                    className={`${styles.paymentMethod} ${paymentMethod === 'apple-pay' ? styles.selected : ''}`}
                    onClick={() => selectPaymentMethod('apple-pay')}
                    data-method="apple-pay"
                  >
                    <div className={styles.paymentRadio}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        id="applePay"
                        value="apple-pay"
                        checked={paymentMethod === 'apple-pay'}
                        onChange={() => {}}
                        className={styles.customRadio}
                      />
                      <label htmlFor="applePay">Apple Pay</label>
                    </div>
                    <div className={styles.paymentIcons}>
                      <RiAppleFill className={styles.paymentIcon} />
                    </div>
                  </div>
                </div>

                {/* Credit Card Payment Form */}
                <div className={`${styles.paymentForm} ${paymentMethod !== 'credit-card' ? styles.hidden : ''}`} id="creditCardForm">
                  <div className={styles.formGrid}>
                    <div className={styles.fullWidth}>
                      <label htmlFor="cardName">Name on Card *</label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required={paymentMethod === 'credit-card'}
                      />
                    </div>
                    <div className={styles.fullWidth}>
                      <label htmlFor="cardNumber">Card Number *</label>
                      <div className={styles.inputWithIcon}>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          required={paymentMethod === 'credit-card'}
                        />
                        <RiBankCardLine className={styles.inputIcon} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="expiryDate">Expiry Date *</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required={paymentMethod === 'credit-card'}
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv">CVV *</label>
                      <div className={styles.inputWithIcon}>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          required={paymentMethod === 'credit-card'}
                        />
                        <RiQuestionLine className={styles.inputIcon} />
                      </div>
                    </div>
                  </div>

                  <div className={styles.checkboxWrapper}>
                    <input
                      type="checkbox"
                      id="saveCard"
                      name="saveCard"
                      checked={formData.saveCard}
                      onChange={handleInputChange}
                      className={styles.customCheckbox}
                    />
                    <label htmlFor="saveCard">Save this card for future payments</label>
                  </div>
                </div>

                {/* PayPal Form */}
                <div className={`${styles.paymentForm} ${paymentMethod !== 'paypal' ? styles.hidden : ''}`} id="paypalForm">
                  <div className={styles.paypalContainer}>
                    <RiPaypalFill className={styles.paypalIcon} />
                    <p>You will be redirected to PayPal to complete your payment securely.</p>
                    <button
                      type="button"
                      className={styles.paypalButton}
                    >
                      Continue to PayPal
                    </button>
                  </div>
                </div>

                {/* Apple Pay Form */}
                <div className={`${styles.paymentForm} ${paymentMethod !== 'apple-pay' ? styles.hidden : ''}`} id="applePayForm">
                  <div className={styles.applePayContainer}>
                    <RiAppleFill className={styles.applePayIcon} />
                    <p>You will be prompted to complete your payment using Apple Pay.</p>
                    <button
                      type="button"
                      className={styles.applePayButton}
                    >
                      Pay with Apple Pay
                    </button>
                  </div>
                </div>

                {/* Order Summary */}
                <div className={styles.orderSummary}>
                  <h3>Order Summary</h3>
                  <div className={styles.summaryItems}>
                    <div className={styles.summaryItem}>
                      <span>{selectedCourse?.name || 'Course'}</span>
                      <span>₹{selectedCourse?.price || '0'}</span>
                    </div>
                    <div className={styles.summaryItem}>
                      <span>Course Materials</span>
                      <span>Included</span>
                    </div>
                    <div className={styles.summaryItem}>
                      <span>Registration Fee</span>
                      <span>₹50</span>
                    </div>
                  </div>
                  <div className={styles.summaryTotal}>
                    <span>Total:</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>

                <div className={styles.securityInfo}>
                  <div className={styles.securityIcon}>
                    <RiShieldCheckLine />
                  </div>
                  <div>
                    <h4>Secure Payment</h4>
                    <p>Your payment information is encrypted and secure. We never store your full credit card details.</p>
                  </div>
                </div>

                <div className={styles.formActionsBetween}>
                  <button
                    type="button"
                    onClick={() => goToStep(2)}
                    className={styles.secondaryButton}
                  >
                    Back to Personal Information
                  </button>
                  <button
                    type="button"
                    onClick={() => goToStep(4)}
                    className={styles.primaryButton}
                  >
                    Continue to Schedule
                  </button>
                </div>
              </div>

              {/* Step 4: Schedule Selection */}
              <div className={`${styles.formStep} ${currentStep === 4 ? styles.active : ''}`} id="step4">
                <h2>Select Your Schedule</h2>
                <p>Choose your preferred class days and times for your selected course.</p>

                {/* Calendar View */}
                <div className={styles.calendarSection}>
                  <div className={styles.calendarHeader}>
                    <h3>May 2025</h3>
                    <div className={styles.calendarNav}>
                      <button type="button">
                        <RiArrowLeftLine />
                      </button>
                      <button type="button">
                        <RiTwitterFill />
                      </button>
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className={styles.calendarGrid}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className={styles.calendarDayHeader}>{day}</div>
                    ))}

                    {/* Week 1 */}
                    {[27, 28, 29, 30, 1, 2, 3].map(day => (
                      <div key={`w1-${day}`} className={`${styles.calendarDay} ${day < 15 ? styles.dayDisabled : ''} ${day === parseInt(selectedDay) ? styles.daySelected : ''}`} onClick={() => day >= 15 && selectDay(day.toString())}>
                        {day}
                      </div>
                    ))}

                    {/* Week 2 */}
                    {[4, 5, 6, 7, 8, 9, 10].map(day => (
                      <div key={`w2-${day}`} className={`${styles.calendarDay} ${day === parseInt(selectedDay) ? styles.daySelected : ''}`} onClick={() => selectDay(day.toString())}>
                        {day}
                      </div>
                    ))}

                    {/* Week 3 */}
                    {[11, 12, 13, 14, 15, 16, 17].map(day => (
                      <div key={`w3-${day}`} className={`${styles.calendarDay} ${day === parseInt(selectedDay) ? styles.daySelected : ''}`} onClick={() => selectDay(day.toString())}>
                        {day}
                      </div>
                    ))}

                    {/* Week 4 */}
                    {[18, 19, 20, 21, 22, 23, 24].map(day => (
                      <div key={`w4-${day}`} className={`${styles.calendarDay} ${day === parseInt(selectedDay) ? styles.daySelected : ''}`} onClick={() => selectDay(day.toString())}>
                        {day}
                      </div>
                    ))}

                    {/* Week 5 */}
                    {[25, 26, 27, 28, 29, 30, 31].map(day => (
                      <div key={`w5-${day}`} className={`${styles.calendarDay} ${day === parseInt(selectedDay) ? styles.daySelected : ''}`} onClick={() => selectDay(day.toString())}>
                        {day}
                      </div>
                    ))}
                  </div>

                  <p className={styles.calendarNote}>
                    Your course will begin on <strong>Thursday, May 15, 2025</strong>. Please select your preferred weekly schedule below.
                  </p>
                </div>

                {/* Time Slot Selection */}
                <div className={styles.timeSlotsSection}>
                  <h3>Available Time Slots</h3>
                  <p>Select your preferred time slots for your weekly classes (select 2 slots per week).</p>

                  <div className={styles.timeSlotsGrid}>
                    {timeSlotsData.map((dayData, index) => (
                      <div key={index} className={styles.timeSlotDay}>
                        <h4>{dayData.day}</h4>
                        <div className={styles.slotsList}>
                          {dayData.slots.map((slot, slotIndex) => {
                            const isUnavailable = dayData.day === 'Monday' && slotIndex === 2 || dayData.day === 'Friday' && slotIndex === 0;
                            const isSelected = selectedSlots.includes(`${dayData.day} ${slot}`);
                            
                            return (
                              <div
                                key={slotIndex}
                                className={`${styles.timeSlot} ${isUnavailable ? styles.unavailable : ''} ${isSelected ? styles.selected : ''}`}
                                onClick={() => !isUnavailable && toggleTimeSlot(`${dayData.day} ${slot}`)}
                              >
                                <span>{slot}</span>
                                {isUnavailable ? (
                                  <span className={styles.slotStatus}>Full</span>
                                ) : (
                                  <div className={styles.slotCheckbox}>
                                    {isSelected && <RiCheckLine className={styles.slotCheckIcon} />}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={styles.timeSlotInfo}>
                    <RiInformationLine className={styles.infoIcon} />
                    <p>You've selected {selectedSlots.length} of 2 required weekly sessions. Your course will run for {selectedCourse?.duration || '12 weeks'} from May 15 to August 7, 2025.</p>
                  </div>
                </div>

                {/* Time Zone Selection */}
                <div className={styles.timezoneSection}>
                  <label htmlFor="timezone">Your Time Zone *</label>
                  <div className={styles.selectWrapper}>
                    <select
                      id="timezone"
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="ET">Eastern Time (ET)</option>
                      <option value="CT">Central Time (CT)</option>
                      <option value="MT">Mountain Time (MT)</option>
                      <option value="PT">Pacific Time (PT)</option>
                      <option value="Other">Other</option>
                    </select>
                    <RiArrowDownSLine className={styles.selectIcon} />
                  </div>
                </div>

                <div className={styles.formActionsBetween}>
                  <button
                    type="button"
                    onClick={() => goToStep(3)}
                    className={styles.secondaryButton}
                  >
                    Back to Payment
                  </button>
                  <button
                    type="button"
                    onClick={() => goToStep(5)}
                    className={styles.primaryButton}
                  >
                    Review & Confirm
                  </button>
                </div>
              </div>

              {/* Step 5: Confirmation */}
              <div className={`${styles.formStep} ${currentStep === 5 ? styles.active : ''}`} id="step5">
                <div className={styles.confirmationHeader}>
                  <div className={styles.successIcon}>
                    <RiCheckLine />
                  </div>
                  <h2>Enrollment Summary</h2>
                  <p>Please review your enrollment details before confirming.</p>
                </div>

                <div className={styles.confirmationDetails}>
                  <h3>Course Details</h3>
                  <div className={styles.detailsGrid}>
                    <div>
                      <div className={styles.detailItem}>
                        <span>Course:</span>
                        <span>{selectedCourse?.name || 'Not selected'}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span>Duration:</span>
                        <span>{selectedCourse?.duration || 'Not selected'}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span>Start Date:</span>
                        <span>May 15, 2025</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span>End Date:</span>
                        <span>August 7, 2025</span>
                      </div>
                    </div>
                    <div>
                      <div className={styles.detailItem}>
                        <span>Schedule:</span>
                        <span>{selectedSlots.length > 0 ? selectedSlots.join(', ') : 'Not selected'}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span>Time Zone:</span>
                        <span>
                          {formData.timezone === 'ET' && 'Eastern Time (ET)'}
                          {formData.timezone === 'CT' && 'Central Time (CT)'}
                          {formData.timezone === 'MT' && 'Mountain Time (MT)'}
                          {formData.timezone === 'PT' && 'Pacific Time (PT)'}
                          {formData.timezone === 'Other' && 'Other'}
                        </span>
                      </div>
                      <div className={styles.detailItem}>
                        <span>Course Fee:</span>
                        <span>₹{selectedCourse?.price || '0'}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span>Registration Fee:</span>
                        <span>₹50</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.confirmationTotal}>
                    <span>Total:</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>

                <div className={styles.confirmationGrid}>
                  <div>
                    <h3>Personal Information</h3>
                    <div className={styles.detailItem}>
                      <span>Name:</span>
                      <span>{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span>Email:</span>
                      <span>{formData.email}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span>Phone:</span>
                      <span>{formData.phone}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span>Address:</span>
                      <span>{formData.address}, {formData.city}, {formData.zipCode}</span>
                    </div>
                  </div>
                  <div>
                    <h3>Payment Information</h3>
                    <div className={styles.detailItem}>
                      <span>Payment Method:</span>
                      <span>
                        {paymentMethod === 'credit-card' && 'Credit Card'}
                        {paymentMethod === 'paypal' && 'PayPal'}
                        {paymentMethod === 'apple-pay' && 'Apple Pay'}
                      </span>
                    </div>
                    {paymentMethod === 'credit-card' && (
                      <>
                        <div className={styles.detailItem}>
                          <span>Card Number:</span>
                          <span>**** **** **** {formData.cardNumber?.slice(-4) || '1234'}</span>
                        </div>
                        <div className={styles.detailItem}>
                          <span>Name on Card:</span>
                          <span>{formData.cardName}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className={styles.importantInfo}>
                  <RiInformationLine className={styles.infoIcon} />
                  <div>
                    <p>Important Information:</p>
                    <ul>
                      <li>You will receive a confirmation email with your enrollment details.</li>
                      <li>Course materials will be available one week before your start date.</li>
                      <li>Please arrive 15 minutes early for your first session.</li>
                      <li>For any questions, please contact our support team at support@excellencecoaching.com.</li>
                    </ul>
                  </div>
                </div>

                <div className={styles.checkboxWrapper}>
                  <input
                    type="checkbox"
                    id="confirmAgree"
                    name="confirmAgree"
                    checked={formData.confirmAgree}
                    onChange={handleInputChange}
                    className={styles.customCheckbox}
                    required
                  />
                  <label htmlFor="confirmAgree">
                    I confirm that all the information provided is correct and I agree to complete the enrollment with the selected course, schedule, and payment method.
                  </label>
                </div>

                <div className={styles.formActionsBetween}>
                  <button
                    type="button"
                    onClick={() => goToStep(4)}
                    className={styles.secondaryButton}
                  >
                    Back to Schedule
                  </button>
                  <button
                    type="submit"
                    className={styles.primaryButton}
                    disabled={!formData.confirmAgree}
                  >
                    Confirm Enrollment
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerGrid}>
            {/* Column 1 */}
            <div>
              <h3 className={styles.footerLogo}>logo</h3>
              <p className={styles.footerText}>
                Empowering individuals to achieve academic and professional excellence through personalized coaching and proven methodologies.
              </p>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink}><RiFacebookFill /></a>
                <a href="#" className={styles.socialLink}><RiTwitterFill /></a>
                <a href="#" className={styles.socialLink}><RiInstagramFill /></a>
                <a href="#" className={styles.socialLink}><RiLinkedinFill /></a>
              </div>
            </div>
            {/* Column 2 */}
            <div>
              <h4 className={styles.footerHeading}>Quick Links</h4>
              <ul className={styles.footerList}>
                <li><a href="#">Home</a></li>
                <li><a href="#">Programs</a></li>
                <li><a href="#">Foundation Courses</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            {/* Column 3 */}
            <div>
              <h4 className={styles.footerHeading}>Contact Us</h4>
              <ul className={styles.footerList}>
                <li className={styles.footerContactItem}>
                  <RiMapPinLine className={styles.contactIcon} />
                  <span>123 Education Avenue, New York, NY 10001</span>
                </li>
                <li className={styles.footerContactItem}>
                  <RiPhoneLine className={styles.contactIcon} />
                  <span>(123) 456-7890</span>
                </li>
                <li className={styles.footerContactItem}>
                  <RiMailLine className={styles.contactIcon} />
                  <span>info@excellencecoaching.com</span>
                </li>
              </ul>
            </div>
            {/* Column 4 */}
            <div>
              <h4 className={styles.footerHeading}>Subscribe</h4>
              <p className={styles.footerText}>
                Stay updated with our latest programs and success stories.
              </p>
              <div className={styles.subscribeForm}>
                <input type="email" placeholder="Your email" className={styles.subscribeInput} />
                <button className={styles.subscribeButton}>Subscribe</button>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <div className={styles.paymentMethods}>
              <RiVisaFill className={styles.paymentIcon} />
              <RiMastercardFill className={styles.paymentIcon} />
              <RiPaypalFill className={styles.paymentIcon} />
              <RiAppleFill className={styles.paymentIcon} />
            </div>
            <p>&copy; 2025 Excellence Coaching Institute. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div className={styles.modalSuccessIcon}>
                <RiCheckLine />
              </div>
              <h2>Enrollment Successful!</h2>
              <p>Thank you for enrolling in our {selectedCourse?.name || 'course'}.</p>
            </div>
            <div className={styles.modalBody}>
              <p>
                A confirmation email has been sent to <strong>{formData.email}</strong> with all the details of your enrollment.
              </p>
              <p>
                Your course begins on <strong>Thursday, May 15, 2025</strong>.
              </p>
            </div>
            <div className={styles.modalActions}>
              <a href="#" className={styles.modalPrimaryButton}>
                Return to Foundation Courses
              </a>
              <button onClick={closeModal} className={styles.modalSecondaryButton}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enroll;
import React, { useState } from 'react';
import styles from './register.module.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    course: '',
    acceptTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.course) newErrors.course = 'Please select a course';
    if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
  
      const payload = {
        fname: formData.firstName,
        lname: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        pass: formData.password,
        repass: formData.confirmPassword,
        course: formData.course
      };
  
      try {
        const response = await fetch("http://localhost:5001/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
  
        const result = await response.json();
  
        if (response.status === 201) {
          console.log("Registration success", result);
          setRegistrationSuccess(true);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            course: '',
            acceptTerms: false
          });
        } else {
          alert(result.msg || result.message);
        }
      } catch (err) {
        console.error("Registration failed", err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  

  return (
    <>

      <div className={styles.registrationContainer}>
        <div className={styles.registrationForm}>
          <h1 className={styles.title}>Create Your Account</h1>
          <p className={styles.subtitle}>Join our community of learners</p>
          
          {registrationSuccess ? (
            <div className={styles.successMessage}>
              <h2>Registration Successful!</h2>
              <p>Thank you for registering. We've sent a confirmation email to your address.</p>
              <button 
                className={styles.continueButton}
                onClick={() => setRegistrationSuccess(false)}
              >
                Register Another Account
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <div className={styles.nameFields}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={errors.firstName ? styles.errorInput : ''}
                    />
                    {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? styles.errorInput : ''}
                    />
                    {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
                  </div>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? styles.errorInput : ''}
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? styles.errorInput : ''}
                />
                {errors.phone && <span className={styles.error}>{errors.phone}</span>}
              </div>

              <div className={styles.passwordFields}>
                <div className={styles.inputGroup}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? styles.errorInput : ''}
                  />
                  {errors.password && <span className={styles.error}>{errors.password}</span>}
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? styles.errorInput : ''}
                  />
                  {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="course">Select Course</label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className={errors.course ? styles.errorInput : ''}
                >
                  <option value="">-- Select a course --</option>
                  <option value="mathematics">Mathematics Foundation</option>
                  <option value="sciences">Sciences Foundation</option>
                  <option value="language">Language Arts</option>
                  <option value="critical-thinking">Critical Thinking</option>
                </select>
                {errors.course && <span className={styles.error}>{errors.course}</span>}
              </div>

              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="acceptTerms"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className={errors.acceptTerms ? styles.errorCheckbox : ''}
                />
                <label htmlFor="acceptTerms">
                  I agree to the <a href="/terms" className={styles.termsLink}>Terms and Conditions</a>
                </label>
                {errors.acceptTerms && <span className={styles.error}>{errors.acceptTerms}</span>}
              </div>

              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Create Account'}
              </button>

              <div className={styles.loginPrompt}>
                Already have an account? <a href="/login" className={styles.loginLink}>Log in</a>
              </div>
            </form>
          )}
        </div>

        <div className={styles.registrationImage}>
          <div className={styles.imageOverlay}>
            <h2>Start Your Learning Journey</h2>
            <p>Join thousands of students who have transformed their academic performance with our courses</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
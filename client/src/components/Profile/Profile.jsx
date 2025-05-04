import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth-context';
import styles from './Profile.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as echarts from 'echarts';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    phone: '',
    bio: '',
    avatar: '',
    socialLinks: {
      linkedin: '',
      github: '',
      twitter: ''
    }
  });

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No authentication token found');
        }
    
        const response = await axios.get('http://localhost:5001/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.status !== 200) {
          throw new Error(`Request failed with status ${response.status}`);
        }
    
        setProfileData(response.data);
        // ... rest of your success handling
      } catch (error) {
        console.error('Error fetching profile:', error);
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
          
          if (error.response.status === 401) {
            toast.error('Session expired, please login again');
            logout();
            navigate('/login');
          } else if (error.response.status === 404) {
            toast.error('Profile endpoint not found - check server configuration');
          }
        } else if (error.request) {
          // The request was made but no response was received
          toast.error('No response from server - check network connection');
        } else {
          // Something happened in setting up the request
          toast.error('Error setting up request: ' + error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    } else {
      navigate('/login');
    }
  }, [user, navigate, logout]);

  // Initialize skills chart
  useEffect(() => {
    if (profileData?.skills) {
      const chart = echarts.init(document.getElementById('skills-chart'));
      const option = {
        radar: {
          indicator: profileData.skills.map(skill => ({
            name: skill.name,
            max: 5
          })),
          radius: '65%'
        },
        series: [{
          type: 'radar',
          data: [{
            value: profileData.skills.map(skill => skill.proficiency),
            name: 'Skill Proficiency'
          }]
        }]
      };
      chart.setOption(option);
      
      return () => chart.dispose();
    }
  }, [profileData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fname || !formData.lname || !formData.phone) {
      toast.error('First name, last name, and phone are required');
      return;
    }
    
    // Phone number validation
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      toast.error('Phone number must be 10 digits');
      return;
    }

    try {
      setIsUpdating(true);
      const response = await axios.patch('/api/auth/me', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setProfileData(response.data);
      setEditMode(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading profile...</div>;
  }

  if (!profileData) {
    return <div className={styles.error}>Error loading profile data</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.avatarContainer}>
          <img 
            src={profileData.avatar || 'https://example.com/default-avatar.jpg'} 
            alt="Profile" 
            className={styles.avatar}
          />
          {editMode && (
            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleInputChange}
              placeholder="Avatar URL"
            />
          )}
        </div>
        
        <div className={styles.profileInfo}>
          {editMode ? (
            <>
              <input
                type="text"
                name="fname"
                value={formData.fname}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="lname"
                value={formData.lname}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </>
          ) : (
            <>
              <h1>{profileData.fname} {profileData.lname}</h1>
              <p>{profileData.phone}</p>
              <p>{profileData.email}</p>
              <p>{profileData.bio}</p>
            </>
          )}
        </div>
        
        <div className={styles.profileActions}>
          {editMode ? (
            <>
              <button onClick={handleSubmit} className={styles.saveButton}>
                Save Changes
              </button>
              <button 
                onClick={() => setEditMode(false)} 
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </>
          ) : (
            <button 
              onClick={() => setEditMode(true)} 
              className={styles.editButton}
            >
              Edit Profile
            </button>
          )}
          <button onClick={logout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>

      <div className={styles.profileContent}>
        <div className={styles.section}>
          <h2>About Me</h2>
          {editMode ? (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Tell us about yourself..."
            />
          ) : (
            <p>{profileData.bio || 'No bio yet.'}</p>
          )}
        </div>

        <div className={styles.section}>
          <h2>Social Links</h2>
          {editMode ? (
            <div className={styles.socialLinksEdit}>
              <input
                type="text"
                name="linkedin"
                value={formData.socialLinks.linkedin}
                onChange={handleSocialLinkChange}
                placeholder="LinkedIn URL"
              />
              <input
                type="text"
                name="github"
                value={formData.socialLinks.github}
                onChange={handleSocialLinkChange}
                placeholder="GitHub URL"
              />
              <input
                type="text"
                name="twitter"
                value={formData.socialLinks.twitter}
                onChange={handleSocialLinkChange}
                placeholder="Twitter URL"
              />
            </div>
          ) : (
            <div className={styles.socialLinks}>
              {profileData.socialLinks?.linkedin && (
                <a href={profileData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              )}
              {profileData.socialLinks?.github && (
                <a href={profileData.socialLinks.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              )}
              {profileData.socialLinks?.twitter && (
                <a href={profileData.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              )}
            </div>
          )}
        </div>

        <div className={styles.section}>
          <h2>Skills</h2>
          <div id="skills-chart" className={styles.skillsChart}></div>
          <div className={styles.skillsList}>
            {profileData.skills?.map((skill, index) => (
              <div key={index} className={styles.skillItem}>
                <span>{skill.name}</span>
                <div className={styles.proficiencyBar}>
                  <div 
                    className={styles.proficiencyFill} 
                    style={{ width: `${(skill.proficiency / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h2>Education</h2>
          {profileData.education?.map((edu, index) => (
            <div key={index} className={styles.educationItem}>
              <h3>{edu.institution}</h3>
              <p>{edu.degree} in {edu.fieldOfStudy}</p>
              <p>
                {edu.startYear} - {edu.endYear || 'Present'}
              </p>
              {edu.description && <p>{edu.description}</p>}
            </div>
          ))}
        </div>

        <div className={styles.section}>
          <h2>Achievements</h2>
          <div className={styles.achievementsGrid}>
            {profileData.achievements?.map((achievement, index) => (
              <div key={index} className={styles.achievementCard}>
                <h3>{achievement.title}</h3>
                <p>{achievement.issuer}</p>
                <p>{new Date(achievement.date).toLocaleDateString()}</p>
                {achievement.description && <p>{achievement.description}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;





































// import React, { useState, useEffect } from 'react';
// import styles from './Profile.module.css';
// import * as echarts from 'echarts';

// const Profile = () => {
//   const [activeTab, setActiveTab] = useState('active');
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });

//   // Testimonials data
//   const testimonials = [
//     {
//       id: 1,
//       name: 'Sarah Johnson',
//       photo: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20smiling%20young%20woman%20with%20shoulder%20length%20brown%20hair%2C%20business%20casual%20attire%2C%20neutral%20background%2C%20high%20quality%20professional%20headshot%2C%20soft%20lighting%2C%20natural%20expression&width=100&height=100&seq=1&orientation=squarish',
//       course: 'Advanced Data Science',
//       rating: 5,
//       comment: 'Dr. Williams transformed my understanding of data science. His teaching methodology is exceptional.'
//     },
//     // Add other testimonials...
//   ];

//   // Courses data
//   const courses = {
//     active: [
//       {
//         id: 1,
//         name: 'Advanced Data Science',
//         duration: '12 weeks',
//         students: 28,
//         successRate: '94%',
//         category: 'Data Science'
//       }
//       // Add other active courses...
//     ],
//     completed: [
//       {
//         id: 3,
//         name: 'Python for Data Analysis',
//         duration: '6 weeks',
//         students: 42,
//         successRate: '96%',
//         category: 'Programming'
//       }
//       // Add other completed courses...
//     ]
//   };

//   // Milestones data
//   const milestones = [
//     {
//       year: 2023,
//       title: 'Excellence in Teaching Award',
//       description: 'Recognized for innovative teaching methods and student success rates.'
//     }
//     // Add other milestones...
//   ];

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//     setFormData({
//       name: '',
//       email: '',
//       subject: '',
//       message: ''
//     });
//   };

//   // Initialize radar chart
//   useEffect(() => {
//     const statsChart = document.getElementById('stats-chart');
//     if (statsChart) {
//       const chart = echarts.init(statsChart);
//       const option = {
//         // Your chart options...
//       };
//       chart.setOption(option);
      
//       const handleResize = () => chart.resize();
//       window.addEventListener('resize', handleResize);
      
//       return () => {
//         chart.dispose();
//         window.removeEventListener('resize', handleResize);
//       };
//     }
//   }, []);

//   // Testimonial navigation
//   const nextTestimonial = () => {
//     setCurrentTestimonial(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
//   };

//   const prevTestimonial = () => {
//     setCurrentTestimonial(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
//   };

//   return (
//     <div className={styles.profileContainer}>
//       {/* Navigation */}
//       <nav className={styles.nav}>
//         <div className={styles.navContainer}>
//           <div className={styles.logo}>Intuitive Learning</div>
//           <div className={styles.navLinks}>
//             <a href="#about">About</a>
//             <a href="#courses">Courses</a>
//             <a href="#achievements">Achievements</a>
//             <a href="#testimonials">Testimonials</a>
//             <a href="#contact">Contact</a>
//           </div>
//           <button className={styles.mobileMenuButton}>
//             <i className="fas fa-bars"></i>
//           </button>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className={styles.mainContent}>
//         {/* About Section */}
//         <section id="about" className={styles.section}>
//           {/* Profile header with image and basic info */}
//           <div className={styles.profileHeader}>
//             {/* Add your profile header content */}
//           </div>
          
//           {/* Education & Expertise */}
//           <div className={styles.twoColumnGrid}>
//             <div className={styles.education}>
//               <h2>Education & Certifications</h2>
//               {/* Add education items */}
//             </div>
//             <div className={styles.expertise}>
//               <h2>Expertise & Skills</h2>
//               {/* Add skills and chart */}
//             </div>
//           </div>
//         </section>

//         {/* Courses Section */}
//         <section id="courses" className={styles.section}>
//           <h2>Course Information</h2>
//           {/* Add courses tabs and content */}
//         </section>

//         {/* Achievements Section */}
//         <section id="achievements" className={styles.section}>
//           <h2>Achievement Showcase</h2>
//           {/* Add milestones and statistics */}
//         </section>

//         {/* Testimonials Section */}
//         <section id="testimonials" className={styles.section}>
//           <h2>Student Testimonials</h2>
//           {/* Add testimonials carousel */}
//         </section>

//         {/* Contact Section */}
//         <section id="contact" className={styles.section}>
//           <h2>Get in Touch</h2>
//           <div className={styles.twoColumnGrid}>
//             <div className={styles.contactForm}>
//               <form onSubmit={handleSubmit}>
//                 {/* Add form fields */}
//               </form>
//             </div>
//             <div className={styles.contactInfo}>
//               {/* Add contact information */}
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className={styles.footer}>
//         {/* Add footer content */}
//       </footer>

//       {/* Floating buttons */}
//       <div className={styles.floatingButtons}>
//         <button className={styles.chatButton}>
//           <i className="fas fa-comment"></i>
//         </button>
//         <button className={styles.scrollTopButton}>
//           <i className="fas fa-arrow-up"></i>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Profile;
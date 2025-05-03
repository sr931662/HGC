import React, { useState } from 'react';
import styles from './Login.module.css';
import axios from 'axios';

const Login = () => {
  const [data, setData] = useState({
    email: '',
    pass: '',
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', data);
      console.log('Login successful:', res.data);
      alert('Login successful!');
      // Redirect or store token logic here
    } catch (err) {
      console.error('Login failed:', err.response?.data?.msg || err.message);
      alert(err.response?.data?.msg || 'Login failed!');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={data.email}
          onChange={handleChange}
          className={styles.input}
        />

        <input
          type="password"
          name="pass"
          placeholder="Password"
          required
          value={data.pass}
          onChange={handleChange}
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

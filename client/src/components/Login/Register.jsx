import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const userData = { username, email, password };

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/v1/register/', userData);
      console.log('registered', res.data);

      toast.success('Registration successful!', { position: 'top-right' });

      // Redirect after 1.5 seconds
      setTimeout(() => {
        navigate('/login');
      }, 1500);

    } catch (err) {
      if (err.response?.data) {
        setErrors(err.response.data);

        // Show each error in toast
        Object.values(err.response.data).forEach((errorMsg) => {
          toast.error(errorMsg, { position: 'top-right' });
        });
      } else {
        toast.error('Something went wrong. Please try again later.', { position: 'top-right' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container d-flex align-items-center justify-content-center vh-100">
        <div className="card shadow p-4" style={{ maxWidth: '450px', width: '100%' }}>
          <h3 className="text-center mb-4 text-dark">Register</h3>
          <form onSubmit={handleRegistration}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter full name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              {errors.username && (
                <small className="text-danger">{errors.username}</small>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && (
                <small className="text-danger">{errors.email}</small>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errors.password && (
                <small className="text-danger">{errors.password}</small>
              )}
            </div>

            <div className="d-grid">
              {loading ? (
                <button type="submit" className="btn btn-success" disabled>
                  <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                  Please wait...
                </button>
              ) : (
                <button type="submit" className="btn btn-dark">
                  Register
                </button>
              )}
            </div>
            <p className="mt-3 text-center">
              Already have an account? <a href="/login">Login</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;

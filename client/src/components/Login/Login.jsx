import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../authprovider/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setIsLoggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/token/', {
        username,
        password
      });

      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);

      setIsLoggedIn(true);
      setUsername('');
      setPassword('');

      toast.success('Login successful!', { position: 'top-right' }, {
  autoClose: 2000, 
});

      setTimeout(() => {
        navigate(redirectPath, { replace: true });
      }, 1500);

    } catch (err) {
      if (err.response) {
        if (err.response.data.detail) {
          toast.error(err.response.data.detail, { position: 'top-right' });
        } else if (typeof err.response.data === 'string') {
          toast.error(err.response.data, { position: 'top-right' });
        } else {
          toast.error('Invalid credentials. Please try again.', { position: 'top-right' });
        }
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
        <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
          <h3 className="text-center mb-4 text-dark">Login</h3>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
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
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-dark" disabled={loading}>
                {loading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                    Please wait...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </div>

            <p className="mt-3 text-center">
              Don't have an account? <a href="/register">Register</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPages.css'; 

function ErrorPages() {
  return (
    <>
    <br />
    <br />
    <br />
    <div className="error-container">
      <h1 className="error-heading">Oops! Page Not Found (404)</h1>
      <p className="error-text">The page you are looking for does not exist.</p>
      <Link to="/" className="error-link">Go back to Home</Link>
    </div>
    <br />
    <br />
    <br />
    <br />
    </>
  );
}

export default ErrorPages;

import React from 'react';
import heroImg from '../../images/OIP.webp';
import Categories from '../categories/categories';
const Hero = () => {
    return (
        <div className="container text-center my-5">
            <img
                src={heroImg}
                alt="Hero"
                className="img-fluid rounded-circle mb-4"
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />

            <h2 className="fw-bold">Aniket Vishwakarma</h2>
            <h5 className="text-muted">Collaborator & Editor</h5>

            <p className="mt-3">
                I am a full-stack developer passionate about crafting modern web applications with clean UI and powerful backend solutions.
            </p>
            <Categories/>
            <div className="d-flex justify-content-center gap-4 mt-4">
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-github fs-3 text-dark"></i>
                </a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-linkedin fs-3 text-primary"></i>
                </a>
                <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-twitter fs-3 text-info"></i>
                </a>
                <a href="https://facebook.com/yourusername" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-facebook fs-3 text-info"></i>
                </a>
            </div>
        </div>
    );
};

export default Hero;

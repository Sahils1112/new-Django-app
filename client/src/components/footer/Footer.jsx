import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMailUnread } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { PiGitlabLogoSimpleFill } from "react-icons/pi";
import { RiArchive2Fill } from "react-icons/ri";
import { TbBrandOauth } from "react-icons/tb";
import { IoIosContacts } from "react-icons/io";
import { FcAbout } from "react-icons/fc";
import { Link } from "react-router-dom";





const Footer = () => {
  return (
    <footer className="text-light pt-5 pb-4" style={{backgroundColor:"black"}}>
      <div className="container">
        <div className="row">

          {/* About + Social */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3 font-weight-bold ">DevOutlet</h5>
            <p>Empowering developers to build, share, and connect across the globe with awesome tools and technologies.</p>
            <div className="d-flex gap-3 mt-3">
              <Link to="#" className="text-light"><FaFacebookF size={40} color=""  /></Link>
              <Link to="#" className="text-light"><FaTwitter size={40} color=""  /></Link>
              <Link to="#" className="text-light"><FaInstagram size={40} color="" /></Link>
              <Link to="#" className="text-light"><FaGithub size={40} color=""  /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 mb-4">
            <h5 className="text-uppercase mb-3 font-weight-bold ">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none"><FaHome /> Home</Link></li>
              <li><Link to="/about" className="text-light text-decoration-none"><FcAbout /> About</Link></li>
              <li><Link to="#" className="text-light text-decoration-none"><PiGitlabLogoSimpleFill /> Blog</Link></li>
              <li><Link to="#" className="text-light text-decoration-none"><RiArchive2Fill /> Archived</Link></li>
              <li><Link to="#" className="text-light text-decoration-none"><TbBrandOauth /> Author</Link></li>
              <li><Link to="/contect" className="text-light text-decoration-none"><IoIosContacts /> Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3 mb-4">
            <h5 className="text-uppercase mb-3 font-weight-bold ">Contact</h5>
            <p className="mb-1"><IoMdMailUnread size={20}/> info@devoutlet.com</p>
            <p className="mb-1"><IoPhonePortraitOutline  size={20}/> +91 9876543210</p>
            <p className="mb-1"><FaLocationDot size={20}/> India</p>
          </div>

          {/* Newsletter */}
          <div className="col-md-2 mb-4">
            <h5 className="text-uppercase mb-3 font-weight-bold ">Newsletter</h5>
            <p className="small">Get blog articles and offers via email</p>
            <form className="d-flex flex-column gap-2">
              <input type="email" className="form-control form-control-sm" placeholder="Your email" />
              <button className="btn btn-warning btn-sm" type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Bottom line */}
        <div className="text-center mt-4">
          <hr className="bg-light" />
          {/* <p>Aj style !</p> */}
          <p className=" mb-0" style={{color:""}}>© {new Date().getFullYear()} <strong>DevOutlet</strong>. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

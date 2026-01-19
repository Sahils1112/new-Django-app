import React from "react";
import "./About.css";
import { Zap, Palette, Wrench, BookOpen } from "lucide-react";
import { RiAncientGateFill } from "react-icons/ri";
import { SiBungie } from "react-icons/si";



const About = () => {
  return (
    <div className="container about-section py-5">
      <div className="row align-items-center mb-5">
        {/* Left Image */}
        <div className="col-md-6">
          <img
            src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb"
            alt="Developers Working"
            className="img-fluid rounded shadow-lg"
          />
        </div>
        {/* Right Text */}
        <div className="col-md-6">
          <h1 className="fw-bold mb-4"><SiBungie size={60} color="gray"/>&nbsp;
            About <span className="highlight">DevOutlet</span>
          </h1>
          <p className="text-muted">
            Welcome to <strong>DevOutlet</strong> — your one-stop shop for all things
            tech, code, and creativity. We’re a passionate team of developers,
            designers, and problem-solvers who believe in building innovative
            tools for a better web.
          </p>
          <p className="text-muted">
            Our mission is simple: make high-quality, developer-friendly products
            that save time and spark inspiration.
          </p>
        </div>
      </div>

      {/* Second Row (Image Right + Text Left) */}
      <div className="row align-items-center mb-5 flex-md-row-reverse">
        {/* Right Image */}
        <div className="col-md-6">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            alt="Developers Working Together"
            className="img-fluid rounded shadow-lg"
          />

        </div>
        {/* Left Text */}
        <div className="col-md-6">
          <h2 className="fw-bold mb-3"><SiBungie/>&nbsp;&nbsp;What We Do 🚀<RiAncientGateFill/></h2>
          <ul className="about-list">
            <li className="flex items-center gap-2">
              <Zap size={26} className="text-yellow-500" /> &nbsp;&nbsp;&nbsp;
              Cutting-edge web & app development
            </li>
            <li className="flex items-center gap-2">
              <Palette size={26} className="text-pink-500" /> &nbsp;&nbsp;&nbsp;
              UI/UX design with attention to detail
            </li>
            <li className="flex items-center gap-2">
              <Wrench size={26} className="text-blue-500" /> &nbsp;&nbsp;&nbsp;
              Developer tools & open-source projects
            </li>
            <li className="flex items-center gap-2">
              <BookOpen size={26} className="text-green-500" />&nbsp;&nbsp;&nbsp;
              Tutorials, tips, and guides for learners
            </li>
          </ul>
        </div>
      </div>

      {/* Third Row (Image Left + Text Right) */}
      <div className="row align-items-center">
        <div className="col-md-6">
          <img
            src="https://images.unsplash.com/photo-1556761175-4b46a572b786"
            alt="Team Collaboration"
            className="img-fluid rounded shadow-lg"
          />
        </div>
        <div className="col-md-6">
          <h2 className="fw-bold mb-3"><SiBungie size={60}/>&nbsp;&nbsp;Why Choose Us? 💡</h2>
          <p className="text-muted">
            At DevOutlet, we value <strong>quality</strong>,{" "}
            <strong>transparency</strong>, and <strong>community</strong>.
            Every product we make is tested by developers, for developers.
            We believe in sharing knowledge and helping you grow.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

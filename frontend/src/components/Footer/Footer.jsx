import React from "react";
import "./Footer.css";

import githubIcon from "../../assets/icons/github.png";
import linkedinIcon from "../../assets/icons/linkedin.png";
import resumeIcon from "../../assets/icons/resume.png";
import ibmLogo from "../../assets/certification/ibm_logo.jpeg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Social Links - Left */}
        <div className="footer-social">
          <a
            href="https://github.com/pratikrhalnor"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="GitHub"
          >
            <div className="footer-social-icon github-icon">
              <img src={githubIcon} alt="GitHub" />
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/pratikhalnor"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="LinkedIn"
          >
            <div className="footer-social-icon linkedin-icon">
              <img src={linkedinIcon} alt="LinkedIn" />
            </div>
          </a>

          <a
            href="/PRATIK_HALNOR.pdf"
            download
            className="footer-social-link"
            aria-label="Download Resume"
          >
            <div className="footer-social-icon resume-icon">
              <img src={resumeIcon} alt="Resume" />
            </div>
          </a>
        </div>

        {/* Center - Project Contact */}
        <div className="footer-center">
          <div className="footer-project-contact">
            <p className="footer-project-title">Have a project in mind?</p>
            <a 
              href="mailto:halnorpratik2004@gmail.com" 
              className="footer-email-link"
            >
              halnorpratik2004@gmail.com
            </a>
          </div>
        </div>

        {/* Certification - Right */}
        <div className="footer-certification">
          <span className="footer-certification-label">IBM Certified</span>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-certification-link"
            aria-label="IBM Certification"
          >
            <div className="footer-certification-icon">
              <img src={ibmLogo} alt="IBM Certification" />
            </div>
          </a>
        </div>
      </div>

      {/* Copyright at bottom */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          © {currentYear} Pratik Halnor. All rights reserved.
        </p>
        <p className="footer-built">
          Built with React • Crafted with care
        </p>
      </div>
    </footer>
  );
};

export default Footer;
import React from "react";
import ibmLogo from "../../assets/certification/ibm_logo.jpeg";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">


      {/* DIVIDER */}
      <div className="footer-divider" />

      {/* RIGHT — CERTIFICATION */}
      <div className="footer-cert">
        <p className="footer-title">Certifications</p>

        <a href="#" target="_blank" rel="noopener noreferrer">
          <img
            src={ibmLogo}
            alt="IBM Certification"
            className="footer-cert-logo"
          />
        </a>
      </div>

    </footer>
  );
};

export default Footer;

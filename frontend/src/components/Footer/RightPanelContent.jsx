import React, { useState } from "react";
import ibmLogo from "../../assets/certification/ibm_logo.jpeg";

const RightPanelContent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      // 🔒 Guard against HTML error pages
      const text = await response.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Server error. Please try again later.");
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-container custom-scrollbar">
      {/* CONTACT FORM — UNCHANGED */}
      <div className="form-section">
        <div className="form-header">
          <h2>Let’s Build Something Impactful</h2>
          <p>
            Have an idea, a project, or an opportunity in mind?
            <br />
            Drop a message
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="your-name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your-email@domain.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="3"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Sending..." : "Connect"}
          </button>
        </form>
      </div>

      {/* CERTIFICATIONS — ONLY LOGO */}
      <div className="certification-section">
        <p className="cert-title">Certifications</p>

        <a
          href="#" // 👉 add Google Drive link later
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={ibmLogo}
            alt="IBM Certification"
            className="cert-logo"
          />
        </a>
      </div>
    </div>
  );
};

export default RightPanelContent;

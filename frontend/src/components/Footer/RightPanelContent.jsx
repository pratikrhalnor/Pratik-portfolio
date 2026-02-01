import React, { useState } from 'react';
import ibmLogo from '../../assets/certification/ibm_logo.jpeg';

const RightPanelContent = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);
    const BACKEND_URL =
        import.meta.env.VITE_BACKEND_URL ||
        'https://portfolio-u8g6.onrender.com/api/contact';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    subject: 'Portfolio Contact Form',
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Message sent successfully! I will get back to you soon.');
                setFormData({ name: '', email: '', message: '' });
            } else {
                throw new Error(data.error || data.message || 'Failed to send message');
            }
        } catch (error) {
            alert(error.message || 'Unable to send message. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="content-container custom-scrollbar">
            {/* CONTACT SECTION — UNCHANGED */}
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
                            autoComplete="name"
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
                            autoComplete="email"
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
                            autoComplete="off"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell me about your project..."
                            rows="3"
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Sending...' : 'Connect'}
                    </button>
                </form>
            </div>

            {/* CERTIFICATIONS — TITLE + IBM LOGO ONLY */}
            <div className="certification-section flex flex-col items-center">
                <p className="cert-title">Certifications</p>

                <a
                    href="https://drive.google.com/drive/folders/1DZGAgrT8D8cwezzdi2V5RpK0viXQzjGZ?usp=drive_link"
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

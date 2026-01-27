import React, { useState } from 'react';
import awsLogo from '../../assets/certification/aws.png';
import simplilearnLogo from '../../assets/certification/simplilearn.png';
import stanfordLogo from '../../assets/certification/stanford.png';
import accentureLogo from '../../assets/certification/accenture.png';

const RightPanelContent = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const [loading, setLoading] = useState(false);

    // Backend API URL (default to local if not set)
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api/contact';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    subject: 'Portfolio Contact Form' // Default subject
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Message sent successfully! I will get back to you soon.');
                setFormData({ name: '', email: '', message: '' });
            } else {
                // Try to extract the specific error message from the backend response
                const errorMessage = data.error?.message || data.message || 'Failed to send message';
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error('Submission Error:', error);
            alert(`Error: ${error.message}\n\nAttempted URL: ${BACKEND_URL}\n\n(If it shows localhost, your Vercel redeploy didn't pick up the environment variable)`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="content-container custom-scrollbar ">
            <div className="form-section">
                <div className="form-header">
                    <h2>Let’s Build Something Impactful</h2>
                    <p>Have an idea, a project, or an opportunity in mind?<br />Drop a message</p>
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
                        ></textarea>
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Sending...' : 'Connect'}
                    </button>
                </form>
            </div>

            <div className="certification-section">
                <p className="cert-title">Certified</p>
                <div className="certification-logos">
                    <a href="https://www.credly.com/badges/c99ec8d4-569a-4830-abc2-672959976f1e/public_url" target="_blank" rel="noopener noreferrer">
                        <img src={awsLogo} alt="AWS Certification" className="cert-logo" title="View AWS Credential" />
                    </a>
                    <a href="https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIzMjc3IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvOTEwOTQwMl85NDcxOTgzMTc2MDc5NjcyMzQ2MS5wbmciLCJ1c2VybmFtZSI6IktyaXNobmEgV2FibGUifQ%3D%3D&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F6075%2FFull-Stack%2520Development%2520101%2Fcertificate%2Fdownload-skillup&%24web_only=true&_branch_match_id=1527372308076950530&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FV9zMqr8gNSvONikiyrytKTUstKsrMS49PKsovL04tsnVNSU8FAKZmsBg9AAAA" target="_blank" rel="noopener noreferrer">
                        <img src={simplilearnLogo} alt="Simplilearn Certification" className="cert-logo" title="View Simplilearn Credential" />
                    </a>
                    <a href="https://www.coursera.org/account/accomplishments/specialization/certificate/OUDX2NWI2WGQ" target="_blank" rel="noopener noreferrer">
                        <img src={stanfordLogo} alt="Stanford Certification" className="cert-logo" title="View Stanford Credential" />
                    </a>
                    <a href="https://www.futurelearn.com/certificates/l12jy74" target="_blank" rel="noopener noreferrer">
                        <img src={accentureLogo} alt="Accenture Certification" className="cert-logo" title="View Accenture Credential" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RightPanelContent;

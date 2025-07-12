import { useState } from "react";
import "../css/contactUs.css";

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can add logic to send the form data
        console.log("Form submitted:", formData);
        alert("Thank you for your message! We'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            
            {/* Contact Information Section */}
            <div className="contact-info-section">
                <div className="contact-info-card">
                    <div className="contact-info-item">
                        <div className="contact-icon">📍</div>
                        <div className="contact-details">
                            <h3>Our Location</h3>
                            <p>New Delhi, India ,</p>
                        </div>
                    </div>
                    
                    
                    <div className="contact-info-item">
                        <div className="contact-icon">✉️</div>
                        <div className="contact-details">
                            <h3>Email Address</h3>
                            <p>piyushkochar909@gmail.com</p>

                        </div>
                    </div>
                    
                    <div className="contact-info-item">
                        <div className="contact-icon">🕒</div>
                        <div className="contact-details">
                            <h3>Business Hours</h3>
                            <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                            <p>Saturday: 10:00 AM - 6:00 PM</p>
                            <p>Sunday: 12:00 PM - 5:00 PM</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Media Section */}
        

            {/* FAQ Section */}
            <div className="faq-section">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-item">
                    <h3>How can I track my order?</h3>
                    <p>You can track your order by logging into your account and visiting the "My Orders" section. You'll receive tracking updates via email as well.</p>
                </div>
                <div className="faq-item">
                    <h3>What is your return policy?</h3>
                    <p>We offer a 30-day return policy for all items in their original condition. Returns are free for items over $50.</p>
                </div>
                <div className="faq-item">
                    <h3>Do you ship internationally?</h3>
                    <p>Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location.</p>
                </div>
            </div>

            {/* Contact Form Section */}
            <div className="contact-form-section">
                <h2>Send us a Message</h2>
                <div className="contact-form-wrapper">
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter your name"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter your email"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="subject">Subject:</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                placeholder="Enter subject"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="message">Message:</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder="Enter your message"
                                rows="5"
                            ></textarea>
                        </div>
                        
                        <button type="submit" className="submit-btn">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>

            {/* Map Section */}
            <div className="map-section">
                <h2>Find Us</h2>
                <div className="map-placeholder">
                    <div className="map-content">
                        <span className="map-icon">🗺️</span>
                        <p>Interactive Map Coming Soon</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

//test comment
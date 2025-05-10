import React from 'react';
import './landing.css';
import logo from '../assets/images/logo.png';
import herosection from '../assets/images/herosection.svg';
import faceLogin from '../assets/images/faceLogin.svg';
import voiceAudio from '../assets/images/voiceAudio.svg';
import liveCam from '../assets/images/liveCam.svg';
import connectionAi from '../assets/images/connectionAi.svg';
import supportCircle from '../assets/images/supportCircle.svg';
import privacy from '../assets/images/privacy.svg';

const Landing = () => {
    return (
        <div className="landing-container">
            {/* Navbar */}
            <nav className="landing-navbar">
                <div className="landing-logo">@ MemoPal</div>
                <div className="landing-navlinks">
                    <a href="#" className="landing-link">Home</a>
                    <a href="#" className="landing-link">Features</a>
                    <a href="#" className="landing-link">How-It-Works</a>
                    <a href="#" className="landing-link">About-Us</a>
                </div>
                <div className="landing-auth">
                    <button className="landing-signin"><a href="./sign-in.jsx">Sign In</a></button>
                    <button className="landing-signup"><a href="/signup.jsx">Sign Up</a></button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="landing-hero">
                <div className="landing-hero-text">
                    <h1 className="landing-hero-title">MemoPal Your AI-Powered Memory Companion</h1>
                    <div className="landing-hero-subtitle">Empowering Minds, Enhancing Lives</div>
                    <div className="landing-hero-desc">
                        MemoPal helps individuals with memory challenges recognize loved ones, recall shared moments, and stay connected—all through a beautiful, intuitive interface.
                    </div>
                </div>
                <div className="landing-hero-illustration">
                    <img src={herosection} alt="Hero Illustration" className="landing-hero-img" />
                </div>
            </section>

            {/* Features Section */}
            <section className="landing-features">
                <h2 className="landing-section-title">Here's How MemoPal Can Help</h2>
                <div className="landing-features-grid">
                    <div className="landing-tile">
                        <div className="landing-tile-icon">
                            <img src={faceLogin} alt="Facial Recognition Login" />
                        </div>
                        <div className="landing-tile-title">Facial Recognition Login</div>
                        <div className="landing-tile-desc">Stay passwordless for logins and protection. Login with security, effortlessly and instantly.</div>
                    </div>
                    <div className="landing-tile">
                        <div className="landing-tile-icon">
                            <img src={voiceAudio} alt="Voice & Audio Interaction" />
                        </div>
                        <div className="landing-tile-title">Voice & Audio Interaction</div>
                        <div className="landing-tile-desc">Control the app with simple voice commands and receive valuable feedback for comprehension.</div>
                    </div>
                    <div className="landing-tile">
                        <div className="landing-tile-icon">
                            <img src={liveCam} alt="Live Camera Interface" />
                        </div>
                        <div className="landing-tile-title">Live Camera Interface</div>
                        <div className="landing-tile-desc">Be at ease: interface and live photo recognition, always there to refresh memory.</div>
                    </div>
                    <div className="landing-tile">
                        <div className="landing-tile-icon">
                            <img src={connectionAi} alt="Add Connections with AI" />
                        </div>
                        <div className="landing-tile-title">Add Connections with AI</div>
                        <div className="landing-tile-desc">Don't remember someone's info? AI-based system helps you connect with others just by conversation.</div>
                    </div>
                </div>
            </section>

            {/* Support Circle Section */}
            <section className="landing-support">
                <h2 className="landing-section-title">Built for You and Your Support Circle</h2>
                <div className="landing-support-tile">
                    <div className="landing-support-icon">
                        <img src={supportCircle} alt="Support Circle" />
                    </div>
                    <div className="landing-support-desc">
                        <div>Whether you're a user or a caregiver, MemoPal supports:</div>
                        <ul>
                            <li>Users with Alzheimer's, dementia, PTSD, brain injuries, or cognitive challenges</li>
                            <li>Caregivers, families, and friends who ensure recognition, connection, and reassurance</li>
                            <li>Memory retention and emotional logs for a better life</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Privacy Section */}
            <section className="landing-privacy">
                <h2 className="landing-section-title">Privacy First</h2>
                <div className="landing-privacy-tile">
                    <div className="landing-privacy-icon">
                        <img src={privacy} alt="Privacy" />
                    </div>
                    <div className="landing-privacy-desc">
                        <div>We protect what you remember.</div>
                        <div>Your facial/audio and memories are encrypted and stored securely. Your privacy is our top priority.</div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="landing-cta">
                <div className="landing-cta-desc">Start your journey toward connected, confident living.</div>
                <button className="landing-cta-btn">Launch MemoPal</button>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div>© 2025 MemoPal. All rights reserved. Designed with care for cognitive wellness.</div>
            </footer>
        </div>
    );
};

export default Landing;

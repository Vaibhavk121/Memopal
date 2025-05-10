import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './landing.css';
import logo from '../assets/images/logo.png';
import herosection from '../assets/images/herosection.svg';
import faceLogin from '../assets/images/faceLogin.svg';
import voiceAudio from '../assets/images/voiceAudio.svg';
import liveCam from '../assets/images/liveCam.svg';
import connectionAi from '../assets/images/connectionAi.svg';
import supportCircle from '../assets/images/supportCircle.svg';
import privacy from '../assets/images/privacy.svg';
import { Button } from "@/components/ui/button";

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-[#181c24] flex flex-col items-center">
            {/* Navbar */}
            <nav className="w-full max-w-6xl flex justify-between items-center py-6 px-6">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="Logo" style={{ width: 32, height: 32 }} />
                    <span className="text-white font-bold text-2xl tracking-tight">MemoPal</span>
                </div>
                <div className="flex gap-8">
                    <a href="#" className="text-gray-400 hover:text-white transition">Home</a>
                    <a href="#" className="text-gray-400 hover:text-white transition">Features</a>
                    <a href="#" className="text-gray-400 hover:text-white transition">How-It-Works</a>
                    <a href="#" className="text-gray-400 hover:text-white transition">About-Us</a>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-900/10 hover:text-white" asChild>
                        <a href="/signin">Sign In</a>
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white" asChild>
                        <a href="/signup">Sign Up</a>
                    </Button>
                </div>
            </nav>

            {/* Hero */}
            <section className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-10 mt-10 px-6">
                <div className="flex-1">
                    <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
                        MemoPal: Your AI-Powered Memory Companion
                    </h1>
                    <p className="text-lg text-gray-400 mb-6 max-w-xl">
                        MemoPal helps individuals with memory challenges recognize loved ones, recall shared moments, and stay connected—all through a beautiful, intuitive interface.
                    </p>
                    <Button className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-8 py-4 text-lg shadow-lg" asChild>
                        <a href="/signin">Launch MemoPal</a>
                    </Button>
                </div>
                <img src={herosection} alt="Hero" className="w-[340px] drop-shadow-2xl rounded-xl" />
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
                <button className="landing-cta-btn" onClick={() => navigate('/signin')}>
                    Launch MemoPal
                </button>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div>© 2025 MemoPal. All rights reserved. Designed with care for cognitive wellness.</div>
            </footer>
        </div>
    );
};

export default Landing;

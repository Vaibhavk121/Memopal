// Enhanced Landing Page: landing.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';
import logo from '../assets/images/logo.png';
import herosection from '../assets/images/herosection.svg';
import faceLogin from '../assets/images/faceLogin.svg';
import voiceAudio from '../assets/images/voiceAudio.svg';
import liveCam from '../assets/images/liveCam.svg';
import connectionAi from '../assets/images/connectionAi.svg';
import supportCircle from '../assets/images/supportCircle.svg';
import privacy from '../assets/images/privacy.svg';
import { Button } from '@/components/ui/button';

const Landing = () => {
    const navigate = useNavigate();

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-[#0f2027] via-[#203a43] to-[#2c5364] text-white font-sans">
            {/* Navbar */}
            <nav className="w-full max-w-7xl mx-auto flex justify-between items-center py-6 px-6 animate-fade-in sticky top-0 bg-gradient-to-b from-[#0f2027] via-[#203a43] to-[#2c5364] z-50">
                <div className="flex items-center gap-3">
                    <img src={logo} alt="MemoPal Logo" className="w-10 h-10" />
                    <span className="text-white font-extrabold text-3xl tracking-tight">MemoPal</span>
                </div>
                <div className="hidden md:flex gap-10 text-lg">
                    <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="hover:text-cyan-400 transition-all duration-300">Home</a>
                    <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }} className="hover:text-cyan-400 transition-all duration-300">Features</a>
                    <a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }} className="hover:text-cyan-400 transition-all duration-300">How-It-Works</a>
                    <a href="#about-us" onClick={(e) => { e.preventDefault(); scrollToSection('about-us'); }} className="hover:text-cyan-400 transition-all duration-300">About-Us</a>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-600/10 hover:text-white" asChild>
                        <a href="/signin">Sign In</a>
                    </Button>
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-xl" asChild>
                        <a href="/signup">Sign Up</a>
                    </Button>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-14 mt-12 px-6 animate-slide-in min-h-[calc(100vh-80px)]">
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
                        Your AI-Powered Memory Companion
                    </h1>
                    <p className="text-xl text-gray-300 mb-6">
                        MemoPal empowers those facing memory challenges to reconnect, recall, and relive precious moments.
                    </p>
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 text-lg shadow-lg hover:scale-105 transition-transform duration-300" asChild>
                        <a href="/signin">Launch MemoPal</a>
                    </Button>
                </div>
                <div className="flex-1 flex justify-center items-center">
                    <img src={herosection} alt="Hero" className="w-full max-w-[380px] drop-shadow-2xl rounded-xl animate-float" />
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-6 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-14">Here's How MemoPal Can Help</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[{ img: faceLogin, title: "Facial Recognition Login", desc: "Passwordless logins with face recognition." },
                    { img: voiceAudio, title: "Voice & Audio Interaction", desc: "Control the app with your voice." },
                    { img: liveCam, title: "Live Camera Interface", desc: "Recognize people in real time." },
                    { img: connectionAi, title: "Add Connections with AI", desc: "AI connects faces with names." }].map((feature, idx) => (
                        <div key={idx} className="bg-white/5 rounded-xl p-6 text-center backdrop-blur-md hover:scale-105 transition-transform duration-300">
                            <img src={feature.img} alt={feature.title} className="w-12 h-12 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-300 text-sm">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-20 px-6 max-w-6xl mx-auto text-center animate-fade-in">
                <h2 className="text-3xl font-bold mb-8">Built for You and Your Support Circle</h2>
                <div className="flex flex-col md:flex-row items-center gap-8 bg-white/5 rounded-xl p-8 backdrop-blur-md">
                    <img src={supportCircle} alt="Support Circle" className="w-20 h-20" />
                    <ul className="text-gray-300 text-left space-y-3 text-md">
                        <li>• Users with Alzheimer's, dementia, PTSD, or cognitive challenges</li>
                        <li>• Families and caregivers supporting memory wellness</li>
                        <li>• Emotionally meaningful connections retained and enriched</li>
                    </ul>
                </div>
            </section>

            {/* About Us Section */}
            <section id="about-us" className="py-20 px-6 max-w-6xl mx-auto text-center animate-slide-in">
                <h2 className="text-3xl font-bold mb-8">Privacy First</h2>
                <div className="flex flex-col md:flex-row items-center gap-8 bg-white/5 rounded-xl p-8 backdrop-blur-md">
                    <img src={privacy} alt="Privacy" className="w-20 h-20" />
                    <div className="text-gray-300 text-md">
                        <p className="mb-2">We protect what you remember.</p>
                        <p>Your data is encrypted and stored with utmost security. Your privacy is our top priority.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-cyan-600 to-blue-700 text-white text-center animate-fade-in">
                <h2 className="text-2xl font-bold mb-4">Ready to reconnect and relive?</h2>
                <button onClick={() => navigate('/signin')} className="bg-white text-cyan-600 font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300">
                    Launch MemoPal
                </button>
            </section>

            {/* Footer */}
            <footer className="py-6 text-center text-gray-400 text-sm">
                © 2025 MemoPal. Crafted with love and purpose for cognitive wellness.
            </footer>
        </div>
    );
};

export default Landing;

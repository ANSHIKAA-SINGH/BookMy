import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Landingpage = () => {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigate = useNavigate();

  const handleLoginRegister = () => {
    navigate('/login');
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full p-2 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-blue-500 opacity-80 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-around items-center">
        <div className="text-white text-lg p-1 font-extrabold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] flex max-sm:font-normal">
          <svg className="w-6 h-6" viewBox="0 0 384 512">
            <path
              fill="red"
              d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
            />
          </svg>
          BookMyGuide
        </div>
        <nav className="items-center justify-center ">
          <ul className="flex space-x-2 text-white">
            <li>
              <button
                className="justify-center rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                onClick={handleLoginRegister}
              >
                Login / Register
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="bg-cover bg-center h-screen text-blue-100 bg-[url('https://utfs.io/f/cd433943-6e40-4910-8f01-792a40ee2a05-1kh0af.jpeg')] ">
      <div className="container mx-auto lg:items-center h-full flex flex-col justify-center ">
        <h1 className="text-3xl p-2 flex max-sm:flex-col gap-2 font-bold mb-4 ">
          Welcome to{' '}
          <span className="shadow-2xl flex items-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            {' '}
            <svg className="w-8 h-8" viewBox="0 0 384 512">
              <path
                fill="red"
                d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
              />
            </svg>
            BookMyGuide
          </span>
        </h1>
        <h2 className="text-3xl max-sm:text-2xl p-2 font-bold mb-4 ">
          <span className="shadow-2xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Explore the World with Us
          </span>
        </h2>
        <p className="text-2xl p-2  ">
          <span className="shadow-2xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Book your Guide at cheapest price
          </span>
        </p>

        <p className="text-2xl p-2  ">
          <span className="shadow-2xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Start earning by becoming a Guide
          </span>
        </p>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      title: 'Exclusive Deals',
      description: 'Get the best deals available only to our customers.',
    },
    {
      title: 'Top Destinations',
      description: 'We offer trips to the most popular destinations.',
    },
    {
      title: 'Personalized Itineraries',
      description: 'Customize your travel plans according to your preferences.',
    },
    {
      title: 'Start Earning',
      description:
        'If you are a local, then you can become a guide for your place and start earning!!',
    },
  ];

  return (
    <section id="features" className="py-12 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us</h2>
        <div className="flex flex-wrap justify-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="max-w-sm w-full sm:w-1/2 lg:w-1/3 px-4 mb-8"
            >
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white py-6">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 BookMyGuide. All rights reserved.</p>
        <p>Contact: support@bookmyguide.com</p>
        <nav className="flex justify-center space-x-4 mt-2">
          <a
            href="https://www.linkedin.com/in/anshika-singh-1a503126b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            className="hover:underline"
          >
            About
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Landingpage;

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Home.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userdata = location.state?.userdata || {};
  axios.defaults.withCredentials = true;

  useEffect(() => {
    console.log(userdata);
    axios
      .post('http://localhost:3000/home', { userdata })
      .then((res) => {
        if (!res.data.valid) {
          navigate('/login');
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <Header />
      <Hero />
      <Features />
      <Footer />
      <ToastContainer />
    </div>
  );
};

const Header = () => {
  const location = useLocation();
  const userdata = location.state?.userdata || {};
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    axios
      .post('http://localhost:3000/logout', { userdata })
      .then((res) => {
        if (res.data.status) {
          navigate('/');
        }
      })
      .catch((err) => console.log('error logging out! ', err));
  };

  const handleProfile = () => {
    navigate('/profile', { state: { userdata } });
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full p-2 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-blue-500 opacity-80 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto flex justify-between items-center">
        <div className="text-white text-lg p-1 font-extrabold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] flex max-sm:font-normal">
          <svg className="w-6 h-6" viewBox="0 0 384 512">
            <path
              fill="red"
              d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
            />
          </svg>
          BookMyGuide
        </div>
        <nav className="items-center justify-center">
          <ul className="flex space-x-2 text-white">
            <li>
              <p className="hover:font-bold p-1 font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] underline rounded-lg">
                Home
              </p>
            </li>
            <li>
              <button
                onClick={handleProfile}
                className="hover:text-black hover:font-bold font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] hover:bg-blue-100 rounded-lg p-1"
              >
                My Profile
              </button>
            </li>
            <li>
              <button
                className="justify-center rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

const Hero = () => {
  const location = useLocation();
  const userdata = location.state?.userdata || {};
  const [formData, setFormData] = useState({ location: '' });
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    formData.location = formData.location.trim().toUpperCase();

    if (!formData.location) {
      toast.warn('Search location cannot be empty!', {
        position: 'top-center',
        autoClose: 4000,
        theme: 'dark',
      });
    } else {
      axios
        .post('http://localhost:3000/search', formData)
        .then((res) => {
          if (res.data.length === 0) {
            toast.warn('No guide found for your search!', {
              position: 'top-center',
              autoClose: 5000,
              theme: 'dark',
            });
          } else {
            navigate('/searchresult', {
              state: { results: res.data, userdata },
            });
          }
        })
        .catch((err) => console.log('search m error', err));
    }
  };

  return (
    <section className="bg-cover bg-center h-screen text-blue-100 hero">
      <div className="max-w-[1280px] mx-auto h-full flex flex-col justify-center">
        <h1 className="text-5xl p-2 font-bold mb-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Explore the World with Us
        </h1>
        <p className="text-2xl p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Book your Guide at cheapest price
        </p>

        <form onSubmit={submitHandler} className="w-[80%] xl:w-[45%] mt-4 p-2">
          <div className="mb-1">
            <label htmlFor="location" className="text-m form-label">
              Search available Guides here
            </label>
          </div>
          <div className="flex gap-2">
            <input
              name="location"
              value={formData.location}
              onChange={onChangeHandler}
              type="text"
              placeholder="Where do you want to go? Enter Location"
              className="w-[120%] md:w-[200%] rounded-md border-0 py-1.5 shadow-sm ring-1 opacity-50 ring-inset placeholder:text-cyan-900 focus:opacity-70 focus:text-blue-950 focus:ring-2 focus:ring-inset focus:ring-indigo-900 sm:text-sm sm:leading-6 p-1"
            />
            <button
              type="submit"
              className="flex w-[50%] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Book Now
            </button>
          </div>
        </form>
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
      title: 'Start Earning',
      description:
        'If you are a local, then you can become a guide for your place and start earning!!',
    },
    {
      title: 'Personalized Itineraries',
      description: 'Customize your travel plans according to your preferences.',
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
            href="https://www.linkedin.com/in/anshika-singh-1a503126b"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            About
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Home;

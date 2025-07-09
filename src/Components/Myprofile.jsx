import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Myprofile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let { customerdata, userdata } = location.state || {};
  const initialProfile = userdata === undefined ? customerdata : userdata;
  const [profiledata, setProfiledata] = useState(initialProfile);

  useEffect(() => {
    axios
      .post('http://localhost:3000/profile', { profiledata })
      .then((res) => {
        if (!res.data.valid) {
          navigate('/login');
        }
      })
      .catch((err) => console.log(err));
  }, [profiledata, navigate]);

  const handleBack = () => {
    navigate('/home', { state: { userdata: profiledata } });
  };

  const handleLogout = () => {
    axios
      .post('http://localhost:3000/logout', { email: profiledata.email })
      .then((res) => {
        if (res.data.status) {
          navigate('/login');
        }
      })
      .catch((err) => console.log('error logging out! ', err));
  };

  const handleDone = async (booking) => {
    try {
      const res = await axios.post('http://localhost:3000/delete', {
        e: booking,
        profiledata,
      });

      if (res.data === 'deleted') {
        toast.success('Booking cancelled successfully!', {
          position: 'top-center',
          autoClose: 3000,
          theme: 'dark',
        });

        // Update frontend state to reflect the deletion
        setProfiledata((prev) => ({
          ...prev,
          bookings: prev.bookings?.filter(
            (b) => !(b.email === booking.email && b.date === booking.date)
          ),
          customers: prev.customers?.filter(
            (c) => !(c.email === booking.email && c.date === booking.date)
          ),
        }));
      } else {
        toast.error('Failed to cancel booking', {
          position: 'top-center',
          autoClose: 3000,
          theme: 'dark',
        });
      }
    } catch (err) {
      console.error('Error cancelling booking:', err);
      toast.error('Error cancelling booking', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'dark',
      });
    }
  };

  return (
    <>
      <div className="flex gap-2 justify-around p-1 max-sm:justify-center bg-blue-400 items-center">
        <svg
          onClick={handleBack}
          className="bg-blue-700 hover:bg-indigo-400 p-1.5 absolute rounded-lg hover:cursor-pointer left-2"
          height="30px"
          viewBox="0 -960 960 960"
          width="30px"
          fill="#e8eaed"
        >
          <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
        </svg>
        <div className="text-white text-lg p-2 font-extrabold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] max-sm:font-normal flex">
          <svg className="w-6 h-6" viewBox="0 0 384 512">
            <path
              fill="red"
              d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
            />
          </svg>
          BookMyGuide
        </div>
        <nav className="items-center flex justify-center ">
          <ul className="flex space-x-2 items-center text-white">
            <li>
              <p className="underline font-semibold p-1">My Profile</p>
            </li>
            <li>
              <button
                className="rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white hover:bg-indigo-800"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="container mx-auto p-4">
        <div className="bg-white shadow-xl rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
          <p>
            <strong>Name:</strong> {profiledata?.name}
          </p>
          <p>
            <strong>Email:</strong> {profiledata?.email}
          </p>
          <p>
            <strong>Account-type:</strong>{' '}
            {profiledata?.location ? 'Guide-Account' : 'User-Account'}
          </p>
        </div>

        {profiledata?.bookings?.length > 0 && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
            <ul className="space-y-4">
              {profiledata.bookings.map((b, i) => (
                <li
                  key={i}
                  className="border p-3 rounded-md relative bg-slate-100"
                >
                  <p>Name: {b.name}</p>
                  <p>Email: {b.email}</p>
                  <p>Location: {b.location}</p>
                  <p>Date: {b.date}</p>
                  <p>Rate: ₹{b.rate}</p>
                  <p>Status: {b.payment}</p>
                  <button
                    onClick={() => handleDone(b)}
                    className="absolute top-2 right-2 text-red-600 font-bold hover:underline"
                  >
                    Cancel Booking
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {profiledata?.customers?.length > 0 && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">My Customers</h2>
            <ul className="space-y-4">
              {profiledata.customers.map((c, i) => (
                <li
                  key={i}
                  className="border p-3 rounded-md relative bg-slate-100"
                >
                  <p>Name: {c.name}</p>
                  <p>Email: {c.email}</p>
                  <p>Date: {c.date}</p>
                  <p>Status: {c.payment}</p>
                  <button
                    onClick={() => handleDone(c)}
                    className="absolute top-2 right-2 text-red-600 font-bold hover:underline"
                  >
                    Done
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <ToastContainer />
    </>
  );
};

export default Myprofile;

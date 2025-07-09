import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Guideregister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    language: '',
    location: '',
    rate: '',
    password: '',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [isSubmitting, setisSubmitting] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
    setisSubmitting(true);
    {
      formData.location = formData.location.toUpperCase();
      formData.location = formData.location.trim();
    }

    // console.log('Data Registeted:', formData.location);

    // Add your form submission logic here, such as sending data to a server
    axios
      .post('http://localhost:3000/guideregister', formData)

      .then((response) => {
        console.log(response.data);
        setisSubmitting(false);
        if (response.data == 'already') {
          toast.warn('Already Registered email', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
        } else {
          //console.log("i m here")
          navigate('/login');
        }
        // Optionally clear the form or show a success message
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  return (
    <div className="flex min-h-full flex-col justify-center max-w-[320px] m-auto mt-4 px-6 rounded-xl bg-slate-300 py-12 lg:px-8">
      <div className="text-white justify-center items-center  text-lg p-1 font-extrabold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] flex ">
        <svg className="w-6 h-6" viewBox="0 0 384 512">
          <path
            fill="red"
            d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
          />
        </svg>
        BookMyGuide
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-2 text-center text-xl font-bold leading-9 tracking-tight text-gray-700">
          Guide Registration
        </h1>
        <form onSubmit={submitHandler} className="space-y-6">
          <div className="mb-3">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={onChangeHandler}
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
              type="email"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              name="password"
              value={formData.password}
              onChange={onChangeHandler}
              type="password"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Languages
            </label>
            <input
              name="language"
              value={formData.language}
              onChange={onChangeHandler}
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Location
            </label>
            <input
              name="location"
              value={formData.location}
              onChange={onChangeHandler}
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Hourly Rate
            </label>
            <input
              name="rate"
              value={formData.rate}
              onChange={onChangeHandler}
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
            />
          </div>
          <div className="d-grid col-6 mx-auto my-3">
            <button
              disabled={isSubmitting}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isSubmitting ? 'Submitting...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Guideregister;

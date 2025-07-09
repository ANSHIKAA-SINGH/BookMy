import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setisSubmitting] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  axios.defaults.withCredentials = true;

  const submitHandler = (e) => {
    e.preventDefault();
    setisSubmitting(true);

    axios
      .post('http://localhost:3000/login', formData)
      .then((response) => {
        setisSubmitting(false);
        if (response.data.user) {
          navigate('/home', { state: { userdata: response.data.user } });
        } else {
          toast.error('Invalid Credentials', {
            position: 'top-center',
            autoClose: 4000,
            theme: 'dark',
          });
        }
      })
      .catch((error) => {
        setisSubmitting(false);
        toast.error('Login error');
        console.error('Login error:', error);
      });
  };

  const [user, setUser] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setUser(tokenResponse);
    },
    onError: (error) => {
      console.error('Google Login Failed:', error);
      toast.error('Google Login Failed');
    },
  });

  useEffect(() => {
    if (user) {
      axios
        .post('http://localhost:3000/google-login', {
          access_token: user.access_token,
        })
        .then((res) => {
          if (res.data.user) {
            navigate('/home', { state: { userdata: res.data.user } });
          } else {
            toast.error('Google Login Error');
          }
        })
        .catch((err) => {
          console.error('Google Login Backend Error:', err);
          toast.error('Google Login Backend Error');
        });
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setUser(null);
  };

  return (
    <div className="flex justify-center">
      <div className="flex min-h-full flex-col justify-center p-4 items-center max-w-[300px] rounded-2xl px-6 mt-10 bg-slate-300">
        <div className="text-white text-lg p-1 font-extrabold flex items-center">
          <svg className="w-6 h-6 mr-2" viewBox="0 0 384 512">
            <path
              fill="red"
              d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
            />
          </svg>
          BookMyGuide
        </div>

        <h2 className="text-center text-xl font-bold text-gray-700 mt-2">
          Login to your account
        </h2>

        <form onSubmit={submitHandler} className="space-y-6 w-full mt-6">
          <div>
            <label>Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
              type="email"
              required
              className="block w-full rounded-md border py-1.5 px-2"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={onChangeHandler}
              type="password"
              required
              className="block w-full rounded-md border py-1.5 px-2"
            />
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full rounded-md bg-indigo-600 text-white py-2 font-semibold hover:bg-indigo-500"
          >
            {isSubmitting ? 'Submitting...' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-500 text-center">
          Don't have an account?
          <Link to="/signup" className="text-indigo-600 font-semibold ml-1">
            Create User Account
          </Link>
        </div>

        <div className="my-4 text-center text-gray-400 opacity-50">OR</div>

        <button
          onClick={login}
          className="flex items-center bg-white border rounded-lg shadow-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="h-5 w-5 mr-2"
          />
          Login with Google
        </button>

        <p className="mt-4 text-center text-sm text-gray-500">
          Looking for Business?
          <Link
            to="/guideregister"
            className="text-indigo-600 font-semibold ml-1"
          >
            Register as Guide
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;

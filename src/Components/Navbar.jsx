import React from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import './Navbar.css'


const Navbar = () => {
 
  const [formData, setFormData] = useState({
    location:""
  });

  const onChangeHandler = (e) => {
    const { name,value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate=useNavigate()
  const submitHandler = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    {formData.location=formData.location.toUpperCase();
      formData.location=formData.location.trim();
    }
    if(formData.location==''){
      toast.warn('Search location cannot be empty!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
    else{
    axios.post("https://bookmyguide.onrender.com/search",formData)
    .then(res=>{
      navigate('/searchresult')
      console.log(res.data);
    })
    .catch(err=>console.log("search m error",err))
    }
  };
  return (
    <>
    <nav className='flex sm:justify-around bg-blue-500 items-center justify-around'>
    <div className="text-white text-lg p-1 font-extrabold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">BookMyGuide</div>
    <form onSubmit={submitHandler} className="w-[45%] sm:w-[35%] p-2"> 
    <div className='flex  gap-0.5 sm:gap-2'>
    <input
      name="location"
      value={formData.location}
      onChange={onChangeHandler}
      type="location" placeholder=' Modify search '
      className=" w-[120%] md:w-[200%] rounded-md border-0 py-1.5 shadow-sm ring-1 opacity-80 ring-inset placeholder:text-cyan-900 focus:opacity-70 focus:text-blue-950  focus:ring-2 focus:ring-inset focus:ring-indigo-900 sm:text-sm sm:leading-6 p-2"
      
    />
    <button type="submit" className="flex w-8 sm:w-10 items-center justify-center rounded-md bg-indigo-600 px-1.5 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
    <svg  fill="#e8ebff" x="0px" y="0px" className='w-4 border-l-indigo-50 h-4' viewBox="0 0 50 50">
<path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
</svg>
    </button>
  </div>
</form>
  </nav>
  <div className='h-[85vh] bg-blue-200 object-cover  justify-center items-center'>
    <section className=' w-[45vw] backgr m-auto h-full opacity-50 rounded-lg p-1'>
      <ul className='flex flex-col p-1.5 gap-1.5 bg-white opacity-50 rounded-lg'>
        <li className='rounded-lg'>c</li>
        <li className='rounded-lg'>c</li>
        <li className='rounded-lg'>s</li>
      </ul>
    </section>
  </div>
  </>
  )
}

export default Navbar

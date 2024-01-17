import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  
  
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  

  const toggleMobileMenu = () => {


    setMobileMenuVisible(!mobileMenuVisible);



  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="  mx-auto flex items-center justify-between">
     
        <div className="text-white text-xl font-bold">
            <img className="w-28  object-cover "  src="/paytm.png" alt="Logo" />
        </div> 


        <div className="hidden md:flex space-x-4">
          <Link to={'/'} className="text-white  text-lg hover:text-purple-800  hover:text-xl">
            Home
          </Link>
          <Link to={'/history'} className="text-white  text-lg hover:text-purple-800  hover:text-xl">
            Payment History
          </Link>
          <Link to={'/'} className="text-white  text-lg hover:text-purple-800  hover:text-xl">
            Services
          </Link>
          <Link to={'/'} className="text-white  text-lg hover:text-purple-800  hover:text-xl">
            Contact
          </Link>
        </div>
 
        <div className="md:hidden"> 
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
 
          <div className={mobileMenuVisible ? "block" : "hidden"}>
            <Link to={'/'} className="block text-white py-2 hover:text-rose-600  ">
              Payment
            </Link>
            <Link to={'/history'} className="block text-white py-2 hover:text-rose-600  ">
              Payment History
            </Link>
            <Link to={'/'} className="block text-white py-2 hover:text-rose-600  ">
              Services
            </Link>
            <Link to={'/'} className="block text-white py-2 hover:text-rose-600  ">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

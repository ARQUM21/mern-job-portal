import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";

import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();

  const navigate = useNavigate();

  const {setShowRecruiterLogin} = useContext(AppContext);

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md py-2 sm:py-3 md:py-4">
      <div className="container px-3 sm:px-4 md:px-6 lg:px-8 2xl:px-20 mx-auto flex justify-between items-center">
        {/* Logo */}
        <img  
          onClick={() => navigate('/')}  
          className="cursor-pointer h-6 sm:h-8 md:h-10 lg:h-10 w-auto object-contain" 
          src={assets.logo} 
          alt="Logo" 
        />
        
        {/* User Section */}
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <Link 
              to={"/applications"}
              className="text-xs sm:text-sm md:text-base text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
            >
              Applied Jobs
            </Link>
            <p className="text-gray-300 hidden sm:block">|</p>
            <p className="text-xs sm:text-sm md:text-base max-sm:hidden text-gray-700 whitespace-nowrap">
              Hi, {user.firstName + " " + user.lastName}
            </p>
            <div className="scale-90 sm:scale-100">
              <UserButton />
            </div>
          </div>
        ) : (
          <div className="flex gap-2 sm:gap-3 md:gap-4 items-center">
            <button  
              onClick={e => setShowRecruiterLogin(true)} 
              className="text-gray-600 hover:text-gray-900 transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap"
            >
              Recruiter Login
            </button>
            <button
              onClick={(e) => openSignIn()}
              className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 sm:px-6 md:px-9 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm md:text-base whitespace-nowrap"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
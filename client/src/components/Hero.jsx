import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);
  };

  return (
    <div className="container 2xl:px-20 mx-auto my-6 sm:my-8 md:my-10 px-4">
      <div className="bg-gradient-to-r from-purple-800 to-purple-950 text-white py-10 sm:py-12 md:py-16 text-center rounded-xl">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-3 sm:mb-4 px-4">
          Over 10,000+ jobs to apply
        </h2>
        <p className="mb-6 sm:mb-8 max-w-xl mx-auto text-xs sm:text-sm font-light px-5">
          Your Next Big Career Move Starts Right here - Explore The Best Job
          Opportunities And Take The First Step Toward Your Future!
        </p>
        
        {/* Search Box - Responsive Layout */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between bg-white rounded-lg sm:rounded-full text-gray-600 max-w-xl mx-4 sm:mx-auto overflow-hidden shadow-lg">
          <div className="flex items-center border-b sm:border-b-0 sm:border-r border-gray-200 px-3 sm:px-4 py-2.5 sm:py-0 flex-1">
            <img className="h-4 sm:h-5 mr-2" src={assets.search_icon} alt="" />
            <input
              type="text"
              placeholder="Search for jobs"
              className="text-xs sm:text-sm p-2 outline-none w-full bg-transparent"
              ref={titleRef}
            />
          </div>
          <div className="flex items-center border-b sm:border-b-0 sm:border-r border-gray-200 px-3 sm:px-4 py-2.5 sm:py-0 flex-1">
            <img className="h-4 sm:h-5 mr-2" src={assets.location_icon} alt="" />
            <input
              type="text"
              placeholder="Location"
              className="text-xs sm:text-sm p-2 outline-none w-full bg-transparent"
              ref={locationRef}
            />
          </div>
          <button
            onClick={onSearch}
            className="bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-3 sm:py-2 text-white text-sm sm:text-base font-medium sm:m-1 sm:rounded-full"
          >
            Search
          </button>
        </div>
      </div>

      {/* Trusted By Section - Fully Responsive */}
<div className="border border-gray-300 shadow-md mt-5 sm:mt-6 md:mt-8 p-4 sm:p-5 md:p-6 rounded-md">
  <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-12 flex-wrap">
    <p className="font-medium text-xs sm:text-sm md:text-base text-gray-700">Trusted by</p>
    
    <img className="h-3 sm:h-4 md:h-5 lg:h-6 object-contain opacity-70 hover:opacity-100 transition-opacity" src={assets.microsoft_logo} alt="Microsoft" />
    <img className="h-3 sm:h-4 md:h-5 lg:h-6 object-contain opacity-70 hover:opacity-100 transition-opacity" src={assets.walmart_logo} alt="Walmart" />
    <img className="h-3 sm:h-4 md:h-5 lg:h-6 object-contain opacity-70 hover:opacity-100 transition-opacity" src={assets.accenture_logo} alt="Accenture" />
    <img className="h-3 sm:h-4 md:h-5 lg:h-6 object-contain opacity-70 hover:opacity-100 transition-opacity" src={assets.samsung_logo} alt="Samsung" />
    <img className="h-3 sm:h-4 md:h-5 lg:h-6 object-contain opacity-70 hover:opacity-100 transition-opacity" src={assets.amazon_logo} alt="Amazon" />
    <img className="h-3 sm:h-4 md:h-5 lg:h-6 object-contain opacity-70 hover:opacity-100 transition-opacity" src={assets.adobe_logo} alt="Adobe" />
  </div>
</div>
    </div>
  );
};

export default Hero;
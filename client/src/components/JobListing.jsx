import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { assets, JobCategories, JobLocations } from '../assets/assets';
import JobCard from './jobCard';

const JobListing = () => {

  const {isSearched, searchFilter, setSearchFilter, jobs} = useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const [filteredJobs, setFilteredJobs] = useState(jobs);
  
  const handleCategoryChange = (category) => {
    setSelectedCategories(
    prev => prev.includes(category) ? prev.filter( c => c !== category) : [...prev, category]
    )
  }

  const handleLocationChange = (location) => {
    setSelectedLocations(
    prev => prev.includes(location) ? prev.filter( c => c !== location) : [...prev, location]
    )
  }

  useEffect(() => {
    const matchesCategories = job => selectedCategories.length === 0 || selectedCategories.includes(job.category)

    const matchesLocations = job => selectedLocations.length === 0 || selectedLocations.includes(job.location)

    const matchesTitle = job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())

    const matchesSearchLocation = job => searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())

    const newFilteredJobs = jobs.slice().reverse().filter(
      job => matchesCategories(job) && matchesLocations(job) && matchesTitle(job) && matchesSearchLocation(job)
      )

      setFilteredJobs(newFilteredJobs)
      setCurrentPage(1)
    },[jobs, selectedCategories, selectedLocations,searchFilter])

  return (
    <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-6 py-6 sm:py-8 px-4 sm:px-6' >

   {/* sidebar */}
   <div className='w-full lg:w-1/4 bg-white lg:px-4' >

      {/* Search Filter from Hero Components */}
      {
        isSearched && (searchFilter.title !== '' || searchFilter.location !== '') && (
          <>
            <h3 className='font-medium text-base sm:text-lg mb-3 sm:mb-4'>Current Search</h3>
              <div className='mb-4 text-gray-600 flex flex-wrap gap-2'>
                {searchFilter.title && (
                  <span className='inline-flex items-center gap-2 sm:gap-2.5 bg-blue-50 border border-blue-200 px-3 sm:px-4 py-1 sm:py-1.5 rounded text-xs sm:text-sm'>
                    {searchFilter.title}
                    <img onClick={ e => setSearchFilter(prev => ({...prev, title:""}))} className='cursor-pointer w-3 h-3 sm:w-4 sm:h-4 hover:opacity-70 transition-opacity' src={assets.cross_icon} alt='' />      
                  </span>
                )}
                {searchFilter.location && (
                  <span className='inline-flex items-center gap-2 sm:gap-2.5 bg-red-50 border border-red-200 px-3 sm:px-4 py-1 sm:py-1.5 rounded text-xs sm:text-sm' >
                    {searchFilter.location}
                    <img onClick={ e => setSearchFilter(prev => ({...prev, location:""}))} className='cursor-pointer w-3 h-3 sm:w-4 sm:h-4 hover:opacity-70 transition-opacity' src={assets.cross_icon} alt='' />
                  </span>
                )}
              </div>
            </>
        )
      }

      <button onClick={e => setShowFilter(prev => !prev)} className='px-4 sm:px-6 py-1.5 sm:py-2 rounded border border-gray-400 lg:hidden text-sm sm:text-base hover:bg-gray-50 transition-colors w-full sm:w-auto' >
        {showFilter ? "Close" : "Filters"}
      </button>

      {/*  Category Filter  */}
      <div className={showFilter ? "" : "max-lg:hidden"}>
        <h4 className='font-medium text-base sm:text-lg py-3 sm:py-4'>Search by Categories</h4>
        <ul className='space-y-3 sm:space-y-4 text-gray-600 text-sm sm:text-base'>
          {
            JobCategories.map((category, index) => (
              <li className='flex gap-2 sm:gap-3 items-center' key={index}>
                <input 
                className='scale-110 sm:scale-125 cursor-pointer' 
                type='checkbox' 
                onChange={() => handleCategoryChange(category)}
                checked = {selectedCategories.includes(category)}/>
                {category}        
              </li>
            ))
          }
        </ul>
      </div>
   
    {/*  Location Filter  */}
      <div className={showFilter ? "" : "max-lg:hidden"}>
        <h4 className='font-medium text-base sm:text-lg py-3 sm:py-4 pt-8 sm:pt-14'>Search by Locations</h4>
        <ul className='space-y-3 sm:space-y-4 text-gray-600 text-sm sm:text-base'>
          {
            JobLocations.map((location, index) => (
              <li className='flex gap-2 sm:gap-3 items-center' key={index}>
                <input className='scale-110 sm:scale-125 cursor-pointer' type='checkbox' 
                onChange={() => handleLocationChange(location)}
                checked = {selectedLocations.includes(location)}
                />
                {location}        
              </li>
            ))
          }
        </ul>
      </div>   
    </div>

    {/* Job Listings */}

     <section className='w-full lg:w-3/4 text-gray-800 lg:px-4'>
        <h3 className='font-medium text-2xl sm:text-3xl py-2' id='job-list' >Latest jobs</h3>
        <p className='mb-6 sm:mb-8 text-sm sm:text-base text-gray-600'>Get your desired job from top companies</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4'>
          {filteredJobs.slice((currentPage-1)*6,currentPage*6).map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>

        {/* pagination */}
        {filteredJobs.length > 0 && (
          <div  className='flex items-center justify-center space-x-1.5 sm:space-x-2 mt-8 sm:mt-10'>
            <a href='#job-list'>
              <img onClick={() => setCurrentPage(Math.max(currentPage-1),1)} className='w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:opacity-70 transition-opacity' src={assets.left_arrow_icon} alt='' />
            </a>
            {Array.from({length:Math.ceil(filteredJobs.length/6)}).map((_,index) => (
              <a key={index}  href='#job-list'>
                <button onClick={() => setCurrentPage(index+1)} className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-gray-300 rounded text-xs sm:text-sm transition-colors ${currentPage === index + 1 ? 'bg-blue-100 text-blue-500 border-blue-300' : 'text-gray-500 hover:bg-gray-50' }`} >{index + 1}</button>
              </a>
            ))}
            <a href='#job-list'>
              <img onClick={() => setCurrentPage(Math.min(currentPage+1,Math.ceil(filteredJobs.length / 6)))} className='w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:opacity-70 transition-opacity' src={assets.right_arrow_icon} alt='' />
            </a>
          </div>  
        )}
     </section>
    </div>
  )
}

export default JobListing
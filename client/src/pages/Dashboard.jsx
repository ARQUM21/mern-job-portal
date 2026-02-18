import React, { useContext, useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';

const Dashboard = () => {

  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext)

  // Function to logout for company
  const logout = () => {
    setCompanyToken(null)
    localStorage.removeItem('companyToken')
    setCompanyData(null)
    navigate('/')
  }

  useEffect(() => {
     if(companyData){
      navigate('/dashboard/add-job')
     }
  },[companyData])

  return (
    <div className='min-h-screen bg-gray-50'>

     {/* Navbar for Recruiter Panel - Sticky */}
     <div className='sticky top-0 z-50 bg-white shadow-md py-3 sm:py-4'>
      <div className='px-4 sm:px-6 md:px-8 flex justify-between items-center'>
        <img onClick={() => navigate('/')} className='h-6 sm:h-8 md:h-10 cursor-pointer' src={assets.logo} alt="" />
        {companyData && (
         <div className='flex items-center gap-2 sm:gap-3'>
          <p className='max-sm:hidden text-sm md:text-base text-gray-700'>Welcome, <span className='font-medium'>{companyData.name}</span></p>
          
          {/* Desktop - Dropdown Menu */}
          <div className='relative group hidden sm:block'>
            <img className='w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 border-2 border-gray-200 rounded-full cursor-pointer hover:border-blue-400 transition-colors object-cover' src={companyData.image} alt="" />
            <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
              <ul className='list-none m-0 p-2 bg-white rounded-md border border-gray-300 shadow-lg text-sm'>
                <li onClick={logout} className='py-2 px-4 cursor-pointer hover:bg-gray-100 rounded whitespace-nowrap transition-colors'>Logout</li>
              </ul>
            </div>
          </div>

          {/* Mobile - Logout Button */}
          <button 
            onClick={logout} 
            className='sm:hidden bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors'
          >
            Logout
          </button>
        </div> 
        )}
      </div>
     </div>


    <div className='flex items-start'>
      {/* Left Sidebar - Sticky */}
      <div className='sticky top-[60px] sm:top-[68px] md:top-[76px] h-[calc(100vh-60px)] sm:h-[calc(100vh-68px)] md:h-[calc(100vh-76px)] bg-white border-r border-gray-200 shadow-sm overflow-y-auto'>
        <ul className='flex flex-col items-start pt-4 sm:pt-5 text-gray-800'>
          <NavLink 
            className={({isActive}) => `flex items-center p-3 sm:p-4 md:px-6 gap-2 sm:gap-3 w-full hover:bg-gray-100 transition-colors ${isActive && 'bg-blue-50 border-r-4 border-blue-500 text-blue-600'}`} 
            to={'/dashboard/add-job'}
          >
            <img className='min-w-4 w-4 h-4 sm:w-5 sm:h-5' src={assets.add_icon} alt="" />
            <p className='max-sm:hidden text-sm md:text-base font-medium'>Add Job</p>
          </NavLink>
          
          <NavLink 
            className={({isActive}) => `flex items-center p-3 sm:p-4 md:px-6 gap-2 sm:gap-3 w-full hover:bg-gray-100 transition-colors ${isActive && 'bg-blue-50 border-r-4 border-blue-500 text-blue-600'}`} 
            to={'/dashboard/manage-jobs'}
          >
            <img className='min-w-4 w-4 h-4 sm:w-5 sm:h-5' src={assets.home_icon} alt="" />
            <p className='max-sm:hidden text-sm md:text-base font-medium'>Manage Jobs</p>
          </NavLink>
          
          <NavLink 
            className={({isActive}) => `flex items-center p-3 sm:p-4 md:px-6 gap-2 sm:gap-3 w-full hover:bg-gray-100 transition-colors ${isActive && 'bg-blue-50 border-r-4 border-blue-500 text-blue-600'}`} 
            to={'/dashboard/view-applications'}
          >
            <img className='min-w-4 w-4 h-4 sm:w-5 sm:h-5' src={assets.person_tick_icon} alt="" />
            <p className='max-sm:hidden text-sm md:text-base font-medium'>View Applications</p>
          </NavLink>
        </ul>
      </div>

      {/* Main Content Area - Scrollable */}
      <div className='flex-1 p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto max-h-[calc(100vh-60px)] sm:max-h-[calc(100vh-68px)] md:max-h-[calc(100vh-76px)]'>
        <Outlet />
      </div>
    </div>
    </div>
  )
}

export default Dashboard
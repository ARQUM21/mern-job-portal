import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 mt-20'>
      <div className='container px-4 sm:px-6 md:px-8 2xl:px-20 mx-auto py-6 sm:py-8 md:py-10'>
        
        {/* Main Footer Content */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8'>
          
          {/* Logo Section */}
          <div className='flex flex-col items-center md:items-start gap-3'>
            <img className='w-32 sm:w-40 md:w-44' src={assets.logo} alt="Logo" />
            <p className='text-xs sm:text-sm text-gray-500 text-center md:text-left max-w-xs'>
              Your trusted platform for finding the perfect job opportunities
            </p>
          </div>
          
          {/* Quick Links - Optional */}
          <div className='hidden lg:flex gap-8 xl:gap-12 text-sm text-gray-600'>
            <div className='flex flex-col gap-2'>
              <h4 className='font-semibold text-gray-800 mb-1'>Company</h4>
              <a href='#' className='hover:text-blue-600 transition-colors'>About Us</a>
              <a href='#' className='hover:text-blue-600 transition-colors'>Careers</a>
              <a href='#' className='hover:text-blue-600 transition-colors'>Contact</a>
            </div>
            <div className='flex flex-col gap-2'>
              <h4 className='font-semibold text-gray-800 mb-1'>Support</h4>
              <a href='#' className='hover:text-blue-600 transition-colors'>Help Center</a>
              <a href='#' className='hover:text-blue-600 transition-colors'>Privacy Policy</a>
              <a href='#' className='hover:text-blue-600 transition-colors'>Terms of Service</a>
            </div>
          </div>
          
          {/* Social Media */}
          <div className='flex flex-col items-center md:items-end gap-3'>
            <h4 className='text-sm font-semibold text-gray-800'>Follow Us</h4>
            <div className='flex gap-3 sm:gap-4'>
              <a href='#' className='hover:scale-110 transition-transform'>
                <img className='w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10' src={assets.facebook_icon} alt="Facebook" />
              </a>
              <a href='#' className='hover:scale-110 transition-transform'>
                <img className='w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10' src={assets.twitter_icon} alt="Twitter" />
              </a>
              <a href='#' className='hover:scale-110 transition-transform'>
                <img className='w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10' src={assets.instagram_icon} alt="Instagram" />
              </a>
            </div>
          </div>
          
        </div>
        
        {/* Bottom Copyright Bar */}
        <div className='mt-8 pt-6 border-t border-gray-300'>
          <p className='text-xs sm:text-sm text-center text-gray-600'>
          Copyright © {new Date().getFullYear()} Muhammad Arqum Tariq. All rights reserved.
          </p>
        </div>
        
      </div>
    </div>
  )
}

export default Footer
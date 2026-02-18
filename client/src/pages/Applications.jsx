import React, { useEffect, useState } from 'react'
import { useUser, useAuth } from '@clerk/clerk-react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets';
import moment from 'moment';
import Footer from '../components/Footer';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Applications = () => {

  const { user } = useUser()
  const { getToken } = useAuth()
  
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const { backendUrl, userData, userApplications, fetchUserData, fetchUserApplications} = useContext(AppContext)

  const updateResume = async () => {
   try {     
   const formData = new FormData()
   formData.append('resume', resume)

   const token = await getToken()

   const { data } = await axios.post(backendUrl+ '/api/users/update-resume',
    formData,
    {headers: {Authorization: `Bearer ${token}`}}
   )

   if(data.success){
    toast.success(data.message) 
    await fetchUserData()
   } else {
    toast.error(data.message)
   }
   } catch (error) {
     toast.error(error.message)
   }
   setIsEdit(false)
   setResume(null)

  }

  useEffect(() => {
    if(user){
     fetchUserApplications()
    }
  },[user])
  
  
  return (
    <>
    <Navbar />
    <div className='container px-4 sm:px-6 md:px-8 min-h-[65vh] 2xl:px-20 mx-auto my-6 sm:my-8 md:my-10' >
      
      {/* Resume Section */}
      <div className='mb-8 sm:mb-10'>
        <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4' >Your Resume</h2>
        <div className='bg-white border border-gray-200 rounded-lg p-4 sm:p-5 md:p-6 shadow-sm'>
          <div className='flex gap-2 sm:gap-3 flex-wrap items-center'>
            {
              isEdit || userData && userData.resume === ''
              ? <>
                 <label className='flex items-center flex-1 min-w-[200px]' htmlFor="resumeUpload">
                  <div className='flex items-center gap-2 bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-200 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 cursor-pointer flex-1'>
                    <img className='w-5 h-5 sm:w-6 sm:h-6' src={assets.profile_upload_icon} alt="" />
                    <p className='text-blue-600 text-xs sm:text-sm font-medium truncate' >{resume ? resume.name : "Select Resume (PDF)"}</p>
                  </div>
                  <input id='resumeUpload' onChange={ e => setResume(e.target.files[0])} accept='application/pdf' type="file" hidden/>
                 </label>
                 <button 
                   onClick={updateResume} 
                   className='bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 sm:px-6 py-2 sm:py-2.5 cursor-pointer text-xs sm:text-sm font-medium transition-colors shadow-sm'
                 >
                   Save Resume
                 </button>
              </>
              : <div className='flex gap-2 sm:gap-3 flex-wrap w-full sm:w-auto'>
                <a 
                  href={userData?.resume} 
                  target='_blank' 
                  className='bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg cursor-pointer text-xs sm:text-sm font-medium transition-colors shadow-sm inline-flex items-center gap-2' 
                >
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                  </svg>
                  View Resume
                 </a>
                 <button 
                   onClick={() => setIsEdit(true)} 
                   className='text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg px-4 sm:px-6 py-2 sm:py-2.5 cursor-pointer text-xs sm:text-sm font-medium transition-colors'
                >
                  Update Resume
                 </button>
                </div>
            }
          </div>
        </div>
      </div>

      {/* Jobs Applied Section */}
      <div>
        <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6'>Jobs Applied</h2>
        
        {userApplications.length === 0 ? (
          <div className='bg-white border border-gray-200 rounded-lg p-8 sm:p-12 text-center'>
            <div className='max-w-md mx-auto'>
              <svg className='w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray-300 mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
              </svg>
              <h3 className='text-lg sm:text-xl font-semibold text-gray-700 mb-2'>No Applications Yet</h3>
              <p className='text-sm sm:text-base text-gray-500'>You haven't applied to any jobs yet. Start exploring opportunities!</p>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className='hidden md:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm'>
              <table className='min-w-full bg-white'>
                <thead>
                  <tr className='bg-gray-50'>
                    <th className='py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700'>Company</th>
                    <th className='py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700'>Job Title</th>
                    <th className='py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700'>Location</th>
                    <th className='py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700'>Date Applied</th>
                    <th className='py-3 px-4 border-b border-gray-200 text-center text-sm font-semibold text-gray-700'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userApplications.map((job,index) => (
                    job.companyId && job.jobId ? (
                      <tr key={index} className='hover:bg-gray-50 transition-colors'>
                        <td className='py-3 px-4 border-b border-gray-200'>
                          <div className='flex items-center gap-3'>
                            <img className='w-9 h-9 rounded-full object-cover border border-gray-200 shadow-sm' src={job.companyId.image} alt="" />
                            <span className='text-sm font-medium text-gray-800'>{job.companyId.name}</span>
                          </div>
                        </td>
                        <td className='py-3 px-4 border-b border-gray-200 text-sm text-gray-800'>{job.jobId.title}</td>
                        <td className='py-3 px-4 border-b border-gray-200 text-sm text-gray-600'>{job.jobId.location}</td>
                        <td className='py-3 px-4 border-b border-gray-200 text-sm text-gray-600'>{moment(job.date).format('ll')}</td>
                        <td className='py-3 px-4 border-b border-gray-200 text-center'>
                          <span className={`${job.status === 'Accepted' ? 'bg-green-100 text-green-700' : job.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'} px-3 py-1.5 rounded-full text-xs font-semibold`}>
                            {job.status}
                          </span>
                        </td>
                      </tr>
                    ) : null
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className='md:hidden space-y-3 sm:space-y-4'>
              {userApplications.map((job, index) => (
                job.companyId && job.jobId ? (
                  <div key={index} className='bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow'>
                    <div className='flex items-start justify-between mb-3'>
                      <div className='flex items-center gap-3 flex-1'>
                        <img className='w-12 h-12 rounded-full object-cover border-2 border-gray-200 shadow-sm' src={job.companyId.image} alt="" />
                        <div className='flex-1 min-w-0'>
                          <h3 className='font-semibold text-sm text-gray-800 truncate'>{job.companyId.name}</h3>
                          <p className='text-xs text-gray-500 mt-0.5'>{moment(job.date).format('ll')}</p>
                        </div>
                      </div>
                      <span className={`${job.status === 'Accepted' ? 'bg-green-100 text-green-700' : job.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'} px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2`}>
                        {job.status}
                      </span>
                    </div>
                    <div className='space-y-1.5 pt-3 border-t border-gray-100'>
                      <p className='text-sm font-medium text-gray-800'>{job.jobId.title}</p>
                      <p className='text-xs text-gray-600 flex items-center gap-1.5'>
                        <svg className='w-3.5 h-3.5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                        </svg>
                        {job.jobId.location}
                      </p>
                    </div>
                  </div>
                ) : null
              ))}
            </div>
          </>
        )}
      </div>

    </div>
    <Footer />
    </>
  )
}

export default Applications
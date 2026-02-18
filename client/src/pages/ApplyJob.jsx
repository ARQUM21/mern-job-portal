import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import JobCard from '../components/JobCard';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { assets } from '../assets/assets';
import kConvert from 'k-convert';
import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@clerk/clerk-react';

const ApplyJob = () => {
  
  const { id } = useParams();

  const { getToken } = useAuth();
  
  const navigate = useNavigate() 

  const [JobData, setJobData] = useState(null);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false)

  const { jobs, backendUrl, userData, userApplications, fetchUserApplications } = useContext(AppContext);
  
  const fetchJob = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/jobs/${id}`)
    if(data.success) {
      setJobData(data.job)
    } else {
      toast.error(data.message)
    }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const applyHandler = async () => {
    try {
      
     if(!userData){
      return toast.error('Login to apply for jobs')
     }

     if(!userData.resume){
      navigate('/applications')
      return toast.error('Upload resume to apply') 
     }

     const token = await getToken()

    const { data } = await axios.post(backendUrl + '/api/users/apply',
      {jobId: JobData._id},
      {headers: {Authorization : `Bearer ${token}`}}
    )

     if(data.success){
      toast.success(data.message)
      fetchUserApplications()
     } else {
      toast.error(data.message)
    }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const checkAlreadyApplied = () => {
    const hasApplied = userApplications.some(item => item.jobId && item.jobId._id === JobData._id)
    setIsAlreadyApplied(hasApplied)
  }
  
  useEffect(() => {
    fetchJob()
  },[id])


  useEffect(() => {
     if(userApplications.length > 0 && JobData){
         checkAlreadyApplied()
     }
  },[JobData, userApplications, id])

  
  return JobData ? (
    <>
     <Navbar />

     <div className='min-h-screen flex flex-col py-6 sm:py-8 md:py-10 container px-4 sm:px-6 md:px-8 2xl:px-20 mx-auto'>
      <div className='bg-white text-black rounded-lg w-full' >
        
        {/* Job Header Section */}
        <div className='flex flex-col md:flex-row justify-center md:justify-between items-center gap-6 sm:gap-8 px-4 sm:px-8 md:px-12 lg:px-14 py-8 sm:py-12 md:py-16 lg:py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl' >
          
          {/* Left: Company & Job Info */}
          <div className='flex flex-col md:flex-row items-center w-full md:w-auto' >
            <img className='h-20 sm:h-24 md:h-28 bg-white rounded-lg p-3 sm:p-4 md:mr-4 mb-4 md:mb-0 border shadow-sm'  src={JobData.companyId.image} alt="" />
            <div className='text-center md:text-left text-neutral-700'>
              <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium' >{JobData.title}</h1>
              <div className='flex flex-row flex-wrap justify-center md:justify-start gap-x-4 sm:gap-x-6 gap-y-2 items-center text-gray-600 mt-2 sm:mt-3 text-xs sm:text-sm' >
                <span className='flex items-center gap-1' >
                  <img className='w-3 h-3 sm:w-4 sm:h-4' src={assets.suitcase_icon} alt="" />
                  {JobData.companyId.name}
                </span>
                <span className='flex items-center gap-1' >
                  <img className='w-3 h-3 sm:w-4 sm:h-4' src={assets.location_icon} alt="" />
                  {JobData.location}
                </span>
                <span className='flex items-center gap-1' >
                  <img className='w-3 h-3 sm:w-4 sm:h-4' src={assets.person_icon} alt="" />
                  {JobData.level}
                </span>
                <span className='flex items-center gap-1' >
                  <img className='w-3 h-3 sm:w-4 sm:h-4' src={assets.money_icon} alt="" />
                  CTC: {kConvert.convertTo(JobData.salary)}
                </span>
              </div>
            </div>
          </div>


          {/* Right: Apply Button */}
          <div className='flex flex-col justify-center items-center md:items-end text-center md:text-end w-full md:w-auto' >
            <button onClick={applyHandler} className='bg-blue-600 hover:bg-blue-700 transition-colors p-2.5 sm:p-3 px-8 sm:px-10 md:px-12 text-white rounded cursor-pointer text-sm sm:text-base font-medium w-full sm:w-auto whitespace-nowrap' > 
              {isAlreadyApplied ? 'Already Applied' : 'Apply Now'} 
            </button>
            <p className='mt-2 text-gray-600 text-xs sm:text-sm' >Posted {moment(JobData.date).fromNow()}</p>
          </div>

        </div>

        {/* Main Content Section */}
        <div className='flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-0 px-4 sm:px-0' >
          
          {/* Left: Job Description */}
          <div className='w-full lg:w-2/3 lg:pr-8'>
            <h2 className='font-bold text-xl sm:text-2xl mb-3 sm:mb-4'>Job description</h2>
            <div className='rich-text text-sm sm:text-base text-gray-700 leading-relaxed' dangerouslySetInnerHTML={{__html:JobData.description}} ></div>
            <button onClick={applyHandler} className='bg-blue-600 hover:bg-blue-700 transition-colors p-2.5 sm:p-3 px-8 sm:px-10 text-white rounded mt-6 sm:mt-8 md:mt-10 text-sm sm:text-base font-medium w-full sm:w-auto' > 
              {isAlreadyApplied ? 'Already Applied' : 'Apply Now'} 
            </button>
          </div>
          
          {/* Right: More Jobs */}
          <div className='w-full lg:w-1/3 lg:ml-8 space-y-4 sm:space-y-5' >
            <h2 className='font-semibold text-lg sm:text-xl text-gray-800'>More jobs from {JobData.companyId.name}</h2>
            {jobs.filter( job => job._id !== JobData._id && job.companyId._id === JobData.companyId._id)
            .filter( job => {
              // Set of applied jobIds
              const appliedJobsIds = new Set(userApplications.map(app => app.jobId && app.jobId._id))
              // Return true if the users has not applied for this job
              return !appliedJobsIds.has(job._id)
            }).slice(0,4)
            .map((job,index) => <JobCard key={index} job={job}/> )}
          </div>       
        </div>
      </div> 
     </div>
     <Footer /> 
    </>
  ) : (
    <Loading />
  )
}

export default ApplyJob
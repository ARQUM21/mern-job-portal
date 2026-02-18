import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import Loading from '../components/Loading'
import { toast } from 'react-toastify'
import { Check, X, Briefcase, MapPin, FileText } from 'lucide-react'

const ViewApplications = () => {

  const { backendUrl, companyToken } = useContext(AppContext)
  
  const [ applicants, setApplicants ] = useState(false)

  //Function to fetch company Job Applications Data
  const fetchCompanyjobApplications = async () => {
    try {
     const { data } = await axios.get(backendUrl+ '/api/company/applicants',
      {headers: {token: companyToken}}
     )

     if(data.success){
       setApplicants(data.applications.reverse())
     } else {
       toast.error(data.message)
     }
    } catch (error) {
      toast.error(error.message)
    }
  }

  
  // Function to update Job Applications Status
  const changeJobApplicationStatus = async (id, status) => {
    try {
     const { data } = await axios.post(backendUrl + '/api/company/change-status', {id, status}, { headers: {token: companyToken} })
     if(data.success){
      toast.success(data.message)
      fetchCompanyjobApplications()
     } else {
      toast.error(data.message)
     }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(companyToken){
      fetchCompanyjobApplications()
    }
  },[companyToken])

  return applicants ? applicants.length === 0 ? (
  <div className='p-4 sm:p-6 md:p-8'>
    <div className='text-left'>
      <FileText className='w-16 h-16 sm:w-20 sm:h-20 text-gray-300 mb-4' />
      <p className='text-lg sm:text-xl md:text-2xl text-gray-600 font-semibold'>No Applications Available</p>
      <p className='text-sm sm:text-base text-gray-500 mt-2'>Applications will appear here when candidates apply</p>
    </div>
  </div>) : (
    <div className='p-4 sm:p-6 md:p-8 max-w-6xl'>
      
      {/* Page Header */}
      <div className='mb-6 sm:mb-8'>
        <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-800'>Job Applications</h2>
        <p className='text-sm sm:text-base text-gray-600 mt-1'>Review and manage candidate applications</p>
      </div>

      {/* Desktop Table View */}
      <div className='hidden lg:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm'>
        <table className='w-full bg-white'>
          <thead>
            <tr className='bg-gray-50'>
              <th className='py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200'>#</th>
              <th className='py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200'>Candidate</th>
              <th className='py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200'>Job Title</th>
              <th className='py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200'>Location</th>
              <th className='py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200'>Resume</th>
              <th className='py-3 px-4 text-center text-sm font-semibold text-gray-700 border-b border-gray-200'>Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants.filter(item => item.jobId && item.userId).map((applicant, index) => (
              <tr key={index} className='text-gray-700 hover:bg-gray-50 transition-colors'>
                <td className='py-3 px-4 border-b border-gray-200 text-sm text-center'>{index+1}</td>
                <td className='py-3 px-4 border-b border-gray-200'>
                  <div className='flex items-center gap-3'>
                    <img className='w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm' src={applicant.userId.image} alt="" />
                    <span className='text-sm font-medium text-gray-800'>{applicant.userId.name}</span>
                  </div>
                </td>
                <td className='py-3 px-4 border-b border-gray-200 text-sm text-gray-800'>{applicant.jobId.title}</td>
                <td className='py-3 px-4 border-b border-gray-200 text-sm text-gray-600'>{applicant.jobId.location}</td>
                <td className='py-3 px-4 border-b border-gray-200'>
                  <a 
                    href={applicant.userId.resume} 
                    target='_blank'
                    className='bg-blue-50 text-blue-600 border border-blue-500 px-3 py-1.5 rounded inline-flex gap-2 items-center text-xs font-medium hover:bg-blue-100 transition-colors'
                  >
                    Resume
                    <img className='w-3 h-3' src={assets.resume_download_icon} alt="" />
                  </a>
                </td>
                <td className='py-3 px-4 border-b border-gray-200 text-center'>
                  {applicant.status === "Pending"
                  ? <div className='flex items-center justify-center gap-2'>
                      <button 
                        onClick={() => changeJobApplicationStatus(applicant._id, 'Accepted')}
                        className='bg-green-50 text-green-600 border border-green-500 p-1.5 rounded hover:bg-green-100 transition-colors'
                        title='Accept'
                      >
                        <Check className='w-4 h-4' />
                      </button>
                      <button 
                        onClick={() => changeJobApplicationStatus(applicant._id, 'Rejected')}
                        className='bg-red-50 text-red-600 border border-red-500 p-1.5 rounded hover:bg-red-100 transition-colors'
                        title='Reject'
                      >
                        <X className='w-4 h-4' />
                      </button>
                    </div>
                  : <span className={`${applicant.status === 'Accepted' ? 'bg-green-50 text-green-600 border border-green-500' : 'bg-red-50 text-red-600 border border-red-500'} px-3 py-1 rounded text-xs font-medium inline-block`}>
                      {applicant.status}
                    </span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className='lg:hidden space-y-4'>
        {applicants.filter(item => item.jobId && item.userId).map((applicant, index) => (
          <div key={index} className='bg-white border border-gray-200 rounded-lg p-4 sm:p-5 shadow-sm'>
            
            {/* Candidate Info */}
            <div className='flex items-center gap-3 mb-4 pb-4 border-b border-gray-100'>
              <img className='w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-gray-200 shadow-sm' src={applicant.userId.image} alt="" />
              <div className='flex-1'>
                <h3 className='font-semibold text-base sm:text-lg text-gray-800'>{applicant.userId.name}</h3>
                <p className='text-xs sm:text-sm text-gray-500'>Applicant #{index+1}</p>
              </div>
              {applicant.status !== "Pending" && (
                <span className={`${applicant.status === 'Accepted' ? 'bg-green-50 text-green-600 border border-green-500' : 'bg-red-50 text-red-600 border border-red-500'} px-3 py-1 rounded text-xs font-medium`}>
                  {applicant.status}
                </span>
              )}
            </div>

            {/* Job Details */}
            <div className='space-y-2 mb-4'>
              <div className='flex items-start gap-2'>
                <Briefcase className='w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0' />
                <div>
                  <p className='text-xs text-gray-500'>Job Title</p>
                  <p className='text-sm font-medium text-gray-800'>{applicant.jobId.title}</p>
                </div>
              </div>
              <div className='flex items-start gap-2'>
                <MapPin className='w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0' />
                <div>
                  <p className='text-xs text-gray-500'>Location</p>
                  <p className='text-sm font-medium text-gray-800'>{applicant.jobId.location}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col gap-2'>
              <a 
                href={applicant.userId.resume} 
                target='_blank'
                className='w-full bg-blue-50 text-blue-600 border border-blue-500 px-4 py-2.5 rounded-lg inline-flex justify-center gap-2 items-center text-sm font-medium hover:bg-blue-100 transition-colors'
              >
                Resume
                <img className='w-3 h-3' src={assets.resume_download_icon} alt="" />
              </a>
              
              {applicant.status === "Pending" && (
                <div className='flex gap-2'>
                  <button 
                    onClick={() => changeJobApplicationStatus(applicant._id, 'Accepted')}
                    className='flex-1 bg-green-50 text-green-600 border border-green-500 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors'
                  >
                    Accept
                  </button>
                  <button 
                    onClick={() => changeJobApplicationStatus(applicant._id, 'Rejected')}
                    className='flex-1 bg-red-50 text-red-600 border border-red-500 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors'
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  ) : <Loading />
}

export default ViewApplications
import React, { useContext, useEffect, useState } from 'react'
import { manageJobsData } from '../assets/assets'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import Loading from '../components/Loading'
import { Trash2 } from 'lucide-react'

const ManageJobs = () => {

  const navigate = useNavigate()

  const [jobs, setJobs] = useState(false)

  const { backendUrl, companyToken } = useContext(AppContext)

  // Function to fetch company Job Applications data
  const fetchCompanyJobs = async () => {
    try {      
     const { data } = await axios.get(backendUrl+'/api/company/list-jobs', 
      {headers: {token: companyToken}}
     )
     if(data.success){
        setJobs(data.jobsData.reverse())
     } else {
      toast.error(data.message)
     }
    } catch (error) {
      toast.error(error.message)
    }
  }

  //Function to change Job Visibility
  const changeJobVisibility = async (id) => {
     try {
      const { data } = await axios.post(backendUrl + '/api/company/change-visiblity',{id}, {headers:{token: companyToken}}) 
      if(data.success){
        toast.success(data.message)
        fetchCompanyJobs()
      } else {
        toast.error(data.message)
      }
     } catch (error) {
      toast.error(error.message)
     }
  }


    const deleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const { data } = await axios.post(
        backendUrl + '/api/company/delete-job', { id }, { headers: { token: companyToken } });
    if (data.success) {
      toast.success(data.message);
      fetchCompanyJobs();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

  useEffect(() => {
    if(companyToken){
     fetchCompanyJobs()
    }
  } ,[companyToken])

  return jobs ? jobs.length === 0 ? ( 
  <div className='flex items-center justify-center h-[70vh]'>
    <p className='text-lg sm:text-xl md:text-2xl text-gray-600'>No Jobs Available or Posted</p>
  </div>
  ) : (
    <div className='container p-4 sm:p-6 md:p-8 max-w-6xl'>
      
      {/* Page Header */}
      <div className='mb-6 sm:mb-8'>
        <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-800'>Manage Jobs</h2>
        <p className='text-sm sm:text-base text-gray-600 mt-1'>View and manage all your posted jobs</p>
      </div>

      {/* Desktop Table View */}
      <div className='hidden md:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm'>
        <table className='min-w-full bg-white' >
          <thead className='bg-gray-50'>
            <tr>
              <th className='py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700'>#</th>
              <th className='py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700'>Job Title</th>
              <th className='py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700'>Date</th>
              <th className='py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700'>Location</th>
              <th className='py-3 px-4 border-b border-gray-200 text-center text-sm font-semibold text-gray-700'>Applicants</th>
              <th className='py-3 px-4 border-b border-gray-200 text-center text-sm font-semibold text-gray-700'>Visible</th>
              <th className='py-3 px-4 border-b border-gray-200 text-center text-sm font-semibold text-gray-700'>Action</th> 
            </tr>
          </thead>
          <tbody>
            {jobs.map((job,index) => (
              <tr key={index} className='text-gray-700 hover:bg-gray-50 transition-colors' >
                <td className='py-3 px-4 border-b border-gray-200 text-sm'>{index+1}</td>
                <td className='py-3 px-4 border-b border-gray-200 text-sm font-medium'>{job.title}</td>
                <td className='py-3 px-4 border-b border-gray-200 text-sm text-gray-600'>{moment(job.date).format('ll')}</td>
                <td className='py-3 px-4 border-b border-gray-200 text-sm text-gray-600'>{job.location}</td>
                <td className='py-3 px-4 border-b border-gray-200 text-center'>
                  <span className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium'>{job.applicants}</span>
                </td>
                <td className='py-3 px-4 border-b border-gray-200 text-center'>
                  <input 
                    onChange={() => changeJobVisibility(job._id)} 
                    className='scale-125 cursor-pointer accent-blue-600' 
                    type="checkbox" 
                    checked={job.visible} 
                  />
                </td>
                <td className='py-3 px-4 border-b border-gray-200 text-center'>
                  <button
                    onClick={() => deleteJob(job._id)}
                    className='text-red-500 hover:text-red-700 transition-colors inline-flex items-center justify-center'
                    title="Delete Job"
                  >
                    <Trash2 className='w-4 h-4' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className='md:hidden space-y-4'>
        {jobs.map((job, index) => (
          <div key={index} className='bg-white border border-gray-200 rounded-lg p-4 shadow-sm'>
            <div className='flex justify-between items-start mb-3'>
              <div className='flex-1'>
                <h3 className='font-semibold text-base text-gray-800 mb-1'>{job.title}</h3>
                <p className='text-xs text-gray-500'>{moment(job.date).format('ll')}</p>
              </div>
              <span className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium'>
                {job.applicants} {job.applicants === 1 ? 'applicant' : 'applicants'}
              </span>
            </div>
            <div className='flex justify-between items-center pt-3 border-t border-gray-100'>
              <span className='text-sm text-gray-600'>{job.location}</span>
              <div className='flex items-center gap-3'>
                <div className='flex items-center gap-2'>
                  <span className='text-xs text-gray-500'>Visible</span>
                  <input 
                    onChange={() => changeJobVisibility(job._id)} 
                    className='scale-125 cursor-pointer accent-blue-600' 
                    type="checkbox" 
                    checked={job.visible} 
                  />
                </div>
                <button
                  onClick={() => deleteJob(job._id)}
                  className='text-red-500 hover:text-red-700 transition-colors'
                  title="Delete Job"
                >
                  <Trash2 className='w-4 h-4' />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* Add New Job Button */}
      <div className='mt-6 sm:mt-8 flex justify-end'>
        <button  
          onClick={() => navigate('/dashboard/add-job')} 
          className='bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg cursor-pointer font-medium text-sm sm:text-base transition-colors shadow-md hover:shadow-lg w-full sm:w-auto'
        >
          Add New Job
        </button>  
      </div> 
    </div>
  ) : <Loading />
}

export default ManageJobs
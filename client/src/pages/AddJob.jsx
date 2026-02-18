import React, { useContext, useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import { JobCategories, JobLocations } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';


const AddJob = () => {

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Banalore');
  const [category, setCategory] = useState('programming');
  const [level, setLevel] = useState('Beginner level');
  const [salary, setSalary] = useState(0);
  
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { backendUrl, companyToken } = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
      try {  
        const description = quillRef.current.root.innerHTML 

        const { data } = await axios.post(backendUrl+ '/api/company/post-job', 
          {title, description, location, category, salary, level},
          {headers: {token: companyToken}}
        )

        if(data.success) {
          toast.success(data.message)
          setTitle('')
          setSalary(0)
          quillRef.current.root.innerHTML = ''
        } else {
          toast.error(data.message)
        }

       } catch (error) {
         toast.error(error.message)
       }
  }

   useEffect(() => {
   //Initialize Quill editor
    if(!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current,{
        theme: 'snow',
      })
    }
   },[])

  return (
    <form onSubmit={onSubmitHandler} className='container p-4 sm:p-6 md:p-8 flex flex-col w-full items-start gap-4 sm:gap-5 md:gap-6 max-w-4xl' >

      <div className='w-full'>
        <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-800'>Post a New Job</h2>
        <p className='text-sm sm:text-base text-gray-500 mt-2'>Fill in the details below to create a new job posting</p>
      </div>

      <div className='w-full'>
        <p className='mb-2 text-sm sm:text-base font-medium text-gray-700'>Job Title</p>
        <input 
          type="text" 
          placeholder='e.g. Senior Full Stack Developer' 
          onChange={e => setTitle(e.target.value)} 
          value={title}
          required
          className='w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-300 rounded-lg text-sm sm:text-base focus:border-blue-500 focus:outline-none transition-colors'
        />
      </div>

      <div className='w-full' >
        <p className='mb-2 text-sm sm:text-base font-medium text-gray-700'>Job Description</p>
        <div ref={editorRef}>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 w-full' >

        <div className='flex-1'>
          <p className='mb-2 text-sm sm:text-base font-medium text-gray-700'>Job Category</p>
          <select 
            className='w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-300 rounded-lg text-sm sm:text-base focus:border-blue-500 focus:outline-none transition-colors bg-white cursor-pointer' 
            onChange={e => setCategory(e.target.value)}
          >
            {JobCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className='flex-1'>
          <p className='mb-2 text-sm sm:text-base font-medium text-gray-700'>Job Location</p>
          <select 
            className='w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-300 rounded-lg text-sm sm:text-base focus:border-blue-500 focus:outline-none transition-colors bg-white cursor-pointer' 
            onChange={e => setLocation(e.target.value)}
          >
            {JobLocations.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div className='flex-1'>
          <p className='mb-2 text-sm sm:text-base font-medium text-gray-700'>Job Level</p>
          <select 
            className='w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-300 rounded-lg text-sm sm:text-base focus:border-blue-500 focus:outline-none transition-colors bg-white cursor-pointer' 
            onChange={e => setLevel(e.target.value)}
          >
            <option value='beginner level'>Beginner level</option>
            <option value='Intermediate level'>Intermediate level</option>
            <option value='Senior level'>Senior level</option>
          </select>
        </div>

      </div>


      <div className='w-full sm:w-auto'>
        <p className='mb-2 text-sm sm:text-base font-medium text-gray-700'>Job Salary (Annual)</p>
        <input 
          min={0} 
          className='w-full sm:w-[200px] md:w-[250px] px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-300 rounded-lg text-sm sm:text-base focus:border-blue-500 focus:outline-none transition-colors' 
          onChange={e => setSalary(e.target.value)} 
          type="Number" 
          placeholder='e.g. 50000' 
        />
      </div>

      <button 
        type='submit'
        className='w-full sm:w-auto px-8 sm:px-12 py-2.5 sm:py-3 mt-4 sm:mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm sm:text-base transition-colors shadow-md hover:shadow-lg'
      >
        Post Job
      </button>
    </form>
  )
}

export default AddJob
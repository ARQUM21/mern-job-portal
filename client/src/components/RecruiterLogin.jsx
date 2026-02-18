import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'

const RecruiterLogin = () => {

    const navigate = useNavigate()
  
    const [state, setState] = useState('Login')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')


    const [image, setImage] = useState(false)

    const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false)

    const {setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } = useContext(AppContext)


    const onSubmitHandler = async (e) => {
        e.preventDefault()

        if (state === 'Sign Up' && !isTextDataSubmitted) {
           return setIsTextDataSubmitted(true)
        }

        try {
            if(state === 'Login') {
                const {data} = await axios.post(backendUrl + '/api/company/login', {email, password})
                if (data.success) {
                    setCompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken',data.token)
                    setShowRecruiterLogin(false)
                    navigate('/dashboard')
                } else {
                    toast.error(data.message)
                }

            } else {

               const formData = new FormData()
               formData.append('name', name)
               formData.append('password', password)
               formData.append('email', email)
               formData.append('image', image)

               const {data} = await axios.post(backendUrl + '/api/company/register', formData)

               if (data.success){
                    setCompanyData(data.comapny)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken',data.token)
                    setShowRecruiterLogin(false)
                    navigate('/dashboard')
               } else {
                  toast.error(data.message)
               }
            }
        } catch (error) {
            toast.error(error.message)            
        }
    }

    useEffect(() => {
         document.body.style.overflow = 'hidden'
         return () => {
            document.body.style.overflow = 'unset'
         }
    },[])

    return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center p-4' >
       <form onSubmit={onSubmitHandler} className='relative bg-white p-6 sm:p-8 md:p-10 rounded-xl text-slate-500 w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto'>
        <h1 className='text-center text-xl sm:text-2xl text-neutral-700 font-medium' >Recruiter {state}</h1>
        <p className='text-xs sm:text-sm text-center mt-1' >Welcome back! Please sign in to continue</p>
        {state === 'Sign Up' && isTextDataSubmitted 
        ? <>
        
          <div className='flex items-center gap-3 sm:gap-4 my-6 sm:my-10' >
            <label htmlFor="image" className='cursor-pointer'>
                <img className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-full border border-gray-300 shadow-sm hover:opacity-80 transition-opacity" src={image ? URL.createObjectURL(image): assets.upload_area} alt="" />
                <input onChange={ e => setImage(e.target.files[0])} type="file" id='image' hidden/>
            </label>
            <p className='text-sm sm:text-base'>Upload Company <br /> Logo</p>
          </div>
        </>
        : <>
        {state !== 'Login' && (
        <div className='border px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 rounded-full mt-4 sm:mt-5 focus-within:border-blue-500 transition-colors' >
            <img className='w-4 h-4 sm:w-5 sm:h-5' src={assets.person_icon} alt="" />
            <input className='outline-none text-xs sm:text-sm w-full' onChange={e => setName(e.target.value)} value={name} type="text" placeholder='Company Name' required />
        </div>    
        )}
        
        <div className='border px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 rounded-full mt-4 sm:mt-5 focus-within:border-blue-500 transition-colors' >
            <img className='w-4 h-4 sm:w-5 sm:h-5' src={assets.email_icon} alt="" />
            <input  className='outline-none text-xs sm:text-sm w-full' onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder='Email Id' required />
        </div>
        <div className='border px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 rounded-full mt-4 sm:mt-5 focus-within:border-blue-500 transition-colors' >
            <img className='w-4 h-4 sm:w-5 sm:h-5' src={assets.lock_icon} alt="" />
            <input className='outline-none text-xs sm:text-sm w-full' onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder='Password' required />
        </div>
        </>
        }

        {state === "Login"  && <p className='text-xs sm:text-sm text-blue-600 mt-3 sm:mt-4 cursor-pointer hover:underline' >Forget password</p> }

        <button type='submit' className='bg-blue-600 hover:bg-blue-700 w-full text-white py-2 sm:py-2.5 rounded-full mt-4 sm:mt-5 text-sm sm:text-base font-medium transition-colors'>
            {state === 'Login' ? 'Login' : isTextDataSubmitted ?  'create account' : 'next'}
        </button>
        
        {
            state === 'Login'
            ? <p className='mt-4 sm:mt-5 text-center text-xs sm:text-sm'>Don't have an account? <span className='text-blue-600 cursor-pointer hover:underline font-medium' onClick={() => setState('Sign Up')}>Sign Up</span></p>
            : <p className='mt-4 sm:mt-5 text-center text-xs sm:text-sm'>Already have an account? <span className='text-blue-600 cursor-pointer hover:underline font-medium' onClick={() => setState('Login')} >Login</span></p>    
        }

        <img onClick={ e => setShowRecruiterLogin(false)} className='absolute top-3 right-3 sm:top-5 sm:right-5 cursor-pointer w-5 h-5 sm:w-6 sm:h-6 hover:opacity-70 transition-opacity' src={assets.cross_icon} alt="" />

       </form>
    </div>
  )
}

export default RecruiterLogin
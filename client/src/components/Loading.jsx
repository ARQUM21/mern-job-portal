import React from 'react'

const Loading = () => {
  return (
    <div className='min-h-screen flex items-center justify-center p-4' >
       <div className='w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-4 sm:border-4 md:border-4 border-gray-300 border-t-4 border-t-blue-400 rounded-full animate-spin' ></div> 
    </div>
  )
}

export default Loading
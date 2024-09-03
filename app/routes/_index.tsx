import { Link } from '@remix-run/react'
import React from 'react'

let styleForName:any={
    'position':'absolute', 'bottom':10, 'right':10,'text':'white'
}

const _index = () => {
  return (
    <div className='bg-gradient-to-t from-black to-gray-500 h-screen flex flex-col justify-center justify-items-center h-screen text-center space-y-4'>
        <div className='font-display text-white text-2xl py-7'>Welcome to my Music Play List</div>
      
      <div className='font-display text-white text-2xl py-7'> <Link to={`song/allSongs`}>Go to song List</Link></div>
      <div className='absolute right-0 bottom-0 m-4 p-2 text-white'><div>Developed By:</div> Ankit Das and Harshit Sharma</div>
    </div>
    
     
    
  )
}

export default _index

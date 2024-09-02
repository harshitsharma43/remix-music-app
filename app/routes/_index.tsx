import { Link } from '@remix-run/react'
import React from 'react'

let styleForName:any={
    'position':'absolute', 'bottom':10, 'right':10
}

const _index = () => {
  return (
    <div className='bg-blue-300 h-screen flex flex-col justify-center justify-items-center h-screen text-center space-y-4'>
        <div className='border border bg-green-500 py-7'>Welcome to my Music Play List</div>
      
      <div className='border border bg-red-500 py-7'> <Link to={`song/allSongs`}>Go to song List</Link></div>
      <div style={styleForName}><div>Developed By:</div> Ankit Das and Harshit Sharma</div>
    </div>
    
     
    
  )
}

export default _index

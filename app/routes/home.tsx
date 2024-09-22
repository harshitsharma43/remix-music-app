import { Link } from '@remix-run/react'
import React from 'react'
import MusicImage from "./../assets/download.jpeg"
import { getSession } from "../CookiesStorage";
import {redirect,useFetcher,useLoaderData} from "@remix-run/react"

let styleForName:any={
    'position':'absolute', 'bottom':10, 'right':10,'text':'white'
}
export const loader = async ({ request }: { request: Request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  

  if (!token) {
    return redirect("/login"); // If no token, redirect to login
  }
  else{
    return null;
  }
}
  
const _index = () => {
  return (
    <div className='bg-gradient-to-t from-black to-gray-500 h-screen flex flex-col justify-center justify-items-center h-screen text-center space-y-4'>
      <div className='justify-center px-36'> 
      <img src={MusicImage} alt="" className="w-40 h-40"/>
      </div>
     
        <div className='font-display text-white text-2xl py-7'>Welcome to my Music Play List</div>
      
      <div className='font-display text-white text-2xl py-7'> <Link to="/song/allSongs">Go to song List</Link></div>
      <div className='absolute right-0 bottom-0 m-4 p-2 text-white'><div>Developed By:</div> Ankit Das and Harshit Sharma</div>
    </div>
    
     
    
  )
}

export default _index

import React, { useRef, useState } from 'react'
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData,Link } from "@remix-run/react";
import { useParams } from "react-router-dom";

import {redirect,useFetcher} from "@remix-run/react"
import {getSession} from "../CookiesStorage"


export const loader:LoaderFunction = async ({ request, params}: { request: Request,params:any }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  

  if (!token) {
    return redirect("/login"); // If no token, redirect to login
  }
//   else{
//     return null;
//   }
// }

//export const loader2: LoaderFunction = async ({params}  ) => {
  
  console.log("----parmas----",params)
  console.log("----ID----",params.id)
  const response = await fetch(`http://musixplayer.eu-north-1.elasticbeanstalk.com/getSong/${params.id}`,{ headers:{token:token}});
  if (!response.ok) {
    throw new Response("Failed to fetch data", { status: response.status });
  }
  const users = await response.json();
  console.log("----users inside song details app",users)
  return json(users);
};




function MusicPage() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<any>(null);

    const users:any = useLoaderData();

  const params = useParams();


    
  const [progress, setProgress] = useState(0);
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeekChange = (e:any) => {
    setProgress(e.target.value);
  };
  
    const handlePlayPause = () => {
      if (isPlaying) {
        audioRef?.current.pause();
      } else {
        audioRef?.current.play();
      }
      setIsPlaying(!isPlaying);
    };
  
    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    };
  
    const handleSeek = (e:any) => {
      audioRef.current.currentTime = e.target.value;
      setCurrentTime(e.target.value);
    };
  
    const handleLoadedMetadata = () => {
      setDuration(audioRef.current.duration);
    };
    const buttonStyle = {
        width: '100px',
        height: '100px',
        backgroundColor: 'grey',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.2s ease',
      };
      const headingStyle:any = {
        fontSize: '2em',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        animation: 'colorChange 3s infinite', // Animation name
      };
      const keyframesStyle = `
    @keyframes colorChange {
      0% { color: #ff0000; } /* Red */
      25% { color: #00ff00; } /* Green */
      50% { color: #0000ff; } /* Blue */
      75% { color: #ff00ff; } /* Magenta */
      100% { color: #ff0000; } /* Red */
    }
  `;


  return (
    
    <div className='bg-gradient-to-t from-black to-gray-500 gap-y-10 h-screen'>
       <Link className='px-7 py-10 font-display text-white' to={`/song/allSongs`}> Back to All Song List</Link>
        <div className='flex justify-center items-center  lg:h-[30rem] lg:w-[60rem] h-[30rem]'>
      <img
            src={users['data'][0].albumArt}
            alt="Album Cover"
            className='h-72 w-64 rounded-xl'
          />
    </div>
    <div className='animate-marquee inline-block font-display text-white'>
    <h1>{users['data'][0].songName}</h1>
        </div>
  {/* Circular Play/Pause Button */}
  <div className='flex flex-col items-center justify-center space-y-4 h-40'>
  <audio
      ref={audioRef}
      src={users['data'][0].song}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetadata}
    />
    <input
      type="range"
      min="0"
      max={duration}
      value={currentTime}
      onChange={handleSeek}
    />
    
  <button
        onClick={handlePlayPause}
        className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md focus:outline-none"
      >
        {isPlaying ? (
          <div className="flex space-x-1">
            <div className="w-2 h-4 bg-black"></div>
            <div className="w-2 h-4 bg-black"></div>
          </div>
        ) : (
          <div
            className="w-2 h-3 border-l-8 border-transparent border-r-0 
            border-t-4 border-b-4 border-t-transparent border-b-transparent border-l-black"
          ></div>
        )}
      </button>

  </div>
  
    </div>
    
  )
}

export default MusicPage
import React, { useRef, useState } from 'react'
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async () => {
  const response = await fetch("http://musixplayer.eu-north-1.elasticbeanstalk.com/getSong/66ce3279ae4e34acbcc10da8");
  if (!response.ok) {
    throw new Response("Failed to fetch data", { status: response.status });
  }
  const users = await response.json();
  console.log("----apiData---",users)
  return json(users);
};



function MusicPage() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<any>(null);

    const users:any = useLoaderData();


    
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
    
    <div className='space gap-y-20'>
        <div className='flex justify-center items-center  lg:h-[30rem] lg:w-[60rem] h-[30rem]'>
      <img
            src={users['data'][0].albumArt}
            alt="Album Cover"
            className='h-72 w-64'
          />
    </div>
    <div><style>{keyframesStyle}</style>
    <h1 style={headingStyle}>{users['data'][0].songName}</h1>
        </div>
  {/* Circular Play/Pause Button */}
  <div className='flex flex-col items-center justify-center h-screen space-y-2 h-28'>
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
        className="flex items-center justify-center w-16 h-16 bg-red-500 rounded-full shadow-md focus:outline-none"
      >
        {isPlaying ? (
          <div className="flex space-x-1">
            <div className="w-2 h-4 bg-white"></div>
            <div className="w-2 h-4 bg-white"></div>
          </div>
        ) : (
          <div
            className="w-0 h-0 border-l-8 border-transparent border-r-0 
            border-t-4 border-b-4 border-t-transparent border-b-transparent border-l-white"
          ></div>
        )}
      </button>

  </div>
  
    </div>
    
  )
}

export default MusicPage
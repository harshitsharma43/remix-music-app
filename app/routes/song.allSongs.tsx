import React from 'react'
import { json, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useParams } from "react-router-dom";


export const loader: LoaderFunction = async () => {
  const response = await fetch("http://musixplayer.eu-north-1.elasticbeanstalk.com/allSongs")
  if (!response.ok) {
    throw new Response("Failed to fetch data", { status: response.status });
  }
  const users = await response.json();
  return json(users);
};

const index = () => {
  const albums:any = useLoaderData();
  return (
    <div className='bg-gradient-to-t from-black to-gray-500 gap-x-7 h-screen'>
      <Link className='font-display text-white gap-x-7 px-2 py-5'to={`/`}>Go to Home Page</Link>
      <div className='grid grid-cols-2 gap-4 p-4 '> {albums.data.map((album:any) => (
       <Link to={`/song/${album._id}`} key={album._id}>
        <div key={album._id} className="text-center bg-gradient-to-t from-black to-gray-500 album font-display text-white rounded-lg shadow-lg overflow-hidden">
          <img src={album.albumArt} alt={album.songName} className="w-full h-48 object-cover" />
          <div className="album-info p-4">
            <h3 className="bg to-blue-500 text-lg font-semibold">{album.songName}</h3>
          </div>
        </div>
        </Link>
      ))}</div>
    
     
    </div>
  )
}

export default index

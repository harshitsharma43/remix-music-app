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
    <div className='gap-x-7'>
      <Link className='gap-x-7'to={`/`}>Go to Home Page</Link>
     {albums.data.map((album:any) => (
       <Link to={`/song/${album._id}`} key={album._id}>
        <div key={album._id} className="album bg-white rounded-lg shadow-lg overflow-hidden">
          <img src={album.albumArt} alt={album.songName} className="w-full h-48 object-cover" />
          <div className="album-info p-4">
            <h3 className="bg to-blue-500 text-lg font-semibold">{album.songName}</h3>
          </div>
        </div>
        </Link>
      ))}
     
    </div>
  )
}

export default index

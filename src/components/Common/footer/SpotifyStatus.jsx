'use client';

import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/common/libs/fetcher';
import Image from 'next/image';
import Link from 'next/link';
// Spotify status component in the Footer of the website

const SpotifyStatus = () => {
  const { data: playingData } = useSWR('/api/spotify/now-playing', fetcher);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (playingData?.progress && playingData?.duration) {
      // Initialize progress
      setProgress(playingData.progress);

      const interval = setInterval(() => {
        setProgress((prev) => {
          const nextProgress = prev + 1000; // Increment by 1 second (1000 ms)
          return nextProgress < playingData.duration
            ? nextProgress
            : playingData.duration;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [playingData]);

  if (!playingData?.songUrl) {
    return (
      <div className='rounded-box bg-base-100 border border-green-500 p-3 text-left text-green-500 backdrop-blur-md'>
        <div className='flex items-center space-x-2'>
          <span>No music playing</span>
          <FontAwesomeIcon icon='fa-brands fa-spotify' />
        </div>
      </div>
    );
  }

  const { title, artist, album, songUrl, albumImageUrl, duration } =
    playingData;

  // Calculate progress bar width
  const progressPercentage = (progress / duration) * 100;

  return (
    <div className='rounded-box bg-base-100 text-base-content flex flex-col justify-start border border-green-500 p-3 text-left backdrop-blur-md'>
      {/* Tiny header with Spotify icon and 'Listening to' */}
      <div className='flex items-center gap-2 text-green-500'>
        <span className='text-sm font-medium'>Listening to Spotify</span>
        <FontAwesomeIcon icon='fa-brands fa-spotify' />
      </div>
      {/* Album Cover and Song Info */}
      <div className='flex items-center gap-4'>
        <Image
          src={albumImageUrl}
          alt={`Album cover for ${album}`}
          width={60}
          height={60}
          className='rounded-box'
        />
        <div className='flex w-full flex-col'>
          <Link
            href={songUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='line-clamp-1 block overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap'
            style={{
              whiteSpace: 'normal', // Allow text wrapping
              wordBreak: 'break-word', // Break long words to avoid overflow
            }}
          >
            {limitString(title, 50, false)}
          </Link>
          <span
            className='block overflow-hidden text-xs text-ellipsis whitespace-nowrap'
            style={{
              whiteSpace: 'normal', // Allow text wrapping
              wordBreak: 'break-word', // Break long words to avoid overflow
            }}
          >
            {limitString(artist, 50, true)}
          </span>
          {/* <span className="text-xs text-ellipsis whitespace-nowrap overflow-hidden block">
                        {limitString(album, 50, false)}
                    </span> */}
          {/* Progress Bar */}
          <progress
            className='progress mt-2 h-1 [&::-moz-progress-bar]:bg-green-500 [&::-webkit-progress-value]:bg-green-500'
            // className="progress progress-base-content mt-2 h-1"
            value={progressPercentage}
            max={100}
          ></progress>
          {/* Time Display */}
          <div className='mt-1 flex justify-between text-xs'>
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Utility function to format time in mm:ss
const formatTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const limitString = (str, limit, isArtists) => {
  if (str.length <= limit) return str;
  // if isArtists, split by comma and return amount of artists that fit in the limit
  if (isArtists) {
    const artists = str.split(', ');
    let result = '';
    for (let i = 0; i < artists.length; i++) {
      if (result.length + artists[i].length <= limit) {
        result += artists[i];
        if (i < artists.length - 1) result += ', ';
      } else {
        break;
      }
    }
    return result + '...';
  }
  return str.substring(0, limit) + '...';
};

export default SpotifyStatus;

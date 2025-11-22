'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import {
  getCoordinates,
  getLocationText,
  getPopupText,
  locationConfig,
} from '@/common/constants/location';

export const LocationModal = () => {
  const position = getCoordinates();

  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/Common/Map'), {
        loading: () => (
          <div className='flex h-[400px] items-center justify-center'>
            <span className='loading loading-spinner loading-lg text-primary'></span>
          </div>
        ),
        ssr: false,
      }),
    [],
  );

  return (
    <dialog id='location_modal' className='modal'>
      <div className='modal-box max-w-4xl p-0'>
        {/* Header */}
        <div className='bg-base-200 flex items-center justify-between border-b p-4'>
          <div className='flex items-center gap-3'>
            <FontAwesomeIcon
              icon='fa-solid fa-map-marker-alt'
              className='text-primary text-xl'
            />
            <div>
              <h3 className='text-base-content text-lg font-bold'>
                Current Location
              </h3>
              <p className='text-base-content/70 text-sm'>
                {getLocationText()}
              </p>
            </div>
          </div>
          <form method='dialog'>
            <button className='btn btn-circle btn-ghost btn-sm'>
              <FontAwesomeIcon icon='fa-solid fa-xmark' className='text-lg' />
            </button>
          </form>
        </div>

        {/* Map Container */}
        <div className='h-[500px] w-full'>
          <Map
            position={position}
            zoom={locationConfig.zoom}
            popupText={getPopupText()}
          />
        </div>

        {/* Footer */}
        <div className='bg-base-200 border-t p-4'>
          <div className='flex items-center justify-between'>
            <div className='text-base-content/70 flex items-center gap-1 text-sm'>
              <FontAwesomeIcon icon='fa-solid fa-info-circle' />
              Click the marker for more information
            </div>
            <form method='dialog'>
              <button className='btn btn-primary btn-sm'>Close</button>
            </form>
          </div>
        </div>
      </div>
      <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  );
};

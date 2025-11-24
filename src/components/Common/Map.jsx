'use client';

import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

export default function Map({ position, zoom, popupText }) {
  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={true}
      className='rounded-box h-full w-full'
      style={{ height: '100%', width: '100%', minHeight: '400px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={position}>
        <Popup>{popupText}</Popup>
      </Marker>
    </MapContainer>
  );
}

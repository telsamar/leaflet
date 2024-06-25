import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { connect } from "react-redux";
import { io } from 'socket.io-client';
import { 
  socketAddMarker, 
  socketInitMarkers, 
  act_setCurrentLocation 
} from '../store/data/actions';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadowUrl from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: iconUrl,
  shadowUrl: iconShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const socket = io('http://localhost:3030');

const MapPanel = ({ markers, socketAddMarker, socketInitMarkers, setCurrentLocation }) => {
  // TODO: избавиться от useState
  const [error, setError] = useState(null);

  useEffect(() => {
    socket.on('connect_error', () => {
      setError('Не удается получить обновленные данные');
    });

    // Начальные маркеры от сервера
    socket.on('initMarkers', (initMarkers) => {
      console.log("Received initial markers: ", initMarkers);
      socketInitMarkers(initMarkers);
    });

    // Новые маркеры от сервера
    socket.on('newMarker', (marker) => {
      console.log("Received new marker: ", marker);
      socketAddMarker(marker);
    });

    // Обрабатываем сигналы
    socket.on('signal', (message) => {
      console.log('Received signal:', message);
    });

    return () => {
      socket.off('initMarkers');
      socket.off('newMarker');
      socket.off('signal');
    };
  }, [socketAddMarker, socketInitMarkers]);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setCurrentLocation(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <MapContainer
        center={[55.7558, 37.6176]}
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
        {markers.map((position, idx) => {
          console.log("Rendering marker:", position);
          return (
            <Marker 
              key={idx} 
              position={[position[0], position[1]]}
            >
              <Popup>{position[2]}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("Redux state: ", state);
  return {
    markers: state.markers
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    socketAddMarker: (marker) => dispatch(socketAddMarker(marker)),
    socketInitMarkers: (markers) => dispatch(socketInitMarkers(markers)),
    setCurrentLocation: (latitude, longitude) => dispatch(act_setCurrentLocation(latitude, longitude)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPanel);

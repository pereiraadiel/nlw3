import React, { useState, useEffect } from 'react';
import "../styles/pages/orphanages-map.css";
import 'leaflet/dist/leaflet.css';
import api from '../services/api';
import { Link } from 'react-router-dom';

import { FiPlus, FiSun, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from '../utils/mapIcon';

interface Orphanage  {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  
  useEffect(()=> {
    api.get("orphanages").then(response => {
      // console.log(response.data);
      setOrphanages(response.data);
    });
  },[]);

  const [mapTheme, setMapTheme] = useState("navigation-preview-night-v4");

  function changeTheme() {
    let theme = mapTheme === "navigation-preview-night-v4"
      ? "navigation-preview-day-v4"
      : "navigation-preview-night-v4";
    setMapTheme(theme);
  }

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy Logo" />
          <h2>Escolha um Orfanato no mapa</h2>
          <p>Muitas crianças estão esperando sua visita! :)</p>
        </header>
        <footer>
          <strong>Uberlândia</strong>
          <span>Minas Gerais</span>
        </footer>
      </aside>
      {/* 18.9191436,-48.2677935,12.5z */}
      <Map
        center={[-18.9137502, -48.2775493]}
        zoom={12.25}
        style={{ width: '100%', height: '100%' }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/${mapTheme}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
        {/* 
        <Marker
          icon={mapIcon} 
          position={[-18.9137502, -48.2775493]}
        >
          <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
            Kids Fun Orphanage
            <Link to="/orphanages/1">
              <FiArrowRight size={20} color="#fff"/>
            </Link>
          </Popup>
        </Marker>
        */}
        {orphanages.map(orphanage => {
          return (
            <Marker 
              key={orphanage.id}
              icon={mapIcon} 
              position={[orphanage.latitude , orphanage.longitude]}
            >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#fff"/>
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>
      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
      <Link to="#" className="change-theme" onClick={changeTheme}>
        <FiSun size={32} color="#fff" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
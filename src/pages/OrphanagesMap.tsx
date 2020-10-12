import React, { useState } from 'react';
import "../styles/pages/orphanages-map.css";
import 'leaflet/dist/leaflet.css';

import { Link } from 'react-router-dom';
import { FiPlus, FiSun } from 'react-icons/fi';
import { Map, TileLayer } from 'react-leaflet';

import mapMarkerImg from '../images/map-marker.svg';

function OrphanagesMap() {
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
        {/* <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/> */}
        {/* <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/> */}
        {/* <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/> */}
        {/* <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/> */}
        {/* <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/> */}
        {/* <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/navigation-preview-day-v4/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/> */}
        {/* <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/navigation-preview-night-v4/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/> */}
        {/* <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/navigation-guidance-day-v4/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/> */}
        {/* <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/navigation-guidance-night-v4/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/> */}
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/${mapTheme}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
      </Map>
      <Link to="" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
      <Link to="#" className="change-theme" onClick={changeTheme}>
        <FiSun size={32} color="#fff" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
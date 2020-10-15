import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo, FiSun } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { Link, useParams } from 'react-router-dom';

import '../styles/animations.css';
import '../styles/pages/orphanage.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import { useEffect } from "react";
import { useState } from "react";
import api from "../services/api";

interface Orphanage  {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>
}

interface OrphanageParams {
  id: string;
}

export default function Orphanage() {
  const params = useParams<OrphanageParams>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [orphanage, setOrphanage] = useState<Orphanage>();

  const [theme, setTheme] = useState(false);
  const [mapTheme, setMapTheme] = useState("navigation-preview-day-v4");
  useEffect(()=>{
    let main = document.getElementById('page-orphanage');
    let form = document.getElementById('orphanage-details');
    console.log("main: "+main+"\nform: "+form);
    if(!main || !form) return;

    if(theme){
      main.classList.add("light-theme-main");
      form.classList.add("form-light-theme");
      main.classList.remove("dark-theme-main");
      form.classList.remove("form-dark-theme");
      setMapTheme("navigation-preview-day-v4");
      // setTheme(false);
    }else{
      main.classList.remove("light-theme-main");
      form.classList.remove("form-light-theme");
      main.classList.add("dark-theme-main");
      form.classList.add("form-dark-theme");
      setMapTheme("navigation-preview-night-v4");
      // setTheme(true);
    }
  },[theme]);

  function changeTheme() {
    setTheme(!theme);
  }

  useEffect(()=> {
    api.get(`orphanages/${params.id}`).then(response => {
      // console.log(response.data);
      setOrphanage(response.data);
    });
  },[params.id]);
  
  if(!orphanage){
    return <p>Carregando...</p>
  }

  return (
    <div id="page-orphanage">
      <Sidebar/>

      <main>
        <div id="orphanage-details" className="orphanage-details animate-right">
          { orphanage.images.length > 0 && 
            (
              <img 
                src={orphanage.images[activeImageIndex].url} 
                alt={orphanage.name} 
              />
            )
          }
          <div className="images">
            {orphanage.images.map((image,index) => {
              return (
                <button 
                  key={image.id} 
                  className={activeImageIndex === index ? "active": ""} 
                  type="button"
                  onClick={()=>{
                    setActiveImageIndex(index);
                  }}
                  >
                  <img src={image.url} alt={orphanage.name} />
                </button>
              );
            })}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map 
                center={[orphanage.latitude, orphanage.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/${mapTheme}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker 
                  interactive={false} 
                  icon={mapIcon} 
                  position={[orphanage.latitude, orphanage.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              { orphanage.opening_hours?
                (
                  <div className="open-on-weekends">
                    <FiInfo size={32} color="#39CC83" />
                    Atendemos <br />
                    fim de semana
                  </div>
                )
                :
                (
                  <div className="open-on-weekends dont-open">
                    <FiInfo size={32} color="#FF669D" />
                    Não atendemos <br />
                    fim de semana
                  </div>
                )
              }
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
        <Link to="#" className="change-theme" onClick={changeTheme}>
          <FiSun size={32} color="#fff" />
        </Link>
      </main>
    </div>
  );
}
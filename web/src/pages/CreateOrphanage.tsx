import React ,{ ChangeEvent, FormEvent, useState, useEffect }  from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import { FiPlus, FiSun } from "react-icons/fi";

import '../styles/animations.css';
import '../styles/pages/create-orphanage.css';
import Sidebar from "../components/Sidebar";

import mapIcon from '../utils/mapIcon';
import api from "../services/api";
import { Link, useHistory } from "react-router-dom";

export default function CreateOrphanage() {

  const history = useHistory();

  const [position, setPosition] = useState({latitude:0, longitude:0});

  const [theme, setTheme] = useState(true);
  const [mapTheme, setMapTheme] = useState("navigation-preview-day-v4");
  useEffect(()=>{
    let main = document.getElementById('page-create-orphanage');
    let form = document.getElementById('form-create-orphanage');
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

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [opening_hours, setOpeningHours] = useState("");
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  
  function handleSelectImages(event: ChangeEvent<HTMLInputElement>){
    // console.log(event.target.files);
    
    if(!event.target.files){ // nao selecionou imagens
      return;
    }
    
    const selectedImages = Array.from(event.target.files) 
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }

  function handleMapClick(event: LeafletMouseEvent){
    // console.log(event.latlng);
    const {lat, lng} = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng
    });
  }

  async function handleSubmit(event: FormEvent){
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();
    data.append('name', name);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('about', about);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    images.forEach(image => {
      data.append('images', image);
    });

    await api.post("/orphanages", data);

    alert('cadastro realizado com sucesso!');

    history.push('/app');
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar/>
      <main className="animate-right">
        <form id="form-create-orphanage" onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-18.9074219,-48.2969255]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/${mapTheme}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== 0 && position.longitude !== 0 && (
                <Marker 
                  interactive={false} 
                  icon={mapIcon} 
                  position={[
                    position.latitude, 
                    position.longitude
                  ]} 
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name" 
                value={name} 
                onChange={event => setName(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="about" 
                maxLength={300} 
                value={about}
                onChange= {event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt={name}/>
                  )
                })}
                <label htmlFor="image" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input 
                multiple 
                type="file" 
                id="image[]"
                onChange={handleSelectImages}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions" 
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input 
                id="opening_hours"
                value={opening_hours}
                onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={open_on_weekends ? 'active': ''}
                  onClick={()=>{setOpenOnWeekends(true)}}>
                    Sim
                </button>
                <button 
                  type="button"
                  className={!open_on_weekends ? 'active': ''}
                  onClick={()=>{setOpenOnWeekends(false)}}>
                    Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
        <Link to="#" className="change-theme" onClick={changeTheme}>
          <FiSun size={32} color="#fff" />
        </Link>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;

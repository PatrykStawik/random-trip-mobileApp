import React, { useState, useEffect, useRef} from 'react';
import { IonContent, IonSlides, IonSlide, IonApp, IonButton, IonIcon, IonImg, IonSelect, IonSelectOption, IonHeader, IonMenu, IonToolbar, IonTitle, IonList, IonItem, IonMenuToggle, IonMenuButton, IonButtons, IonRouterOutlet} from '@ionic/react';
import {Plugins} from '@capacitor/core';
import L from 'leaflet';
import {connect} from 'react-redux'

import { Map as Maps, Marker, Popup, TileLayer } from 'react-leaflet'

import './MainTab.css';

import randomLatitude from 'random-latitude';
import randomLongitude from 'random-longitude'

import 'leaflet/dist/leaflet.css'

import { menuController } from '@ionic/core'
//const {Geolocation} = Plugins;

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const MainTab = (props) => {
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  const [kilometers, setKilometers] = useState(0)
  let geolocation = null;
 
  if (window.navigator && window.navigator.geolocation) {
  geolocation = window.navigator.geolocation;
  }

  useEffect(()=>{
    if (geolocation) {
      geolocation.getCurrentPosition(function(position) {
      //console.log(position);
      const crd = position.coords
      setLatitude(crd.latitude)
      setLongitude(crd.longitude)
      console.log('start: ', latitude, longitude)
      
     })
}
     }, [])
  
 
  
  
  
  

  const position = [latitude, longitude]
  // console.log(randomLatitude({min: 50, max: 40}));
  const getKilometers =(e)=>{
      setKilometers(e.target.value)
      console.log('km: ', kilometers)}
  
  const converterDegrees = (e)=>{
      e.preventDefault()
     let newLatitude = kilometers * 1/111;
     let newLongitude = kilometers * 1/(111 * Math.cos(newLatitude));
     
     let random_latitude = randomLatitude({min: latitude-newLatitude, max: latitude+newLatitude})
     let random_longitude = randomLongitude({min: longitude-newLongitude, max: longitude+newLongitude})
     console.log(random_latitude,random_longitude)

     setLatitude(random_latitude);
     setLongitude(random_longitude);

     
  }
  const resetFunction=(e)=>{
      e.preventDefault();
      geolocation.getCurrentPosition(function(position) {
          //console.log(position);
          const crd = position.coords
          setLatitude(crd.latitude)
          setLongitude(crd.longitude)
          console.log('start: ', latitude, longitude)
          });
  }
  const linkToGoogle = `https://www.google.com/search?q=${latitude},${longitude}`
  
  console.log(position)
 
  return (
    <IonApp>
      <IonContent>
        <IonHeader>Dupa</IonHeader>
        
        <Maps center={position} zoom={13} keyboard={0}>
          
        <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="made by Patryk Stawik"/>
        <Marker position={position}>
    <Popup>Kliknij aby przejść do googla: <br/><a  onClick={()=>window.open(linkToGoogle)}>{`${latitude}, ${longitude}`}</a></Popup>
    </Marker>
  </Maps>
  
        </IonContent>
  </IonApp>
  );


}

const mapStateToProps = (state)=>{
  console.log('mapstate ',state)
  return {
    kilometers: state.distance.kilometersRadius
  }
}

export default connect(mapStateToProps)(MainTab);

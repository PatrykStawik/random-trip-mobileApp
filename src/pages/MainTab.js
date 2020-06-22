import React, { useState, useEffect, useRef} from 'react';
import { IonContent, IonSlides, IonSlide, IonApp, IonButton, IonIcon, IonImg, IonSelect, IonSelectOption, IonHeader, IonRippleEffect, IonFab, IonFabButton, IonModal, IonItem, IonInput, IonPopover} from '@ionic/react';

import {optionsOutline, locateOutline} from 'ionicons/icons';

import * as distanceActions from '../data/actions/distanecActions'
import L from 'leaflet';
import {connect} from 'react-redux'

import { Map as Maps, Marker, Popup, TileLayer } from 'react-leaflet'

import './MainTab.css';

import randomLatitude from 'random-latitude';
import randomLongitude from 'random-longitude'

import 'leaflet/dist/leaflet.css'

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

  const [showPopover, setShowPopover] = useState(false);
  const kilometersInput = useRef(null)

  const handleClick = ()=>{
    props.setKilometers(kilometersInput.current.value)
    setShowPopover(false)
    
  }

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
      console.log('moja pozycja: ', latitude, longitude)

     })
}

     }, [])
  
     
  
     const position = [latitude, longitude]
     console.log('position: ', position)
  
  
    

 
  
  const converterDegrees = (e)=>{
    //  e.preventDefault()
    let newLatitude = props.kilometers * 1/111;
    let newLongitude = props.kilometers * 1/(111 * Math.cos(newLatitude));
    console.log('kilometry', props.kilometers)
    let random_latitude = randomLatitude({min: latitude-newLatitude, max: latitude+newLatitude})

    let random_longitude = randomLongitude({min: longitude-newLongitude, max: longitude+newLongitude})
    console.log('random', random_latitude,random_longitude)

    setLatitude(random_latitude);
    setLongitude(random_longitude);
    
  
     
  }
  const resetFunction=(e)=>{
     // e.preventDefault();
      geolocation.getCurrentPosition(function(position) {
          //console.log(position);
          const crd = position.coords
          setLatitude(crd.latitude)
          setLongitude(crd.longitude)
          console.log('start: ', latitude, longitude)
          });
  }
  const linkToGoogle = `https://www.google.com/search?q=${latitude},${longitude}`
  
  
 
  return (
    <IonApp>
      <IonContent >
          <IonHeader className="header">Tu Jesteś</IonHeader>
          
            <IonButton className="ripple-parent" expand="block" color="primary" onClick={converterDegrees}>LOSUJ!
            <IonRippleEffect type="unbounded"></IonRippleEffect>
            </IonButton>
            
          
          <Maps center={position} zoom={13} keyboard={0}>
            
                  <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="made by Patryk Stawik"/>
                  <Marker position={position}>
              <Popup>Kliknij aby przejść do googla: <br/><a  onClick={()=>window.open(linkToGoogle)}>{`${latitude}, ${longitude}`}</a></Popup>
              </Marker>
          </Maps>
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={()=>setShowPopover(true)}>
              <IonIcon icon={optionsOutline}/>
              <IonRippleEffect type="unbounded"></IonRippleEffect>
            </IonFabButton>
          </IonFab>
          <IonFab vertical="bottom" horizontal="start" slot="fixed">
            <IonFabButton onClick={resetFunction}>
              <IonIcon icon={locateOutline}/>
              <IonRippleEffect type="unbounded"></IonRippleEffect>
            </IonFabButton>
          </IonFab>
                <IonPopover
              isOpen={showPopover}
              cssClass='my-custom-class'
              onDidDismiss={e => setShowPopover(false)}
            >
              <p>Podaj maksymalną odległość w kilometrach</p>
                  <IonItem>
                    <IonInput inputMode="decimal" type="number" 
                    value={props.kilometers} ref={kilometersInput}/>
                  </IonItem>
                  <IonButton expand="block" onClick={handleClick}>Zastosuj
                  <IonRippleEffect type="unbounded"></IonRippleEffect>
                  </IonButton>
            </IonPopover>
        </IonContent>
  </IonApp>
  );


}

const mapStateToProps = (state)=>{
  console.log('mapstate ',state)
  return {
    kilometers: state.distance.kilometersRadius,
    
  }
}

const mapDispatchToprops = {
  setKilometers: distanceActions.setKilometers
}


export default connect(mapStateToProps, mapDispatchToprops)(MainTab);

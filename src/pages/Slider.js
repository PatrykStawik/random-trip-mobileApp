import React, { useState, useRef } from 'react';
import { IonContent, IonSlides, IonSlide, IonApp, IonButton, IonIcon, IonImg, IonInput, IonItem, } from '@ionic/react';

import './Slider.css';
import {arrowForward} from 'ionicons/icons';

import Slide1 from '../resources/slide1_world.png';
import Slide2 from '../resources/slide2_road.png';
import Slide3 from '../resources/slide3_road.png';


import { connect } from 'react-redux';

import * as distanceActions from '../data/actions/distanecActions'


const Slider = ({dispatch}) => {

  
  
  const [kilometersRadius, setKilometersRadius] = useState(0)
  
  const slidesEl = useRef(document.createElement('ion-slides'))
  const handleSlidesLoad = () => {
    
    slidesEl.current.getActiveIndex().then(res=>{
      // console.log(randomCord)
      // console.log(res)
      if(res >= 1 && kilometersRadius == 0){
        slidesEl.current.lockSwipeToNext(true)
      }else{
        slidesEl.current.lockSwipeToNext(false)
      }
    })
    dispatch(distanceActions.setKilometers(kilometersRadius))
    
  }
  
  const handleKilometers = (e) =>{
    setKilometersRadius(parseInt(e.target.value))  
  }
 

  
  
  return (
    <IonApp>
    <IonContent fullscreen class="ion-padding" scroll-y="false">
      <IonSlides className="ion-slides" pager={true}  
      onIonSlideDrag={() => handleSlidesLoad()} ref={slidesEl}>

        <IonSlide >
          <div >
            <IonImg src={Slide1} className="ion-img"/>
            <h2>Witaj</h2>
            <p>Jeśli <b>szukasz miejsca gdzie uderzyć w tripa</b> to ta aplikacja jest stworzona właśnie dla Ciebie</p><br/><b>Przesuń w lewo by rozpocząć</b>
          </div>
        </IonSlide>

        
        
        
        <IonSlide>      
          <h2>Jak daleko chcesz jechać ?</h2>
          <p>Podaj maksymalną odległość w kilometrach</p>
          <IonItem>
            <IonInput inputMode="decimal" type="number" 
            onIonChange={handleKilometers}/>
          </IonItem>
          <IonImg src={Slide2} className="ion-img"/>
        </IonSlide>
        
      
        
        <IonSlide>
          <IonImg src={Slide3} className="ion-img"/>
          <h2>Gotowy na podróż?</h2>
          <IonButton fill="clear" routerLink="/mainTab">Kontynuuj <IonIcon slot="end" icon={arrowForward}></IonIcon></IonButton>
        </IonSlide>
      </IonSlides>
    </IonContent>
    
  </IonApp>
  
  );
};




export default connect()(Slider);

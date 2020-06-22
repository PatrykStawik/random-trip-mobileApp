import React, { useState, useRef } from 'react';
import { IonContent, IonSlides, IonSlide, IonApp, IonButton, IonIcon, IonImg, IonSelect, IonSelectOption, IonInput, IonItem, IonLabel, IonItemDivider, } from '@ionic/react';

import './Slider.css';

import Slide1 from '../resources/slide1_world.png';
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
    //dispatch(distanceActions.setKilometers(kilometersRadius))
    
  }
 
//jak wypełnisz to pojawia sie dopiero napis przesun w lewo
  
  
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
          <>
          <h2>Jak daleko chcesz jechać ?</h2>
          <p>Podaj maksymalną odległość w kilometrach</p>
          <IonItem>
            <IonInput inputMode="decimal" type="number" 
            onIonChange={handleKilometers}/>
          </IonItem>
          </>
          
        </IonSlide>
        
      
        
        <IonSlide>
          <img src="./slide-4.png"/>
          <h2>Gotowy na podróż?</h2>
          <IonButton fill="clear" routerLink="/mainTab">Kontynuuj <IonIcon slot="end" name="arrow-forward"></IonIcon></IonButton>
        </IonSlide>
      </IonSlides>
    </IonContent>
  </IonApp>
  );
};

const mapStateToProps = (state)=>{
  console.log('mapstate ',state)
  return {
    state
  }
}



export default connect()(Slider);

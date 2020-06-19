import React, {useState, useRef} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom'
import {IonReactRouter} from "@ionic/react-router"

import {
  IonApp,
  
} from '@ionic/react';

import Slider from './pages/Slider';
import MainTab from './pages/MainTab';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App = () => {
  
  return(
  <IonApp>
    <IonReactRouter>
      <Switch>
        <Route path="/" exact>
          <Slider/>
        </Route>
        <Route path="/mainTab">
          <MainTab/>
        </Route>
      </Switch>
    </IonReactRouter>
  </IonApp>
);

}
export default App;
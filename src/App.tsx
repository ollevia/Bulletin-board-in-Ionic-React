
import { Route, Redirect } from 'react-router-dom';

import { IonReactRouter } from '@ionic/react-router';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';

import { business, balloon, home } from 'ionicons/icons';
import Home from './pages/Home';
import Events from './pages/Events';
import Assoc from './pages/Assoc';
import User from './pages/User';


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
import { Refresher } from './components/Refresher';





setupIonicReact();



const App: React.FC = () => {

  return (
    
    <IonApp>
      <IonReactRouter basename='/anslagstavlan'>
        <IonTabs>
          <IonRouterOutlet>


          <Route path="/Home" component={Home} exact />

            <Route exact path="/">
              <Redirect to="/Home"/>
            </Route>

      
            <Route path="/Events" component={Events} />
      
            <Route path="/Assoc" component={Assoc} />
      
            <Route path="/User" component={User} />
      

          </IonRouterOutlet>
  
        
          <IonTabBar slot="bottom">
             
            <IonTabButton tab="Home" href="/Home">
              <IonIcon icon={home} />
              <IonLabel>Hem</IonLabel>
            </IonTabButton>
            
            <IonTabButton tab="Events" href="/Events">
              <IonIcon icon={balloon} />
              <IonLabel>Evenemang</IonLabel>
            </IonTabButton>

            <IonTabButton tab="Assoc" href="/Assoc">
              <IonIcon icon={business} />
              <IonLabel>Organisationer</IonLabel>
            </IonTabButton>

          </IonTabBar>


        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
} 

export default App;


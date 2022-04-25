import React from 'react';
import { IonContent, IonRefresher, IonRefresherContent } from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';
import { chevronDownCircleOutline } from 'ionicons/icons';

function doRefresh(event: CustomEvent<RefresherEventDetail>) {


  setTimeout(() => {
    event.detail.complete();
  }, 2000);
}

export const Refresher: React.FC = () => (

      <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
        <IonRefresherContent
        className='ion-margin ion-padding'
             pullingIcon={chevronDownCircleOutline}
             refreshingSpinner="crescent"
             refreshingText="..."></IonRefresherContent>
      </IonRefresher>

    
);
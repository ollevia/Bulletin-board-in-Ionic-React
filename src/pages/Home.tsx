import {
  IonContent,
  IonPage,
  IonButton,
  IonText,
  IonImg,
  IonInput,
} from "@ionic/react";
import { useState } from "react";
import Header from "../components/Header";

import "../style.css";

const Home: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent>
        <div className="homeContent ">
          <IonText className="title">Välkommen till</IonText>
          <IonImg src={require("../assets/Kultur.png")} />

          <IonText className="ion-margin-bottom">
            <small>
              Oavsett om du är den nyfikna upptäckaren eller bara vill smita
              från vardagen en stund så finns det något här för just dig.
            </small>
          </IonText>
          <br />
          <IonButton
            expand="block"
            size="large"
            href={`${process.env.PUBLIC_URL}/Events`}
          >
            Se evenemang
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;

import {
  IonContent,
  IonText,
  IonButton,
  IonIcon,
  useIonAlert,
  IonFab,
} from "@ionic/react";

import "../style.css";


import { alertController } from "@ionic/core";

import Form from "./Form";
import { arrowBack } from "ionicons/icons";
import { useState } from "react";

interface create {
  swap: Function;
  duplicateItem?: any
}

const UserCreate: React.FC<create> = ({ swap, duplicateItem }) => {


  let eventItem = {
                                              title: "",
                                              organizer: sessionStorage.getItem("assocName"),
                                              place: "",
                                              type: "",
                                              desc: "",
                                              image: "",
                                              date: "",
                                              assocId: sessionStorage.getItem("assocId"),
                                           }

  if (duplicateItem) {
    eventItem = duplicateItem
  }
  const [present] = useIonAlert();

  const submitValue = async (item: any) => {
    await createEvent(item);
  };

  async function createEvent(data) {
    await fetch("https://mitt-api.herokuapp.com/activities2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const alert = await alertController.create({
      header: "Klart!",
      message: "Ditt evenemang " + data.title + " är skapat!",
    });
    await alert.present();
    swap("home")
  }

  return (
    <IonContent>
      <IonFab className="ion-padding-top" horizontal="start" vertical="top" slot="fixed" edge>
        <IonButton 
        color="secondary"
          onClick={() =>
            present({
              header: "Gå tillbaka till översikten?",
              message: "Ändringar kommer inte att sparas",
              buttons: ["Avbryt", { text: "Ok", handler: () => swap("home") }],
            })
          }
        >
          <IonIcon icon={arrowBack}></IonIcon>
          <IonText>
            <small>Gå tillbaka</small>
          </IonText>
        </IonButton>
        </IonFab>

        <Form type="skapa" post={submitValue} eventItem={eventItem} />
        <br />
      </IonContent>
  );
};

export default UserCreate;

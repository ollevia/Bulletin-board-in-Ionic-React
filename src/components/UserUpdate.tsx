import {
  IonContent,
  IonButton,
  IonIcon,
  useIonAlert,
  IonText,
  IonFab,
} from "@ionic/react";

import { alertController } from "@ionic/core";

import "../style.css";
import Form from "../components/Form";
import { arrowBack } from "ionicons/icons";

interface UpdateObject {
  updateItem: any;
  swap: Function;
}

const UserUpdate: React.FC<UpdateObject> = ({ swap, updateItem }) => {
  const [present] = useIonAlert();

  const submitValue = async (data) => {
    await updateEvent(data);
  };

  async function updateEvent(post: any) {
    await fetch("https://mitt-api.herokuapp.com/activities2/" + post._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    const alert = await alertController.create({
      header: "Klart!",
      message: "Ditt evenemang " + post.title + " är uppdaterat!",
    });

    await alert.present();
    swap("home");
  }

  return (
    <IonContent>
      <IonFab
        className="ion-padding-top"
        horizontal="start"
        vertical="top"
        slot="fixed"
        edge
      >
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
      <Form type="uppdatera" post={submitValue} eventItem={updateItem} />
    </IonContent>
  );
};

export default UserUpdate;

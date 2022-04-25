import {
  IonButton,
  IonCol,
  IonContent,
  IonDatetime,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTextarea,
} from "@ionic/react";
import { useState } from "react";

import FileBase64 from "react-file-base64";
import Card from "./Card";

interface FormProps {
  eventItem: any;
  post: Function;
  type: string;
}

const Form: React.FC<FormProps> = ({ eventItem, post, type }) => {
  const [item, setItem] = useState(eventItem);
  const [showDateModal, setShowDateModal] = useState(false);

  let noDate = item.date.length < 3 ? true : false;
    //Kollar om objektet som kommer in till formuläret har ett datum. Om det inte har det (nytt event) så läggs attributet "required" till på en input som egentligen bara används för att förhandsvisa valt datum. Tvingar användaren att välja ett datum innan den skickar, det går inte att lägga required på ion-datetime

  function send(e) {
    e.preventDefault();
    post(item);
  }

  return (
    <div className="ion-padding-top ion-margin-top">
      <form id="form" onSubmit={send}>
        <IonItem>
          <IonLabel position="stacked">Organisatör:</IonLabel>
          <IonInput disabled value={item.organizer} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Evenemangstitel:</IonLabel>
          <IonInput
            required
            value={item.title}
            onIonChange={(e: any) =>
              setItem({ ...item, title: e.detail.value })
            }
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Kategori:</IonLabel>
          <IonSelect
            interface="popover"
            slot=""
            value={item.type}
            onIonChange={(e: any) => setItem({ ...item, type: e.detail.value })}
          >
            <IonSelectOption value="Kultur">Kultur</IonSelectOption>
            <IonSelectOption value="Sport">Sport</IonSelectOption>
            <IonSelectOption value="Övrigt">Övrigt</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Plats:</IonLabel>
          <IonInput
            required
            value={item.place}
            onIonChange={(e: any) =>
              setItem({ ...item, place: e.detail.value })
            }
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Beskrivning:</IonLabel>
          <IonTextarea
            required
            autoGrow
            value={item.desc}
            onIonChange={(e: any) => setItem({ ...item, desc: e.detail.value })}
          />
        </IonItem>

        <IonItem onClick={() => setShowDateModal(true)}>
          <IonLabel position="stacked">Datum:</IonLabel>
          <IonInput required={noDate}>
            <IonText>{item.date.slice(0, 10)}</IonText>
          </IonInput>

          <IonLabel position="stacked">Tid:</IonLabel>
          <IonInput>
            <IonText>{item.date.substring(11, 16)}</IonText>
          </IonInput>
        </IonItem>

        <IonModal
          onDidDismiss={() => setShowDateModal(false)}
          class="modal"
          isOpen={showDateModal}
        >
          <IonContent forceOverscroll={false}>
            <IonDatetime
              value={item.date}
              onIonChange={(e: any) => {
                setItem({ ...item, date: e.detail.value });
                noDate = false;
              }}
            />
          </IonContent>

          <IonButton
            expand="block"
            disabled={item.date === "" ? true : false}
            onClick={() => setShowDateModal(false)}
          >
            Bekräfta
          </IonButton>
        </IonModal>

        <IonItem>
          <IonLabel position="stacked">Bild:</IonLabel>
          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setItem({ ...item, image: base64.toString() })
            }
          />
        </IonItem>

        <IonText className="ion-margin">Förhansvisning: </IonText>

        <Card item={item} options={false} />

        <IonRow className="ion-margin-vertical">
          <IonCol>
            <IonButton expand="block" size="large" type="submit">
              {type} evenemang
            </IonButton>
          </IonCol>
        </IonRow>
      </form>
    </div>
  );
};

export default Form;

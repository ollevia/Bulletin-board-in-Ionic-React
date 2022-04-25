import "../style.css";
import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonText,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { copy, create, trash } from "ionicons/icons";

interface ContainerProps {
  item: any;
  deleted?: Function;
  options: Boolean;
  update?: Function;
  showAssoc?: Function;
}

const Card: React.FC<ContainerProps> = ({
  item,
  options,
  deleted,
  update,
  showAssoc
}) => {
  const [present] = useIonAlert();
  let date = new Date(item.date).toLocaleDateString();
  let time = new Date(item.date).toLocaleTimeString().slice(0,5);



  return (
    <IonAccordionGroup>
      <IonCard>
        {options && (
          <IonToolbar color="base" class="ion-text-end">
            <IonRow className="ion-justify-content-between">
              <IonCol>
                {" "}
                <IonFabButton
                  color="primary"
                  size="small"
                  onClick={() => update && update(item, copy)}
                >
                  <IonIcon icon={copy}></IonIcon>
                </IonFabButton>
              </IonCol>

              <IonFabButton
                color="secondary"
                size="small"
                onClick={() => update && update(item)}
              >
                <IonIcon icon={create}></IonIcon>
              </IonFabButton>

              <IonFabButton
                color="danger"
                size="small"
                onClick={() =>
                  present({
                    header: item.title,
                    message: "Är du säker på att du vill ta bort evenemanget?",
                    buttons: [
                      "Avbryt",
                      {
                        text: "Ok",
                        handler: () => deleted && deleted(item._id),
                      },
                    ],
                  })
                }
              >
                <IonIcon icon={trash}></IonIcon>
              </IonFabButton>
            </IonRow>
          </IonToolbar>
        )}
        <IonCardHeader>
          <IonCardSubtitle>{item.type}</IonCardSubtitle>
          <IonCardTitle>{item.title}</IonCardTitle>
          <IonCardSubtitle>{item.organizer}</IonCardSubtitle>
        </IonCardHeader>
        {item.image && <IonImg src={item.image} />}
        <IonGrid className="ion-padding-horizontal">
          <IonRow>
            <IonCol>
              <IonText>
                <small>Datum: </small>
              </IonText>
              <br />
              <IonText>{date}</IonText>
            </IonCol>
            <IonCol className="eventTime">
              <IonText>
                <small>Tid: </small>
              </IonText>
              <br /> {time}
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonCardContent>
          <IonAccordion value={item._id}>
            <IonItem slot="header">
              <IonLabel>Mer</IonLabel>
            </IonItem>
            <IonList slot="content">
              <IonItem>
                <small>{item.desc}</small>
              </IonItem>
              <IonItem>
                <IonCol>
                  <IonText>
                    <small>Plats: </small>
                  </IonText>
                  <br />
                  {item.place}
                </IonCol>
              </IonItem>
              <IonItem>
                <IonButton
                  onClick={() => showAssoc && showAssoc(item.assocId)}
                >
                  Läs mer om {item.organizer}
                </IonButton>
              </IonItem>
            </IonList>
          </IonAccordion>
        </IonCardContent>
      </IonCard>
    </IonAccordionGroup>
  );
};

export default Card;

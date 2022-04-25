import { IonAvatar, IonButton, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonIcon, IonImg, IonItem, IonLabel, IonRow, IonText } from "@ionic/react";
import { close } from "ionicons/icons";



interface ModalContent {
    assoc: any
    show: Function
}

const AssocModal: React.FC<ModalContent> = ({assoc, show} ) => {
 

  return (
      
      <IonContent className="ion-padding assocModal">
        
            
                <IonRow class="ion-justify-content-between">
                    <IonAvatar className="ion-margin-start">
                        <IonImg src="https://www.hofors.se/images/18.786763791545c12c92fccd/1464077753893/platsvarum%C3%A4rke_%C3%A4ng.jpg"/>
                    </IonAvatar>
                    <IonIcon onClick={() => show(false)} icon={close} size="large"></IonIcon>
                </IonRow>
                <IonCardHeader>
                <IonCardTitle><h2>{assoc.name}</h2></IonCardTitle>
          
                
                <IonCardSubtitle>{assoc.type}</IonCardSubtitle>

                </IonCardHeader>

                
         
 
                <IonItem className="ion-margin-vertical">{assoc.desc}</IonItem>
                <IonItem>
                <IonLabel position="stacked">Telefon:</IonLabel>
                <IonText className="ion-margin-vertical"><a href={"tel:" + assoc.phone}>{assoc.phone}</a></IonText></IonItem>
                <IonItem>
                <IonLabel position="stacked">E-mail:</IonLabel>
                <IonText className="ion-margin-vertical"><a href={"mailto:" + assoc.email}>{assoc.email}</a></IonText></IonItem>
                <IonItem>
                    <IonButton href={assoc.site}>Webbplats</IonButton>
                </IonItem>
    
    </IonContent>
  );
};

export default AssocModal;

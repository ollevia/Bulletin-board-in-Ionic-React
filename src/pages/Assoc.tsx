import {
  IonContent,
  IonPage,
  IonSearchbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonModal,
  IonButton,
  IonButtons,
  IonLabel,
  IonLoading,
  IonText,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";

import "../style.css";
import React, { useState, useEffect } from "react";

import filter from "lodash.filter";
import Header from "../components/Header";
import AssocModal from "../components/AssocModal";
import { Refresher } from "../components/Refresher";
import { arrowUp } from "ionicons/icons";

const Assoc: React.FC = () => {
  const [assocs, setAssocs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://mitt-api.herokuapp.com/assoc")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        let sorted = json.sort((a, b) => { 
          return a.name < b.name ? -1 : b.name < a.name ? 1 : 0
        });
        setAssocs(sorted) 
        setQuery(sorted) 
        setIsLoading(false)
        
      });
  }, [setAssocs]);

  const handleSearch = (text: string) => {
    const formattedQuery = text.toLowerCase();
    const data = filter(assocs, (assoc) => {
      return contains(assoc, formattedQuery);
    });
    setQuery(data);
  };

  const contains = ({ name, desc, type }, query: string) => {
    if (
      name.toLowerCase().includes(query) ||
      desc.toLowerCase().includes(query) ||
      type.toLowerCase().includes(query)
    ) {
      return true;
    }
    return false;
  };

  const [details, setDetails] = useState();
  const [showModal, setShowModal] = useState(false);

  const pop = (item) => {
    setDetails(item);
    setShowModal(true);
  };

  function scrollToTop() {
    document.querySelector("ion-content")!.scrollToTop(1000);
  }

  return (
    <IonPage>
      <Header />
      <IonContent>
        <Refresher></Refresher>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton size="small" color="tertiary" onClick={scrollToTop}>
            <IonIcon icon={arrowUp} />
          </IonFabButton>
        </IonFab>
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <AssocModal show={setShowModal} assoc={details}></AssocModal>
        </IonModal>

        <IonLabel className="ion-margin-start " color="medium">
          <small>Sök efter ord:</small>
        </IonLabel>
        <IonSearchbar
          className="ion-margin-bottom"
          placeholder="Sök"
          onIonChange={(e) => handleSearch(e.detail.value!)}
        ></IonSearchbar>
        <IonText className="ion-margin-start" color="medium">
          <small>Filtrera på kategori:</small>
        </IonText>

        <IonButtons className="ion-justify-content-center ion-margin-bottom ion-padding-bottom catFilter">
          <IonButton color="danger" onClick={() => handleSearch("Kultur")}>
            Kultur
          </IonButton>
          <IonButton color="secondary" onClick={() => handleSearch("Sport")}>
            Sport
          </IonButton>
          <IonButton color="tertiary" onClick={() => handleSearch("Övrigt")}>
            Övrigt
          </IonButton>
          <IonButton color="primary" onClick={() => handleSearch("")}>
            Alla
          </IonButton>
        </IonButtons>

        <IonLoading
          isOpen={isLoading}
          onDidDismiss={() => setIsLoading(false)}
          message={"Vänta..."}
        />
        {query.map((item) => {
          return (
            <IonCard key={item._id}>
              <IonCardHeader>
                <IonCardSubtitle>{item.type}</IonCardSubtitle>
                <IonCardTitle>{item.name}</IonCardTitle>
                <IonCardSubtitle>{item.address}</IonCardSubtitle>

                <IonButton
                  className="ion-margin-top"
                  expand="full"
                  onClick={() => pop(item)}
                >
                  läs mer
                </IonButton>
              </IonCardHeader>
            </IonCard>
          );
        })}
      </IonContent>
    </IonPage>
  );
};

export default Assoc;

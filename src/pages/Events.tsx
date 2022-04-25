import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonLabel,
  IonLoading,
  IonModal,
  IonPage,
  IonSearchbar,
  IonText,
} from "@ionic/react";

import "../style.css";
import React, { useState, useEffect } from "react";

import filter from "lodash.filter";
import Card from "../components/Card";

import "../style.css";
import Header from "../components/Header";
import AssocModal from "../components/AssocModal";
import { arrowUp } from "ionicons/icons";
import { Refresher } from "../components/Refresher";

const Events: React.FC = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [assocs, setAssocs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState<any[]>([]);


  //hämtar events, sorterar efter datum, filtrerar bort evenets som redan ägt rum. Spara i både activites och query för att behålla origial-responsen som innehåller alla event. hämtar även assoc som innehåller info om organisatörerna.
  useEffect(() => {
    fetch("https://mitt-api.herokuapp.com/activities2")
      .then((response) => response.json())
      .then((json) => {
        let sorted = json.sort((a, b) =>
          a.date < b.date ? -1 : b.date < a.date ? 1 : 0
        );
        let futureEvents = filter(sorted, (item) => {
          return item.date >= new Date().toISOString();
        });
        setActivities(futureEvents);
        setQuery(futureEvents);
        setIsLoading(false);
      });

    fetch("https://mitt-api.herokuapp.com/assoc")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return setAssocs(json);
      });
  }, []);

  //hanterar både ordsök och kategorifilter, utgår från activities som innehåller hela respone-json, to do -> skriv en funktion som hanterar kategorifilter och ordsök separat så att man kan filtrera på båda samtidigt. 
  const handleSearch = (text: string) => {
    const formattedQuery = text.toLowerCase();
    const data = filter(activities, (activity) => {
      return contains(activity, formattedQuery);
    });
    setQuery(data);
  };

  const contains = ({ title, desc, type, organizer }, query: string) => {
    if (
      title.toLowerCase().includes(query) ||
      desc.toLowerCase().includes(query) ||
      type.toLowerCase().includes(query) ||
      organizer.toLowerCase().includes(query)
    ) {
      return true;
    }
    return false;
  };

  const [details, setDetails] = useState();
  const [showModal, setShowModal] = useState(false);

  //visar info om respektive organisatör.
  const pop = (id) => {
    setDetails(assocs.find((x) => x._id === id));
    setShowModal(true);
  };

  function scrollToTop() {
    document.querySelector("ion-content")!.scrollToTop(1000);
  }

  return (
    <IonPage>
      <Header />
      <IonContent className="ion-padding-top">
        <Refresher></Refresher>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton size="small" onClick={scrollToTop}>
            <IonIcon icon={arrowUp} />
          </IonFabButton>
        </IonFab>

        <IonLoading
          isOpen={isLoading}
          onDidDismiss={() => setIsLoading(false)}
          message={"Vänta..."}
        />

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
          <small>Sortera på kategori:</small>
        </IonText>

        <IonButtons className="ion-justify-content-center ion-margin-bottom ion-padding-bottom">
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

        {query.map((item) => {
          return (
            <Card item={item} key={item._id} options={false} showAssoc={pop} />
          );
        })}
      </IonContent>
    </IonPage>
  );
};

export default Events;

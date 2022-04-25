import UserCreate from "../components/UserCreate";
import UserUpdate from "../components/UserUpdate";
import { useEffect, useState } from "react";
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonLoading,
  IonPage,
  IonSearchbar,
} from "@ionic/react";
import Header from "../components/Header";
import Card from "../components/Card";

import filter from "lodash.filter";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { add } from "ionicons/icons";
import { Refresher } from "../components/Refresher";

const User: React.FC = () => {
  const { user, isLoading } = useAuth0();
  const [display, setDisplay] = useState("home");
  const [activities, setActivities] = useState<any[]>([]);
  const [query, setQuery] = useState<any[]>([]);
  const [updateItem, setUpdateItem] = useState();


  let getActivities = () => {
    let assocId = sessionStorage.getItem("assocId");
    fetch("https://mitt-api.herokuapp.com/activities2/assoc/" + assocId)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return (setActivities(json), setQuery(json));
      });
  };


useEffect(()=> {
  //om det inte finns något assocId sparat i sessionStorage så hämta det. Hämta sedan evenemang. 
  if ( user && !sessionStorage.getItem("assocId") && !isLoading) {
    fetch("https://mitt-api.herokuapp.com/assoc/sub/" + user?.sub?.substring(6, 35))
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        sessionStorage.setItem("assocId", json[0]._id);
        sessionStorage.setItem("assocName", json[0].name)
        getActivities();
      });

  } else {
    getActivities();
  }
},[isLoading, user])
  
   const deleted = (id: string) => {
     
    //plocka bort borttaget event från arrayen för att det ska försvinna från skärmen direkt, utan omhämtning eller reload. 
    setQuery(query.filter((activity) => activity._id !== id));
  

     fetch("https://mitt-api.herokuapp.com/activities2/del/" + id, {
      method: "DELETE",
    });
  }


  //Hanterar både ordsök och kategorifilter. Note to self - skriv en egen funktion för kategori-filter så att det går att filtrera på båda typerna samtidigt.
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

  //om kopiera-knappen körde funktionen så ta bort gamla id och skicka in övriga properties till UserCreate-komponenten.
  const update = (data: any, copy) => {
    
    if (copy) {
    delete data._id
    setUpdateItem(data); 
    setDisplay("duplicate")
    } else {setUpdateItem(data); setDisplay("update")}
  };

  //display-kontroll av de olika komponenterna
  const swap = (screen: "") => {
    getActivities()
    setDisplay(screen);
    
  };


    return (
      <IonPage>
        
        <IonLoading isOpen={isLoading} message={"Vänta..."} />
        <Header />

      {user && display === "update" && <UserUpdate updateItem={updateItem} swap={swap} />}
      {user && display === "create" && <UserCreate swap={swap} />}
      {user && display === "duplicate" && <UserCreate duplicateItem={updateItem} swap={swap} />}
      {user && display === "home" && 
      <IonContent className="ion-padding-top"> 
          
        <Refresher></Refresher>
          <IonFab horizontal="center" vertical="top" slot="fixed" edge>
          <IonFabButton size="small" onClick={() => setDisplay("create")}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

          <IonSearchbar
            placeholder="Sök"
            onIonChange={(e) => handleSearch(e.detail.value!)}
          ></IonSearchbar>

          {query.map((item, key) => {
            return (
              <Card
                key={key + item._id}
                item={item}
                options={true}
                deleted={deleted}
                update={update}
              />
            );
          })}
        </IonContent> }
        
        </IonPage>
    );
  }


export default withAuthenticationRequired(User);

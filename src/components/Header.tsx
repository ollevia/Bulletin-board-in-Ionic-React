import {
  IonButton,
  IonHeader,
  IonIcon,
  IonItemDivider,
  IonPopover,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "../style.css";

import { ellipsisVertical } from "ionicons/icons";
import { useAuth0 } from "@auth0/auth0-react";

const Header: React.FC = () => {
  const { loginWithRedirect, logout, user } = useAuth0();

  const logOut = () => {
    logout();
    sessionStorage.clear();
  };

  return (
    <IonHeader className="header">
      <IonToolbar>
        <img
          className="ion-margin-start"
          slot="start"
          width="40px"
          alt="logo"
          src={require("../assets/logo.png")}
        ></img>
        <IonTitle>Hofors Anslagtavla</IonTitle>
        <IonButton fill="clear" id="popoverBtn" color="light" slot="end">
          <IonIcon className="icon" icon={ellipsisVertical}></IonIcon>
        </IonButton>
      </IonToolbar>

      <IonPopover alignment="start" trigger="popoverBtn">
        {user && (
          <div className="ion-padding loginBox">
            <IonText>
              <small>Inloggad som: </small>
            </IonText>
            <IonText>{user.nickname}</IonText>

            <IonButton expand="full" slot="end" href="/anslagstavlan/User">
              Gå till översikt
            </IonButton>

            <IonItemDivider></IonItemDivider>
            <IonButton expand="full" color="danger" onClick={() => logOut()}>
              Logga ut
            </IonButton>
          </div>
        )}

        {!user && (
          <div className="ion-padding loginBox">
            <IonButton expand="full" onClick={() => loginWithRedirect()}>
              Logga in
            </IonButton>

            <IonText>
              <small>Endast för föreningar och företag.</small>
              <IonButton disabled expand="full" color="secondary">
                Skapa konto
              </IonButton>{" "}
            </IonText>
          </div>
        )}
      </IonPopover>
    </IonHeader>
  );
};

export default Header;

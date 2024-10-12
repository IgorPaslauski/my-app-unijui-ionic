import { IonApp, setupIonicReact } from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { HeaderPage } from "./components/home/HeaderPage";
import { NavBar } from "./components/nav/NavBar";
import { Suspense } from "react";
import ListaCardTurma from "./components/ListaCardTurma";
import { LoadingData } from "./components/LoadingData";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <div className="container-pai">
      <HeaderPage />
      <div className="container-body">
        <NavBar />
        <main style={{ width: "100%" }}>
          <Suspense fallback={<LoadingData />}>
            <ListaCardTurma />
          </Suspense>
        </main>
      </div>
    </div>
  </IonApp>
);

export default App;

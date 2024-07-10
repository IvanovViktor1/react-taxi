import styles from "./mainContainer.module.scss";
import YandexMap from "./ymap/YandexMap";
import CrewList from "./crewList";
import { FC } from "react";

const MapContainer: FC = () => {
  return (
    <div className={styles.mainContainer}>
      <YandexMap />
      <CrewList />
    </div>
  );
};

export default MapContainer;

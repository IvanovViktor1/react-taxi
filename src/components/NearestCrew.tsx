import { FC, memo } from "react";
import { Typography } from "@mui/material";
import { useAppSelector } from "../redux/store";
import { selectCurrentCrew } from "../redux/crewsSlice/crewsSlice";
import VehicleInformation from "./VehicleInformation";
import styles from "./components.module.scss";

const NearestCrew: FC = () => {
  const currentCrew = useAppSelector(selectCurrentCrew);
  return (
    <div
      className={styles.nearestCrew}
      style={{ maxHeight: currentCrew ? "1000px" : "0px" }}
    >
      <Typography
        variant="h6"
        sx={{ color: "#0B5094" }}
        className={styles.title}
      >
        Подходящий экипаж:
      </Typography>

      {currentCrew && <VehicleInformation {...currentCrew} />}
    </div>
  );
};

export default memo(NearestCrew);

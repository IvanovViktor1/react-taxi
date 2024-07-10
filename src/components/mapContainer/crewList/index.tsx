import { FC, memo } from "react";
import { useAppSelector } from "../../../redux/store";
import { selectAllCrews } from "../../../redux/crewsSlice/crewsSlice";

import CrewItem from "./CrewItem";
import styles from "./crews.module.scss";

const CrewList: FC = () => {
  const crews = useAppSelector(selectAllCrews);

  return (
    <div
      className={styles.crewList}
      style={{ width: crews.length > 0 ? "30vw" : "0px" }}
    >
      {crews.length > 0 &&
        crews.map((crew) => <CrewItem key={crew.crew_id} {...crew} />)}
    </div>
  );
};

export default memo(CrewList);

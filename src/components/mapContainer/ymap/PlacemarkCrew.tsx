import { FC, useState } from "react";
import { Placemark } from "@pbe/react-yandex-maps";
import { Crew } from "../../../redux/crewsSlice/types";
import { setNewCrew } from "../../../redux/crewsSlice/crewsSlice";
import { useAppDispatch } from "../../../redux/store";

const PlacemarkCrew: FC<Crew> = (crew) => {
  const dispatch = useAppDispatch();
  const [descVissible, setDescVisible] = useState(false);

  const handleClickCrew = (crew: Crew) => {
    dispatch(setNewCrew(crew));
  };

  return (
    <Placemark
      key={crew.crew_id}
      geometry={[crew.lat, crew.lon]}
      options={{
        iconImageSize: [10, 10],
        preset: `islands#greenDotIcon`,
      }}
      onMouseEnter={() => setDescVisible(true)}
      onMouseLeave={() => setDescVisible(false)}
      onClick={() => handleClickCrew(crew)}
      properties={{
        iconCaption:
          descVissible &&
          `${crew.car_color} ${crew.car_mark} ${crew.car_model}`,
      }}
    />
  );
};

export default PlacemarkCrew;

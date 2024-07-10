import { FC, useRef, useEffect, memo, useCallback } from "react";
import { Placemark, YMaps, Map } from "@pbe/react-yandex-maps";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  resetInputValidation,
  resetStatus,
  selectColorMarker,
  selectCurrentAddress,
  selectStatusFetchMarkers,
} from "../../../redux/currentMarkerSlice/markerSlice";
import { fetchAddress } from "../../../redux/currentMarkerSlice/asyncActions";
import { RequestStatus } from "../../../redux/types";
import { fetchCrews } from "../../../redux/crewsSlice/fetchCrewsThunk";
import {
  resetAllCrews,
  selectAllCrews,
} from "../../../redux/crewsSlice/crewsSlice";
import PlacemarkCrew from "./PlacemarkCrew";
import { getCurrentDateTime } from "../../../utils/getCurrentDateTime";

import styles from "./yandexMap.module.scss";
import { CircularProgress } from "@mui/material";

interface IMarker {
  coordinates: number[];
}
export const Marker: FC<IMarker> = memo(({ coordinates }) => {
  return <Placemark defaultGeometry={coordinates} />;
});

const YandexMap: FC = () => {
  const dispatch = useAppDispatch();

  const ref = useRef();
  const ref2 = useRef();

  const crews = useAppSelector(selectAllCrews);
  const currentMarker = useAppSelector(selectCurrentAddress);
  const markerStatus = useAppSelector(selectStatusFetchMarkers);
  const colorMarker = useAppSelector(selectColorMarker);

  const handleMapClick = async (event: ymaps.MapEvent) => {
    const coords = event.get("coords") as number[];
    dispatch(fetchAddress({ type: "coords", data: coords }));
    dispatch(resetInputValidation());
  };

  const fetchCrewsCallback = useCallback(() => {
    if (currentMarker) {
      dispatch(
        fetchCrews({
          source_time: getCurrentDateTime(),
          addresses: [currentMarker],
        })
      );
    }
  }, [currentMarker, dispatch]);

  useEffect(() => {
    if (markerStatus === RequestStatus.Succeeded) {
      dispatch(resetStatus());
    }
    if (
      markerStatus === RequestStatus.Failed ||
      markerStatus === RequestStatus.Loading ||
      markerStatus === RequestStatus.Idle
    ) {
      dispatch(resetAllCrews());
    }
  }, [markerStatus, dispatch]);

  useEffect(() => {
    if (markerStatus === RequestStatus.Succeeded && currentMarker) {
      fetchCrewsCallback();
    }
  }, [markerStatus, currentMarker]);

  return (
    <div className={styles.containerMap}>
      {markerStatus === RequestStatus.Loading && (
        <div className={styles.loaderContainer}>
          <CircularProgress size={"2em"} className={styles.loader} />
        </div>
      )}
      <YMaps>
        <Map
          instanceRef={ref2}
          className={styles.map}
          defaultState={{
            center: [63.196078, 75.456355],
            zoom: 17,
          }}
          state={{
            center: currentMarker
              ? [currentMarker.lat, currentMarker.lon]
              : [63.196078, 75.456355],
            zoom: 17,
          }}
          onClick={handleMapClick}
        >
          {currentMarker && (
            <Placemark
              instanceRef={ref}
              geometry={[currentMarker.lat, currentMarker.lon]}
              options={{
                iconImageSize: [10, 10],
                preset: `islands#${colorMarker}DotIcon`,
              }}
              properties={{
                iconCaption:
                  markerStatus === RequestStatus.Failed && "Адрес не найден",
              }}
            />
          )}
          {crews &&
            crews.map((crew) => <PlacemarkCrew key={crew.crew_id} {...crew} />)}
        </Map>
      </YMaps>
    </div>
  );
};

export default YandexMap;

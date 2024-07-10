import { FC, memo, useCallback } from "react";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import styles from "./crews.module.scss";
import { Paper, ListItem, ListItemText } from "@mui/material";
import { Crew } from "../../../redux/crewsSlice/types";
import { getColorHex } from "../../../utils/colorsRu";
import {
  selectCurrentCrew,
  setNewCrew,
} from "../../../redux/crewsSlice/crewsSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import IconButton from "@mui/material/IconButton";

const CrewItem: FC<Crew> = (crew) => {
  const dispatch = useAppDispatch();

  const handleClickCrew = useCallback(() => {
    dispatch(setNewCrew(crew));
  }, [crew, dispatch]);

  const selected = useAppSelector(selectCurrentCrew);

  return (
    <Paper
      elevation={3}
      className={
        selected?.crew_id === crew.crew_id
          ? styles.crewItemSelected
          : styles.crewItem
      }
      onClick={handleClickCrew}
    >
      <ListItem
        sx={{ p: 0 }}
        secondaryAction={
          <div style={{ display: "flex", alignItems: "center" }}>
            {`${crew.distance}м.`}
            <IconButton edge="end">
              <KeyboardArrowRightIcon />
            </IconButton>
          </div>
        }
      >
        <ListItemAvatar sx={{ p: 1 }}>
          <Avatar>
            <DirectionsCarIcon style={{ color: getColorHex(crew.car_color) }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${crew.car_mark} ${crew.car_model}`}
          secondary={crew.car_color}
        />
      </ListItem>
    </Paper>
  );
};
export default memo(CrewItem);

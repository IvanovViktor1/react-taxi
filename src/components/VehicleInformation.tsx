import { FC, memo } from "react";
import { Paper, List, ListItem, ListItemText, Typography } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { getColorHex } from "../utils/colorsRu";
import { Crew } from "../redux/crewsSlice/types";
import styles from "./components.module.scss";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

const VehicleInformation: FC<Crew> = (data) => {
  return (
    <Paper elevation={3} className={styles.vehicleInformation}>
      <List className={styles.firstRow}>
        <ListItem sx={{ paddingBlock: 0 }}>
          <ListItemAvatar>
            <Avatar>
              <DirectionsCarIcon
                style={{ color: getColorHex(data.car_color) }}
              />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`${data.car_mark} ${data.car_model}`}
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  {data.car_color}
                </Typography>
                <Paper className={styles.carNumber} elevation={4}>
                  {data.car_number}
                </Paper>
              </>
            }
          />
        </ListItem>
      </List>
    </Paper>
  );
};

export default memo(VehicleInformation);

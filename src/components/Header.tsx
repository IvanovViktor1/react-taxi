import { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import styles from "./components.module.scss";
export const Header: FC = () => {
  return (
    <AppBar position="static" className={styles.header}>
      <Toolbar variant="dense" sx={{ backgroundColor: "white" }}>
        <Typography variant="h6" sx={{ color: "#0B5094" }} component="div">
          Детали заказа
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

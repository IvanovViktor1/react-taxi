import React, { FC, useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchAddress } from "../redux/currentMarkerSlice/asyncActions";
import { resetAllCrews } from "../redux/crewsSlice/crewsSlice";
import {
  clearAddress,
  resetInputValidation,
  selectCurrentAddress,
  selectErrorMessage,
  selectValidationResult,
  setValidationInfo,
} from "../redux/currentMarkerSlice/markerSlice";
import { createOrder } from "../redux/crewsSlice/fetchCrewsThunk";
import { validateAddress } from "../utils/isValidAddress";
import { getCurrentDateTime } from "../utils/getCurrentDateTime";

import MapContainer from "./mapContainer";
import NearestCrew from "./NearestCrew";
import styles from "./components.module.scss";
import { Box, TextField, Typography, Container, Button } from "@mui/material";

//@ts-ignore
import debounce from "lodash.debounce";

const MapForm: FC = () => {
  const dispatch = useAppDispatch();
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState("");

  const currentAddress = useAppSelector(selectCurrentAddress);
  const inputValidation = useAppSelector(selectValidationResult);
  const errorMsg = useAppSelector(selectErrorMessage);

  const handleSubmit = useCallback(() => {
    if (!currentAddress && !errorMsg) {
      setDisabled(true);
    } else if (currentAddress && currentAddress.address) {
      dispatch(
        createOrder({
          source_time: getCurrentDateTime(),
          addresses: [currentAddress],
          crew_id: 2,
        })
      );
    }
  }, [currentAddress, errorMsg]);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearch(event.target.value);
  };

  const updateSearch = useCallback(
    debounce((str: string) => {
      const valid = validateAddress(str);

      if (valid.code === 0) {
        dispatch(resetInputValidation());
        dispatch(fetchAddress({ type: "address", data: str }));
      } else {
        dispatch(setValidationInfo(valid));
      }
    }, 1500),
    []
  );

  useEffect(() => {
    if (currentAddress) {
      setValue(currentAddress.address);
    }
  }, [currentAddress]);

  useEffect(() => {
    if (inputValidation.code !== 0) {
      dispatch(resetAllCrews());
      dispatch(clearAddress());
    } else {
      setDisabled(false);
    }
  }, [inputValidation]);

  return (
    <div className={styles.mapForm}>
      <Container
        className={styles.searchContainer}
        component="form"
        noValidate
        autoComplete="off"
      >
        <Box
          sx={{
            display: "flex",
            width: "90%",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              width: "30%",
              minWidth: "30%",
              justifyContent: "right",
              color: "#0B5094",
            }}
          >
            Адрес:
          </Typography>
          <TextField
            placeholder="Советская, 73"
            multiline
            maxRows={4}
            sx={{ width: "50%", backgroundColor: "white" }}
            value={value}
            onChange={onChangeInput}
            error={inputValidation.message ? true : false}
            label={inputValidation.message ? inputValidation.message : null}
            variant="outlined"
          />
        </Box>
        <NearestCrew />
      </Container>
      <MapContainer />
      <Button
        disabled={disabled}
        type="submit"
        color="info"
        variant="contained"
        sx={{
          margin: "0 auto",
          width: "30vw",
          padding: "10px",
          fontSize: "large",
        }}
        onClick={handleSubmit}
      >
        Заказать
      </Button>
    </div>
  );
};

export default MapForm;

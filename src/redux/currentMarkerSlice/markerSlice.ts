import {
  ValidationResult,
  validateAddress,
} from "./../../utils/isValidAddress";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { MarkerState, TAddress, TRejectValue } from "./types";
import { fetchAddress } from "./asyncActions";
import { RequestStatus } from "../types";

const initialState: MarkerState = {
  currentAddress: null,
  status: RequestStatus.Idle,
  error: null,
  markerColor: "yellow",
  inputValidation: {
    code: 0,
    message: null,
  },
};

export const markerSlice = createSlice({
  name: "markers",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = RequestStatus.Idle;
    },
    clearAddress: (state) => {
      state.currentAddress = null;
    },
    setInitialState: (state) => {
      state = initialState;
    },
    setValidationInfo: (state, action: PayloadAction<ValidationResult>) => {
      state.inputValidation = action.payload;
    },
    resetInputValidation: (state) => {
      state.inputValidation = {
        code: 0,
        message: null,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchAddress.fulfilled,
      (state, action: PayloadAction<TAddress>) => {
        state.currentAddress = action.payload;
        state.status = RequestStatus.Succeeded;

        state.error = null;

        state.markerColor = "yellow";
      }
    );
    builder.addCase(fetchAddress.pending, (state) => {
      state.status = RequestStatus.Loading;
      state.error = null;
    });
    builder.addCase(
      fetchAddress.rejected,
      (state, action: PayloadAction<TRejectValue | undefined>) => {
        state.status = RequestStatus.Failed;
        if (action.payload) {
          state.error = action.payload.errorMessage;
          if (action.payload.data) {
            state.currentAddress = {
              address: "",
              lat: action.payload.data.lat,
              lon: action.payload.data.lon,
            };
          } else {
            state.error = "Неизвестная ошибка";
          }
        }
        state.markerColor = "red";
      }
    );
  },
});

export const {
  resetStatus,
  clearAddress,
  setInitialState,
  setValidationInfo,
  resetInputValidation,
} = markerSlice.actions;

export const selectCurrentAddress = (state: RootState) =>
  state.markers.currentAddress;
export const selectStatusFetchMarkers = (state: RootState) =>
  state.markers.status;
export const selectColorMarker = (state: RootState) =>
  state.markers.markerColor;

export const selectErrorMessage = (state: RootState) => state.markers.error;
export const selectValidationResult = (state: RootState) =>
  state.markers.inputValidation;

export default markerSlice.reducer;

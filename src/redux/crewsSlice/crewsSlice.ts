import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { RequestStatus } from "../types";
import { Crew, CrewsState, OrderResponse } from "./types";
import { createOrder, fetchCrews } from "./fetchCrewsThunk";

const initialState: CrewsState = {
  selectedCrew: null,
  allCrews: [],
  orderId: null,
  status: RequestStatus.Idle,
  error: null,
};

export const crewsSlice = createSlice({
  name: "crews",
  initialState,
  reducers: {
    resetAllCrews: (state) => {
      state.allCrews = [];
      state.selectedCrew = null;
    },
    setNewCrew: (state, action: PayloadAction<Crew>) => {
      state.selectedCrew = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrews.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchCrews.fulfilled, (state, action: PayloadAction<Crew[]>) => {
        state.status = RequestStatus.Succeeded;
        state.allCrews = action.payload.sort((a, b) => a.distance - b.distance);
        if (state.allCrews.length > 0) {
          state.selectedCrew = state.allCrews[0];
        }
      })
      .addCase(fetchCrews.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.error.message || null;
      })

      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<OrderResponse>) => {
          if (action.payload) {
            state.orderId = action.payload.data.order_id;
            state.status = RequestStatus.Succeeded;
            alert(`Ваш заказ№ ${action.payload.data.order_id}`); //p.s. знаю логи здесь выводить нельзя, это для демонстрации
          }
        }
      )
      .addCase(createOrder.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(createOrder.rejected, (state, action) => {
        if (action.error.message) {
          state.error = action.error.message;
        }
        state.status = RequestStatus.Failed;
      });
  },
});

export const { resetAllCrews, setNewCrew } = crewsSlice.actions;

export const selectAllCrews = (state: RootState) => state.crews.allCrews;
export const selectCurrentCrew = (state: RootState) => state.crews.selectedCrew;
export const selectStatusFetchCrew = (state: RootState) => state.crews.status;
export const selectOrderId = (state: RootState) => state.crews.orderId;

export default crewsSlice.reducer;

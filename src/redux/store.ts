import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import markerReduces from "./currentMarkerSlice/markerSlice";
import crewsReduces from "./crewsSlice/crewsSlice";
export const store = configureStore({
  reducer: {
    markers: markerReduces,
    crews: crewsReduces,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

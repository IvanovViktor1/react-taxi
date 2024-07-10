import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  Crew,
  CrewRequestForCrews,
  OrderRequest,
  OrderResponse,
} from "./types";
import { mockFetchCrews } from "../../utils/mockFetchCrews";

export const fetchCrews = createAsyncThunk<Crew[], CrewRequestForCrews>(
  "crews/fetchCrews",
  async (request: CrewRequestForCrews) => {
    const response = await mockFetchCrews(request);

    return response.data.crews_info;
  }
);

export const createOrder = createAsyncThunk<OrderResponse, OrderRequest>(
  "crews/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const apiResponse = (): Promise<OrderResponse> => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              code: 0,
              descr: "OK",
              data: {
                order_id: Math.floor(Math.random() * 10000) + 1,
              },
            });
          }, 1000);
        });
      };

      const response = await apiResponse();
      return response;
    } catch (error) {
      return rejectWithValue("Failed to create order");
    }
  }
);

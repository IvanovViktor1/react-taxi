import { TAddress } from "../currentMarkerSlice/types";
import { RequestStatus } from "../types";

export interface CrewsState {
  selectedCrew: Crew | null;
  allCrews: Crew[];
  orderId: number | null;
  status: RequestStatus;
  error: string | null;
}

export type Crew = {
  crew_id: number;
  car_mark: string;
  car_model: string;
  car_color: string;
  car_number: string;
  driver_name: string;
  driver_phone: string;
  lat: number;
  lon: number;
  distance: number;
};

export type Car = {
  [K in keyof Crew as K extends `car${string}` ? K : never]: Crew[K];
};

export type Driver = {
  [K in keyof Crew as K extends `driver${string}` ? K : never]: Crew[K];
};

export interface CrewServerResponse {
  code: number;
  descr: string;
  data: {
    crews_info: Crew[];
  };
}

export interface CrewRequestForCrews {
  source_time: string;
  addresses: TAddress[];
}

export interface OrderRequest extends CrewRequestForCrews {
  crew_id: number;
}

interface ResponseData {
  order_id: number;
}

export interface OrderResponse {
  code: number;
  descr: string;
  data: ResponseData;
}

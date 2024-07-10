import { ValidationResult } from "../../utils/isValidAddress";
import { RequestStatus } from "../types";

export type TAddress = {
  address: string;
  lat: number;
  lon: number;
};

export type TRejectValue = {
  errorMessage: string;
  data: Omit<TAddress, "address"> | null;
};

export interface MarkerState {
  currentAddress: TAddress | null;
  status: RequestStatus;
  error: string | null;
  markerColor: "red" | "yellow";
  inputValidation: ValidationResult;
}

export interface YandexGeocoderResponse {
  response: {
    GeoObjectCollection: {
      metaDataProperty: {
        GeocoderResponseMetaData: GeocoderResponseMetaData;
      };
      featureMember: FeatureMember[];
    };
  };
}

export interface RequestParams {
  type: "coords" | "address";
  data: number[] | string;
}

export interface GeocoderResponseMetaData {
  request: string;
  found: string;
  results: string;
}

export interface FeatureMember {
  GeoObject: {
    metaDataProperty: {
      GeocoderMetaData: GeocoderMetaData;
    };
    description: string;
    name: string;
    boundedBy: {
      Envelope: {
        lowerCorner: string;
        upperCorner: string;
      };
    };
    Point: {
      pos: string;
    };
  };
}

export interface GeocoderMetaData {
  kind: string;
  text: string;
  precision: string;
  Address: {
    country_code: string;
    postal_code: string;
    formatted: string;
    Components: Component[];
  };
  AddressDetails: {
    Country: Country;
  };
}

export interface Component {
  kind: string;
  name: string;
}

export interface Country {
  AddressLine: string;
  CountryNameCode: string;
  CountryName: string;
  AdministrativeArea: AdministrativeArea;
}

export interface AdministrativeArea {
  AdministrativeAreaName: string;
  Locality: Locality;
}

export interface Locality {
  LocalityName: string;
  Thoroughfare: Thoroughfare;
}

export interface Thoroughfare {
  ThoroughfareName: string;
  Premise: Premise;
}

export interface Premise {
  PremiseNumber: string;
  PostalCode: {
    PostalCodeNumber: string;
  };
}

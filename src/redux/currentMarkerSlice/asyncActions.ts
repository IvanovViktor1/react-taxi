import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  RequestParams,
  TAddress,
  TRejectValue,
  YandexGeocoderResponse,
} from "./types";
import { validateAddress } from "../../utils/isValidAddress";

export const fetchAddress = createAsyncThunk<
  TAddress,
  RequestParams,
  { rejectValue: TRejectValue }
>(
  "markers/fetchAddress",
  async (params: RequestParams, { rejectWithValue }) => {
    const regex = /\d/;
    let query: string;
    let additionalParams = "";
    let houseNumberRequest = "";

    if (params.type === "coords") {
      const coords = params.data as number[];
      query = `${coords[1]},${coords[0]}`;
    } else {
      const address = params.data as string;
      query = encodeURIComponent(`Ноябрьск, ${address}`);
      additionalParams = "&ll=63.142321,75.399522&spn=3.552069,2.400552";
      let match = address.match(/\d+[A-Za-zА-Яа-я]*/);

      if (match) {
        houseNumberRequest = match[0].toLowerCase();
      }
    }

    try {
      const url = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=898d5d12-42f3-489f-a7ef-27632624ca5b&geocode=${query}${additionalParams}`;
      const response = await fetch(url);
      const data: YandexGeocoderResponse = await response.json();
      if (!response.ok)
        return rejectWithValue({
          errorMessage: "Адрес не найден.",
          data: {
            lat: params.data[0] as number,
            lon: params.data[1] as number,
          },
        });

      if (data.response.GeoObjectCollection.featureMember.length > 0) {
        const geoObject =
          data.response.GeoObjectCollection.featureMember[0].GeoObject;
        const fullAddress = geoObject.metaDataProperty.GeocoderMetaData.text;

        const addressParts = fullAddress.split(", ");
        const streetAndHouse = addressParts.slice(-2).join(", ");
        const pointCoords = geoObject.Point.pos.split(" ").map(Number);

        let match = streetAndHouse.match(/\d+[A-Za-zА-Яа-я]*/);

        if (params.type === "address" && match) {
          let houseNumber = match[0].toLowerCase();
          if (houseNumberRequest === houseNumber) {
            return {
              address: streetAndHouse,
              lat: pointCoords[1],
              lon: pointCoords[0],
            };
          } else if (houseNumberRequest !== houseNumber) {
            return rejectWithValue({
              errorMessage: "Адрес не найден.",
              data: null,
            });
          }
        } else if (params.type === "coords" && !regex.test(streetAndHouse)) {
          return rejectWithValue({
            errorMessage: "Адрес не найден.",
            data: {
              lat: params.data[0] as number,
              lon: params.data[1] as number,
            },
          });
        }

        return {
          address: streetAndHouse,
          lat: params.data[0] as number,
          lon: params.data[1] as number,
        };
      } else {
        return rejectWithValue({
          errorMessage: "Адрес не найден.",
          data: {
            lat: params.data[0] as number,
            lon: params.data[1] as number,
          },
        });
      }
    } catch (error) {
      return rejectWithValue({
        errorMessage: `Ошибка: ${String(error)}`,
        data: {
          lat: params.data[0] as number,
          lon: params.data[1] as number,
        },
      });
    }
  }
);

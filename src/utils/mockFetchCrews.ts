import {
  CrewRequestForCrews,
  CrewServerResponse,
} from "../redux/crewsSlice/types";

export const mockFetchCrews = (
  request: CrewRequestForCrews
): Promise<CrewServerResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 0,

        descr: "OK",
        data: {
          crews_info: [
            {
              crew_id: 111,
              car_mark: "Chevrolet",
              car_model: "Lacetti",
              car_color: "синий",
              car_number: "Е234КУ",
              driver_name: "Деточкин",
              driver_phone: "7788",
              lat: 63.193593,
              lon: 75.45557,
              distance: 300,
            },
            {
              crew_id: 112,
              car_mark: "Hyundai",
              car_model: "Solaris",
              car_color: "белый",
              car_number: "Ф567АС",
              driver_name: "Петров",
              driver_phone: "8899",
              lat: 63.196374,
              lon: 75.465122,
              distance: 600,
            },
            {
              crew_id: 113,
              car_mark: "Lada",
              car_model: "Vesta",
              car_color: "белый",
              car_number: "У823НТ",
              driver_name: "Самарин",
              driver_phone: "7932",
              lat: 63.19435,
              lon: 75.450785,
              distance: 450,
            },
            {
              crew_id: 114,
              car_mark: "Volkswagen",
              car_model: "Polo",
              car_color: "красный",
              car_number: "М312РН",
              driver_name: "Иванов",
              driver_phone: "8941",
              lat: 63.194671,
              lon: 75.443455,
              distance: 1200,
            },
            {
              crew_id: 115,
              car_mark: "Kia",
              car_model: "Rio",
              car_color: "серый",
              car_number: "У144ВН",
              driver_name: "Бельский",
              driver_phone: "8921",
              lat: 63.193294,
              lon: 75.462832,
              distance: 850,
            },
            {
              crew_id: 116,
              car_mark: "Lada",
              car_model: "Granta",
              car_color: "коричневый",
              car_number: "Е732НВ",
              driver_name: "Кузнецов",
              driver_phone: "8922",
              lat: 63.195526,
              lon: 75.462445,
              distance: 500,
            },
          ],
        },
      });
    }, 1000);
  });
};

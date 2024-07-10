export interface ColorDictionary {
  [key: string]: string;
}

export const colorDictionary: ColorDictionary = {
  черный: "#000000",
  белый: "#FFFFFF",
  красный: "#FF0000",
  зеленый: "#008000",
  синий: "#0000FF",
  желтый: "#FFFF00",
  оранжевый: "#FFA500",
  розовый: "#FFC0CB",
  фиолетовый: "#800080",
  коричневый: "#A52A2A",
  серый: "#808080",
  голубой: "#ADD8E6",
  бирюзовый: "#40E0D0",
  лиловый: "#C8A2C8",
  пурпурный: "#800080",
  золотой: "#FFD700",
  серебряный: "#C0C0C0",
  хаки: "#F0E68C",
  салатовый: "#7FFF00",
  бордовый: "#800000",
  лавандовый: "#E6E6FA",
  мятный: "#98FF98",
  песочный: "#C2B280",
  шоколадный: "#D2691E",
};

export const getColorHex = (colorName: string): string => {
  const defaultColor = "#808080"; //gray
  const colorHex = colorDictionary[colorName.toLowerCase()];
  return colorHex ? colorHex : defaultColor;
};

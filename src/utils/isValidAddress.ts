export interface ValidationResult {
  code: number;
  message?: string | null;
}

export const validateAddress = (address: string): ValidationResult => {
  const englishRegex = /[A-Za-z]/;
  if (englishRegex.test(address)) {
    return { code: 1, message: "Допускается только кириллица" };
  }

  const onlyNumbersRegex = /^[0-9\s]+$/;
  if (onlyNumbersRegex.test(address)) {
    return { code: 2, message: "Вы забыли ввести улицу" };
  }

  const addressRegex = /^[А-Яа-яЁё\s,]+\d+$/;
  if (!addressRegex.test(address)) {
    return {
      code: 3,
      message: "Адрес должен включать название улицы и номер дома",
    };
  }

  if (address.trim() === "") {
    return {
      code: 4,
      message: "Адрес не может быть пустым",
    };
  }
  return { code: 0 };
};

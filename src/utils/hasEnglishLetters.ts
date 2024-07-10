export const hasEnglishLetters = (str: string): boolean => {
  const englishRegex = /[A-Za-z]/;
  return englishRegex.test(str);
};

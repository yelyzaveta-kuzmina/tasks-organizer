export const safeParse = (json, fallbackValue) => {
  if (!json) {
    return fallbackValue;
  }

  try {
    return JSON.parse(json);
  } catch (error) {
    return fallbackValue;
  }
};

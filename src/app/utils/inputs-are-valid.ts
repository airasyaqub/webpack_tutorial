export const inputsAreValid = (...input: any[]): boolean => {
  return input.every(num => typeof num === "number" && !isNaN(num));
};

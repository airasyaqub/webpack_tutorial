export const parseInputs = (...input: any[]): number[] => {
  return input.map(str => parseInt(str));
};

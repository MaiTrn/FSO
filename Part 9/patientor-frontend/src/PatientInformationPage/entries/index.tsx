export { default as HealthCheck } from "./HealthCheck";
export { default as Hospital } from "./Hospital";
export { default as OccupationalHealthcare } from "./OccupationalHealthcare";

export const assertNever = (value: never): never => {
  throw new Error(`
 Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

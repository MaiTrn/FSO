/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Diagnosis,
  EntryWithoutId,
  Gender,
  HealthCheckRating,
  PatientWithoutId,
  NoIdBaseEntry,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (str: unknown, type: string): string => {
  if (!str || !isString(str)) {
    throw new Error(`Incorrect or missing ${type}!`);
  }
  return str;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date!");
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender!");
  }
  return gender;
};
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (
    (healthCheckRating !== 0 && !healthCheckRating) ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error("Incorrect or missing health check rating!");
  }
  return healthCheckRating;
};

const isDiagnosisCodes = (
  param: Array<any>
): param is Array<Diagnosis["code"]> => {
  return param.every((code: unknown) => isString(code));
};

const parseDiagnosisCodes = (
  diagnosisCodes: Array<unknown>
): Array<Diagnosis["code"]> => {
  if (!diagnosisCodes || !isDiagnosisCodes(diagnosisCodes)) {
    throw new Error("Incorrect or missing health check rating!");
  }
  return diagnosisCodes;
};

type PatientFields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: PatientFields): PatientWithoutId => {
  const newEntry: PatientWithoutId = {
    name: parseString(name, "name"),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn, "ssn"),
    gender: parseGender(gender),
    occupation: parseString(occupation, "occupation"),
    entries: [],
  };

  return newEntry;
};

const toNewEntry = (props: any): EntryWithoutId => {
  const newBaseEntry: NoIdBaseEntry = {
    date: parseDate(props.date),
    description: parseString(props.description, "description"),
    specialist: parseString(props.specialist, "specialist"),
  };
  if (props.diagnosisCodes) {
    newBaseEntry.diagnosisCodes = parseDiagnosisCodes(props.diagnosisCodes);
  }

  switch (props.type) {
    case "Hospital":
      return {
        ...newBaseEntry,
        type: props.type,
        discharge: {
          date: parseDate(props.discharge.date),
          criteria: parseString(props.discharge.criteria, "criteria"),
        },
      };
    case "HealthCheck":
      return {
        ...newBaseEntry,
        type: props.type,
        healthCheckRating: parseHealthCheckRating(props.healthCheckRating),
      };
    case "OccupationalHealthcareEntry":
      const newEntry: EntryWithoutId = {
        ...newBaseEntry,
        type: props.type,
        employerName: parseString(props.employerName, "emmployer name"),
      };
      if (props.sickLeave) {
        newEntry.sickLeave = {
          startDate: parseDate(props.sickLeave.startDate),
          endDate: parseDate(props.sickLeave.endDate),
        };
      }
      return newEntry;
    default:
      throw new Error("Undiscriminated UNION member");
  }
};

export default { toNewPatientEntry, toNewEntry };

import { v1 as uuid } from "uuid";

import { patients } from "../../data";
import {
  Patient,
  PublicPatient,
  PatientWithoutId,
  EntryWithoutId,
  Entry,
} from "../types";

const getEntries = (): Array<Patient> => {
  return patients;
};
const getPublicPatientEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const addPatient = (entry: PatientWithoutId): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};
const addEntry = (id: string, entry: EntryWithoutId): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  patients.forEach((patient) =>
    patient.id === id ? patient.entries.push(newEntry) : null
  );
  return newEntry;
};

export default {
  getEntries,
  getPublicPatientEntries,
  findById,
  addPatient,
  addEntry,
};

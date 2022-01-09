import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT_INFO";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      patientId: string;
      payload: Entry;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_PATIENT_INFO":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({
              ...memo,
              [diagnosis.code]: diagnosis,
            }),
            {}
          ),
          ...state.diagnoses,
        },
      };
    case "ADD_ENTRY":
      const addedEntryPatient = state.patients[action.patientId];
      addedEntryPatient.entries.push(action.payload);
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.patientId]: addedEntryPatient,
        },
      };
    default:
      return state;
  }
};

export const setPatientList = (patientList: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload: patientList };
};

export const addPatient = (newPatient: Patient): Action => {
  return { type: "ADD_PATIENT", payload: newPatient };
};

export const setPatientInfo = (patient: Patient): Action => {
  return { type: "SET_PATIENT_INFO", payload: patient };
};

export const setDiagnosisList = (diagnosisList: Diagnosis[]): Action => {
  return { type: "SET_DIAGNOSIS_LIST", payload: diagnosisList };
};

export const addEntry = (patientId: string, newEntry: Entry): Action => {
  return { type: "ADD_ENTRY", patientId, payload: newEntry };
};

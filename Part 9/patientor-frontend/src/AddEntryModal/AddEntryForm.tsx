import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { Type, Option, SelectField } from "../AddPatientModal/FormField";
import { Entry } from "../types";
import HealthCheckForm from "./HealthCheckForm";
import HospitalForm from "./HospitalForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
// Define Entry without the 'id' property
export type EntryFormValues = UnionOmit<Entry, "id">;

export interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: Option[] = [
  { value: "HealthCheck", label: "Health Check" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
  { value: "Hospital", label: "Hospital" },
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [type, setType] = useState<Type>("HealthCheck");

  const changeType = (values: { type: Type }): void => {
    setType(values.type);
  };

  return (
    <div>
      <Formik initialValues={{ type: "HealthCheck" }} onSubmit={changeType}>
        <Form className="form ui">
          <SelectField label="Type" name="type" options={typeOptions} />
          <Button type="submit" color="green">
            Change Type
          </Button>
        </Form>
      </Formik>
      {type === "HealthCheck" && (
        <HealthCheckForm {...{ onSubmit, onCancel }} />
      )}
      {type === "OccupationalHealthcare" && (
        <OccupationalHealthcareForm {...{ onSubmit, onCancel }} />
      )}
      {type === "Hospital" && <HospitalForm {...{ onSubmit, onCancel }} />}
    </div>
  );
};

export default AddEntryForm;

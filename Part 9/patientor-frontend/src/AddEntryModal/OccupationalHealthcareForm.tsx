import { Form, Formik, Field } from "formik";
import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Props } from "./AddEntryForm";

const OccupationalHealthcareForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: "OccupationalHealthcare",
        date: "",
        specialist: "",
        description: "",
        diagnosisCodes: [],
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="yyyy-mm-dd"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick Leave Start Date"
              placeholder="yyyy-mm-dd"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick Leave End Date"
              placeholder="yyyy-mm-dd"
              name="sickLeave.endDate"
              component={TextField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OccupationalHealthcareForm;

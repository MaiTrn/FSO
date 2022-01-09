import { Form, Formik, Field } from "formik";
import React from "react";
import { Grid, Button } from "semantic-ui-react";
import {
  TextField,
  DiagnosisSelection,
  NumberField,
} from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { EntryFormValues, Props } from "./AddEntryForm";

const HealthCheckForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  const submitHealthCheck = (values: EntryFormValues): void => {
    console.log(values);
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        date: "",
        specialist: "",
        description: "",
        diagnosisCodes: [],
        healthCheckRating: 0,
      }}
      onSubmit={submitHealthCheck}
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
        if (
          values.type === "HealthCheck" &&
          values.healthCheckRating !== 0 &&
          !values.healthCheckRating
        ) {
          errors.healthCheckRating = requiredError;
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
              label="Health Check Rating"
              min={0}
              max={3}
              name="healthCheckRating"
              component={NumberField}
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

export default HealthCheckForm;

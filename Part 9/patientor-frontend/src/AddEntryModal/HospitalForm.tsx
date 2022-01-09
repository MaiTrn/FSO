import { Form, Formik, Field } from "formik";
import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Props } from "./AddEntryForm";

const HospitalForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: "Hospital",
        date: "",
        specialist: "",
        description: "",
        diagnosisCodes: [],
        discharge: {
          date: "",
          criteria: "",
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
        if (values.type === "Hospital" && !values.discharge.date) {
          errors.dischargeDate = requiredError;
        }
        if (values.type === "Hospital" && !values.discharge.criteria) {
          errors.dischargeCriteria = requiredError;
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
              label="Discharge date"
              placeholder="yyyy-mm-dd"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder="Discharge criteria"
              name="discharge.criteria"
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

export default HospitalForm;

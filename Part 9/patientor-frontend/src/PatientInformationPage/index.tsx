import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { Entry, Gender, Patient } from "../types";
import { useStateValue, setPatientInfo, addEntry } from "../state";
import { Button, Card, Icon, Segment, SemanticICONS } from "semantic-ui-react";

import {
  assertNever,
  Hospital,
  HealthCheck,
  OccupationalHealthcare,
} from "./entries";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientInformationPage = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => setModalOpen(false);

  React.useEffect(() => {
    const fetchPatientInfo = async (patientId: string) => {
      try {
        const { data: patientInfo } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${patientId}`
        );
        dispatch(setPatientInfo(patientInfo));
      } catch (e) {
        console.error(e);
      }
    };
    if (!patients[id] || !patients[id].ssn) {
      console.log(`fetching data for patient ${id}...`);
      void fetchPatientInfo(id);
    }
  }, [id]);

  const getGenderIcon = (gender: Gender): SemanticICONS => {
    switch (gender) {
      case "male":
        return "mars";
      case "female":
        return "venus";
      default:
        return "genderless";
    }
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    console.log(values);
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(id, newEntry));
      closeModal();
    } catch (e: unknown) {
      let errorMessage = "Something went wrong.";
      if (axios.isAxiosError(e) && e.response) {
        console.error(e.response.data);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        errorMessage = e.response.data.error;
      }
      setError(errorMessage);
    }
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "Hospital":
        return <Hospital entry={entry} />;
      case "HealthCheck":
        return <HealthCheck entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcare entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <div className="App">
      <Card>
        <Card.Content>
          <Card.Header>
            <div style={{ fontWeight: "bold", fontSize: "22px" }}>
              {patients[id].name}{" "}
              <Icon name={getGenderIcon(patients[id].gender)} />
            </div>
          </Card.Header>
          <Card.Description>
            ssn: {patients[id].ssn}
            <br />
            occupation: {patients[id].occupation}
          </Card.Description>
          <AddEntryModal
            modalOpen={modalOpen}
            onClose={closeModal}
            onSubmit={submitNewEntry}
            error={error}
          />
          <Button onClick={openModal}>Add new entry</Button>
        </Card.Content>
      </Card>
      <div>
        <h3>Entries</h3>

        {patients[id].entries?.map((entry) => (
          <Segment key={entry.id}>
            <EntryDetails entry={entry} />
            <ul>
              {entry.diagnosisCodes?.map((code) => (
                <li key={code}>
                  {code} {diagnoses[code].name}
                </li>
              ))}
            </ul>
          </Segment>
        ))}
      </div>
    </div>
  );
};

export default PatientInformationPage;

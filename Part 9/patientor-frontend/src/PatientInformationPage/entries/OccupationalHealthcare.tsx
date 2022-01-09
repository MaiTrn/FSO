import React from "react";
import { Icon } from "semantic-ui-react";
import { OccupationalHealthcareEntry } from "../../types";

interface Props {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcare = ({ entry }: Props) => {
  return (
    <div>
      <div style={{ fontWeight: "bold", fontSize: "16px" }}>
        {entry.date}{" "}
        <Icon name="stethoscope" size="big" style={{ paddingLeft: "5px" }} />{" "}
        {entry.employerName}
      </div>
      <em>{entry.description}</em>
      <br />
      {entry.sickLeave && (
        <em>
          From {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
        </em>
      )}
    </div>
  );
};

export default OccupationalHealthcare;

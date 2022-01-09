import React from "react";
import { Icon } from "semantic-ui-react";
import { HospitalEntry } from "../../types";

interface Props {
  entry: HospitalEntry;
}

const Hospital = ({ entry }: Props) => {
  return (
    <div>
      <p style={{ fontWeight: "bold", fontSize: "18px" }}>
        {entry.date}{" "}
        <Icon name="hospital" size="big" style={{ paddingLeft: "5px" }} />
      </p>
      <em>{entry.description}</em>
      <br />
      <em>
        Discharge {entry.discharge.date} {entry.discharge.criteria}
      </em>
    </div>
  );
};

export default Hospital;

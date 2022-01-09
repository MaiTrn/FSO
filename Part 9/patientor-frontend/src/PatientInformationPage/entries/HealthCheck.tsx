import React from "react";
import { Icon } from "semantic-ui-react";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";
import { HealthCheckEntry, HealthCheckRating } from "../../types";

interface Props {
  entry: HealthCheckEntry;
}

const HealthCheck = ({ entry }: Props) => {
  const getHealthRatingColor = (
    healthCheckRating: HealthCheckRating
  ): SemanticCOLORS => {
    switch (healthCheckRating) {
      case 0:
        return "green";
      case 1:
        return "yellow";
      case 2:
        return "orange";
      case 3:
        return "red";
      default:
        return "black";
    }
  };
  return (
    <div>
      <div style={{ fontWeight: "bold", fontSize: "16px" }}>
        {entry.date}{" "}
        <Icon name="doctor" size="big" style={{ paddingLeft: "5px" }} />
      </div>
      <em>{entry.description}</em>
      <br />
      <Icon
        name="heart"
        color={getHealthRatingColor(entry.healthCheckRating)}
      />
    </div>
  );
};

export default HealthCheck;

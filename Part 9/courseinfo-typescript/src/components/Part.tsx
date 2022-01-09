import React from "react";
import { CoursePart } from "../App";

interface Props {
  part: CoursePart;
}

const Part = ({ part }: Props) => {
  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(`
    Unhandled discriminated union member: ${JSON.stringify(value)}`);
  };

  const additionalInfo = () => {
    switch (part.type) {
      case "normal":
        return <em>{part.description}</em>;
      case "groupProject":
        return <div>project exercises {part.groupProjectCount}</div>;
      case "submission":
        return (
          <>
            <em>{part.description}</em>
            <div>submit to {part.exerciseSubmissionLink}</div>
          </>
        );
      case "special":
        return (
          <>
            <em>{part.description}</em>;
            <div>requirements: {part.requirements.join(", ")}</div>
          </>
        );
      default:
        return assertNever(part);
    }
  };

  return (
    <p>
      <strong>
        {part.name} {part.exerciseCount}
      </strong>
      <div>{additionalInfo()}</div>
    </p>
  );
};

export default Part;

import React from "react";
import { Part } from ".";
import { CoursePart } from "../App";

interface Props {
  courses: CoursePart[];
}

const Content = ({ courses }: Props) => {
  return (
    <div>
      {courses.map((course) => (
        <Part key={course.name} part={course} />
      ))}
    </div>
  );
};

export default Content;

import React from "react";

const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => {
      return <Part key={part.name} part={part} />;
    })}
  </div>
);

const Total = ({ parts }) => (
  <strong>
    Total of {parts.reduce((sum, value) => sum + value.exercises, 0)} exercises
  </strong>
);

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;

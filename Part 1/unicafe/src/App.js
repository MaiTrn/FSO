import React, { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [score, setScore] = useState(0);

  const incrementGood = () => {
    setTotal(total + 1);
    setScore(score + 1);
    setGood(good + 1);
  };
  const incrementNeutral = () => {
    setTotal(total + 1);
    setNeutral(neutral + 1);
  };
  const incrementBad = () => {
    setTotal(total + 1);
    setScore(score - 1);
    setBad(bad + 1);
  };
  const Average = () => (score / total).toFixed(1);
  const Positive = () => ((good / total) * 100).toFixed(1);

  const Header = ({ text }) => <h1>{text}</h1>;
  const Button = ({ text, onClick }) => (
    <button onClick={onClick}>{text}</button>
  );
  const Buttons = () => (
    <div>
      <Button text="Good" onClick={incrementGood} />
      <Button text="Neutral" onClick={incrementNeutral} />
      <Button text="Bad" onClick={incrementBad} />
    </div>
  );
  const StatisticLine = ({ text, value }) => (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );

  const Statistics = () => {
    if (total === 0) {
      return <p>No feedback given</p>;
    }

    return (
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={total} />
          <StatisticLine text="Average" value={Average()} />
          <StatisticLine text="Positive" value={`${Positive()}%`} />
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <Header text="Give Feedback" />
      <Buttons />
      <Header text="Statistics" />
      <Statistics />
    </div>
  );
};

export default App;

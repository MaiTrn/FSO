import React, { useState, useEffect } from "react";

function App() {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
  const [mostVoted, setMostVoted] = useState(0);
  const random = () => {
    const index = Math.ceil(Math.random() * anecdotes.length - 1);
    setSelected(index);
  };
  const vote = () => {
    const copy = [...points];
    copy[selected] = copy[selected] + 1;
    setPoints(copy);
  };

  useEffect(() => {
    const mostVotedAnecdote = () => {
      const max = points.indexOf(points.reduce((a, b) => Math.max(a, b), 0));
      setMostVoted(max);
    };
    mostVotedAnecdote();
  }, [points]);

  const Button = ({ text, onClick }) => (
    <button onClick={onClick}>{text}</button>
  );
  const SelectedAnecdoteInfo = ({ index }) => (
    <div>
      <p>{anecdotes[index]}</p>
      <p>This anecdote has {points[index]} votes</p>
    </div>
  );
  return (
    <div className="App">
      <h1>Anecdote of the day</h1>
      <SelectedAnecdoteInfo index={selected} />
      <Button onClick={vote} text="Vote" />
      <Button onClick={random} text="Next anecdote" />
      <h1>Anecdote with most votes</h1>
      <SelectedAnecdoteInfo index={mostVoted} />
    </div>
  );
}

export default App;

import React, { useState } from "react";

const SelectedAnecdoteInfo = ({ anecdote, points }) => (
  <div>
    <p>{anecdote}</p>
    <p>This anecdote has {points} votes</p>
  </div>
);

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

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

  const random = () => {
    const index = Math.ceil(Math.random() * anecdotes.length - 1);
    setSelected(index);
  };
  const vote = () => {
    const copy = [...points];
    copy[selected] = copy[selected] + 1;
    setPoints(copy);
  };

  const mostVotedAnecdote = anecdotes[points.indexOf(Math.max(...points))];

  return (
    <div className="App">
      <h1>Anecdote of the day</h1>
      <SelectedAnecdoteInfo
        anecdote={anecdotes[selected]}
        points={points[selected]}
      />
      <Button onClick={vote} text="Vote" />
      <Button onClick={random} text="Next anecdote" />
      <h1>Anecdote with most votes</h1>
      <SelectedAnecdoteInfo
        anecdote={mostVotedAnecdote}
        points={points[anecdotes.indexOf(mostVotedAnecdote)]}
      />
    </div>
  );
}

export default App;

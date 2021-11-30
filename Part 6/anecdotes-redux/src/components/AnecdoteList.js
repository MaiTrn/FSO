import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const filteredAnecdotes = useSelector(({ filter, anecdotes }) =>
    filter === null
      ? anecdotes
      : anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().match(filter.toLowerCase())
        )
  );
  filteredAnecdotes.sort((a, b) => b.votes - a.votes);
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(showNotification(`You voted '${anecdote.content}'`, 5));
  };

  return (
    <div>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;

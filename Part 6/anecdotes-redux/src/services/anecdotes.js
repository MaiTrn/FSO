import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";
const getId = () => (100000 * Math.random()).toFixed(0);

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const newAnecdote = {
    id: getId(),
    content: content,
    votes: 0,
  };
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};
const update = async (anecdote) => {
  const updatedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1,
  };
  const urlID = baseUrl + "/" + anecdote.id;
  const response = await axios.put(urlID, updatedAnecdote);
  return response.data;
};

const anecdoteService = { getAll, createNew, update };
export default anecdoteService;

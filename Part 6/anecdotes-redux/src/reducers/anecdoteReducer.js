import anecdoteService from "../services/anecdotes";

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE_ANECDOTE": {
      const id = action.data.id;
      return state.map((a) => (a.id !== id ? a : action.data));
    }
    case "NEW_ANECDOTE":
      return state.concat(action.data);
    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.update(anecdote);
    dispatch({
      type: "VOTE_ANECDOTE",
      data: votedAnecdote,
    });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export default anecdoteReducer;

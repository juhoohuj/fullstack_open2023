
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setNotificationWithTimeout } from './notificationReducer';
import anecdoteService from '../services/anecdotes';

/*const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];*/

// Helper functions
const sortByVotes = (anecdotes) => anecdotes.sort((a, b) => b.votes - a.votes);

const initialState = []

// Define thunks for creating and voting on anecdotes
export const createAnecdote = createAsyncThunk(
  'anecdotes/createAnecdote',
  async (content, { dispatch }) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
    dispatch(setNotificationWithTimeout({ message: `New anecdote added: '${content}'`, time: 5 }));
    return newAnecdote;
  }
);

export const vote = createAsyncThunk(
  'anecdotes/vote',
  async (id, { dispatch, getState }) => {
    const anecdote = getState().anecdotes.find(a => a.id === id);
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}; // increment votes
    const response = await anecdoteService.updateVote(id, updatedAnecdote);
    dispatch(updateAnecdote(response));
    dispatch(setNotificationWithTimeout({ message: `You voted for '${response.content}'`, time: 5 }));
    return response;
  }
);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find(a => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    },
    createAnecdote(state, action) {
      state.push(action.payload);
      return sortByVotes(state);
    },
    appendAnecdote: (state, action) => {
      state.push(action.payload);
      return sortByVotes(state);
    },
    setAnecdotes: (state, action) => {
      return sortByVotes(action.payload);
    },
    updateAnecdote: (state, action) => {
      const index = state.findIndex(anecdote => anecdote.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
      return sortByVotes(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAnecdote.fulfilled, () => {})
      .addCase(vote.fulfilled, () => {});
  },
});

export const { vote: voteReducer, createAnecdote: createAnecdoteReducer, appendAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(sortByVotes(anecdotes)));
  };
};


export default anecdoteSlice.reducer; 
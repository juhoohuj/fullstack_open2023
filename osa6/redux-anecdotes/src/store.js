// Import Redux Toolkit
import { createSlice, configureStore } from '@reduxjs/toolkit';

// Define filterSlice
const filterSlice = createSlice({
  name: 'filter',
  initialState: 'all',
  reducers: {
    setFilter(state, action) {
      return action.payload;
    },
  },
});
export const { setFilter } = filterSlice.actions;

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push({
        id: getId(),
        content: action.payload.content,
        votes: 0,
      });
    },
    vote(state, action) {
      const anecdote = state.find((a) => a.id === action.payload.id);
      if (anecdote) {
        anecdote.votes++;
      }
    },
  },
});

export const { createAnecdote, vote } = anecdoteSlice.actions;


// Configure the store
const store = configureStore({
  reducer: {
    anecdotes: anecdoteSlice.reducer,  // Use the reducer from the anecdoteSlice
    filter: filterSlice.reducer,  // Use the reducer from the filterSlice
  },
  devTools: true,
});

export default store;

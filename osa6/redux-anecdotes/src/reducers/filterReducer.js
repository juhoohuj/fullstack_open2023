import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter: (state, action) => action.payload
  }
});

// Export the action creator
export const { setFilter } = filterSlice.actions;

// Export the reducer
export default filterSlice.reducer;

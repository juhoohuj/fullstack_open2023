import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification: (state, action) => action.payload,
  }
});

export const { setNotification } = notificationSlice.actions;

export const setNotificationWithTimeout = createAsyncThunk(
  'notification/setWithTimeout',
  async ({ message, time }, { dispatch }) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(setNotification(''));
    }, time * 1000);  // Converts time to milliseconds
  }
);

export default notificationSlice.reducer;

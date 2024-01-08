
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGreeting = createAsyncThunk('greeting/fetchGreeting', async () => {
  try {
    const response = await axios.get('/api/greetings');
    const randomIndex = Math.floor(Math.random() * response.data.length);
    const randomGreeting = response.data.length > 0 ? response.data[randomIndex].content : null;

return randomGreeting;

  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
});

const greetingSlice = createSlice({
  name: 'greeting',
  initialState: {
    value: '',
    loading: false,
    error: false,
    success: false,
    message: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGreeting.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
        state.message = '';
      })
      .addCase(fetchGreeting.fulfilled, (state, action) => {
        state.value = action.payload;
        state.loading = false;
        state.error = false;
        state.success = true;
        state.message = 'Data fetched successfully';
      })
      .addCase(fetchGreeting.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;
        state.message = `Error fetching data: ${action.error.message}`;
      });
  },
});

export const selectGreeting = (state) => state.greeting.value;

export default greetingSlice.reducer;
import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TFeeds = {
  orders: TOrder[];
  isLoading: boolean;
  total: number | null;
  totalToday: number | null;
};

type TFeedsResponse = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: TFeeds = {
  orders: [],
  isLoading: false,
  total: null,
  totalToday: null
};

export const fetchFeeds = createAsyncThunk<TFeedsResponse>(
  'feeds/fetchFeeds',
  async () => {
    const data = await getFeedsApi();
    return data;
  }
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const feedsReducer = feedsSlice.reducer;

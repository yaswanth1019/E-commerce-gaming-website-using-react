import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  highlightGames: [],
  featuredGames: [],
  discountsGames: [],
  popularGames: [],
  newGames: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Thunk for fetching games for the homepage
export const fetchHomeGames = createAsyncThunk(
  'homeGames/fetchHomeGames',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/api/games', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch home games');
      }

      const data = await response.json();
      return data; // Assuming API returns an object with all game categories
    } catch (error) {
      return rejectWithValue(error.message || 'Error fetching home games');
    }
  }
);

// Slice for home games
const homeGamesSlice = createSlice({
  name: 'homeGames',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch home games
      .addCase(fetchHomeGames.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchHomeGames.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.highlightGames = action.payload.highlight_games || [];
        state.featuredGames = action.payload.featured_games || [];
        state.discountsGames = action.payload.discounts_games || [];
        state.popularGames = action.payload.popular_games || [];
        state.newGames = action.payload.new_games || [];
      })
      .addCase(fetchHomeGames.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default homeGamesSlice.reducer;

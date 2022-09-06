import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SERVER_URL } from '../../utils/constants.js';
import { RootState, AppThunk } from '../store';
import axios from "axios";

export interface DogState {
  selectedBreed: string,
  selectedBreedPhotoUrl: string,
  allDogBreeds: string[],
}

const initialState: DogState = {
  selectedBreed: 'corgi',
  selectedBreedPhotoUrl: 'https://images.dog.ceo/breeds/corgi-cardigan/n02113186_3169.jpg',
  allDogBreeds: [],
};

export const getAllBreeds = createAsyncThunk(
  'dogs/breeds',
  async () => {
    return await axios
      .get<string[]>(`${SERVER_URL}dogs/breeds/`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        throw err;
      });
  }
);

interface DogPhoto {
  message: string,
  status: string,
}

export const getRandomPhotoByDogBreed = createAsyncThunk(
  'dogs/photo/random',
  async (breed: string) => {
    return await axios
      .get<DogPhoto>(`${SERVER_URL}dogs/photo/random/${breed}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        throw err;
      });
  }
);

export const dogSlice = createSlice({
  name: 'dogs',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getAllBreeds.fulfilled, (state, action) => {
      state.allDogBreeds = action.payload;
    });
    builder.addCase(getRandomPhotoByDogBreed.fulfilled, (state, action) => {
      if(action.payload.status === "success") {
        state.selectedBreed = action.meta.arg;
        state.selectedBreedPhotoUrl = action.payload.message;
      }
    });
  }
});

export default dogSlice.reducer;
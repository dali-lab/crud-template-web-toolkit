import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SERVER_URL } from '../../utils/constants.js';
import { RootState, AppThunk } from '../store';
import axios from 'axios';
import { getBearerToken, setBearerToken } from '../../utils/localStorage.js';

export enum UserScopes {
  Unverified = 'UNVERIFIED',
  User = 'USER',
  Admin = 'ADMIN',
}

export interface UserState {
  authenticated: boolean,
  loading: boolean,
  email: string,
  name: string,
  role: UserScopes,
}

const initialState: UserState = {
  authenticated: false,
  loading: false,
  email: '',
  name: '',
  role: UserScopes.Unverified,
};

interface LoginResponse {
  token: string;
  user: {
    id: string,
    email: string,
    // no password  
    name: string,
    role: UserScopes,
  }
}

export const signUp = createAsyncThunk(
  'auth/signup',
  async (credentials: { email: string, password: string, name: string }, { dispatch }) => {
    dispatch(startUserLoading());
    return await axios
      .post(`${SERVER_URL}auth/signup`, credentials)
      .finally(() => dispatch(stopUserLoading()))
      .then((response) => {
        alert('Sign up successful!');
        return response.data;
      })
      .catch((error) => {
        console.error('Error when signing up', error);
        return false;
      });
  }
);

export const signIn = createAsyncThunk(
  'auth/signin',
  async (credentials: { email: string, password: string }, { dispatch, getState }) => {
    dispatch(startUserLoading());
    return await axios
      .post<LoginResponse>(`${SERVER_URL}auth/signin`, credentials)
      .finally(() => dispatch(stopUserLoading()))
      .then((response) => {
        if (response.status == 403) {
          // forbidden - not verified
          return {
            user: { email: credentials.email },
            verified: false,
          };
        }
        alert('Signed In!');
        return { ...response.data };
      })
      .catch((error) => {
        alert(
          'Unable to log in, please ensure your email and password are correct.'
        );
        console.error('Error when logging in', error);
        throw error;
      });
  }
);

export const jwtSignIn = createAsyncThunk(
  'auth/jwt-signin',
  async (token: string, { dispatch }) => {
    dispatch(startUserLoading());
    return await axios
      .get<LoginResponse>(`${SERVER_URL}auth/jwt-signin/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .finally(() => dispatch(stopUserLoading()))
      .then((response) => {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`; 
        return response.data;
      })
      .catch((err) => {
        console.error(err);
        alert("Your login session has expired.");
        throw err;
      });
  }
);

export const resendCode = createAsyncThunk(
  'user/resend-code',
  async (credentials: { email: string }) => {
    return await axios
      .post<LoginResponse>(`${SERVER_URL}resend-code`, credentials)
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.error('Error when sending code', error);
      });
  }
);

export const verify = createAsyncThunk(
  'auth/verify',
  async (credentials: { email: string; code: string }) => {
    return await axios
      .patch<LoginResponse>(`${SERVER_URL}verify`, credentials)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when verifying', error);
      });
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      setBearerToken(action.payload.token);
      state = ({ ...state, ...action.payload.user });
      return state;
    },
    logout: () => {
      return initialState;
    },
    startUserLoading: (state) => ({ ...state, loading: true }),
    stopUserLoading: (state) => ({ ...state, loading: false }),
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      if ('token' in action.payload) {
        setBearerToken(action.payload.token);
        state = ({ ...state, ...action.payload.user });
        state.authenticated = true;
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${action.payload.token}`; 
        return state;
      }
    });
    builder.addCase(jwtSignIn.fulfilled, (state, action) => {
      state = ({ ...state, ...action.payload.user });
      state.authenticated = true;
      return state;
    });
    builder.addCase(jwtSignIn.rejected, () => initialState);
    builder.addCase(resendCode.fulfilled, () => {});
    builder.addCase(verify.fulfilled, (state, action) => {
      if (action.payload) {
        setBearerToken(action.payload.token);
        state = ({ ...state, ...action.payload.user });
        state.authenticated = true;
      }
      return state;
    });
  },
});

export const { setCredentials, logout, startUserLoading, stopUserLoading } =
  userSlice.actions;

export default userSlice.reducer;
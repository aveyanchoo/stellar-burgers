import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  request: boolean;
  error: string | null;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  request: false,
  error: null
};

const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken);
  setCookie('accessToken', accessToken);
};

const clearTokens = () => {
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
};

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const res = await getUserApi();
  return res.user;
});

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    saveTokens(res.accessToken, res.refreshToken);
    return res.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    saveTokens(res.accessToken, res.refreshToken);
    return res.user;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>) => {
    const res = await updateUserApi(data);
    return res.user;
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  await logoutApi();
  clearTokens();
});

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, thunkAPI) => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return null;

    try {
      const user = await thunkAPI.dispatch(fetchUser()).unwrap();
      return user;
    } catch {
      clearTokens();
      return null;
    }

    // если не будет авто-рефреша в API:
    // const accessToken = getCookie('accessToken');
    // if (!accessToken) return null;
    // try {
    //   const user = await thunkAPI.dispatch(fetchUser()).unwrap();
    //   return user;
    // } catch {
    //   clearTokens();
    //   return null;
    // }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.request = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(checkUserAuth.rejected, (state, action) => {
        state.request = false;
        state.user = null;
        state.isAuthChecked = true;
        state.error = action.error.message ?? 'Ошибка проверки авторизации';
      })

      .addCase(fetchUser.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.request = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.request = false;
        state.user = null;
        state.isAuthChecked = true;
        state.error = action.error.message ?? 'Ошибка загрузки пользователя';
      })

      .addCase(registerUser.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.request = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.request = false;
        state.error = action.error.message ?? 'Ошибка регистрации';
      })

      .addCase(loginUser.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.request = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.request = false;
        state.error = action.error.message ?? 'Ошибка авторизации';
      })

      .addCase(updateUser.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.request = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.request = false;
        state.error = action.error.message ?? 'Ошибка обновления профиля';
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      });
  }
});

export const { setAuthChecked, setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;

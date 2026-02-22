import {
  userReducer,
  setAuthChecked,
  setUser,
  registerUser,
  loginUser,
  fetchUser,
  updateUser,
  logoutUser,
  checkUserAuth
} from './userSlice';

describe('userSlice reducer', () => {
  it('установка флага проверки авторизации', () => {
    const initialState = userReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const state = userReducer(initialState, setAuthChecked(true));

    expect(state.isAuthChecked).toBe(true);
  });

  it('установка данных пользователя', () => {
    const initialState = userReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const userMock = {
      email: 'test@test.com',
      name: 'Test'
    };

    const state = userReducer(initialState, setUser(userMock as any));

    expect(state.user).toEqual(userMock);
  });

  it('должен устанавливать request=true при checkUserAuth.pending', () => {
    const initialState = userReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const action = checkUserAuth.pending('', undefined);
    const state = userReducer(initialState, action);

    expect(state.request).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен устанавливать request=false и записывать user при checkUserAuth.fulfilled', () => {
    const initialState = userReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const userMock = {
      email: 'test@test.com',
      name: 'Test'
    };

    const action = checkUserAuth.fulfilled(userMock as any, '', undefined);
    const state = userReducer(initialState, action);

    expect(state.request).toBe(false);
    expect(state.user).toEqual(userMock);
    expect(state.isAuthChecked).toBe(true);
  });

  it('должен устанавливать request=false и выдать ошибку при checkUserAuth.rejected', () => {
    const initialState = userReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const error = new Error('Ошибка загрузки');
    const action = checkUserAuth.rejected(error, '', undefined);

    const state = userReducer(initialState, action);

    expect(state.request).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });

  it('должен устанавливать request=true при registerUser.pending', () => {
    const initialState = userReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const action = registerUser.pending('', {} as any);
    const state = userReducer(initialState, action);

    expect(state.request).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен устанавливать request=false и записывать user при registerUser.fulfilled', () => {
    const initialState = userReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const userMock = {
      email: 'test@test.com',
      name: 'Test'
    };

    const action = registerUser.fulfilled(userMock as any, '', {} as any);
    const state = userReducer(initialState, action);

    expect(state.request).toBe(false);
    expect(state.user).toEqual(userMock);
    expect(state.isAuthChecked).toBe(true);
  });

  it('должен устанавливать request=false и выдать ошибку при registerUser.rejected', () => {
    const initialState = userReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const error = new Error('Ошибка регистрации');
    const action = registerUser.rejected(error, '', {} as any);

    const state = userReducer(initialState, action);

    expect(state.request).toBe(false);
    expect(state.error).toBe('Ошибка регистрации');
  });

  it('должен устанавливать request=true при loginUser.pending', () => {
    const initialState = userReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const action = loginUser.pending('', {} as any);
    const state = userReducer(initialState, action);

    expect(state.request).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен устанавливать request=false и записывать user при loginUser.fulfilled', () => {
    const initialState = userReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const userMock = {
      email: 'test@test.com',
      name: 'Test'
    };

    const action = loginUser.fulfilled(userMock as any, '', {} as any);
    const state = userReducer(initialState, action);

    expect(state.request).toBe(false);
    expect(state.user).toEqual(userMock);
    expect(state.isAuthChecked).toBe(true);
  });

  it('должен устанавливать request=false и выдать ошибку при loginUser.rejected', () => {
    const initialState = userReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const error = new Error('Ошибка авторизации');
    const action = loginUser.rejected(error, '', {} as any);

    const state = userReducer(initialState, action);

    expect(state.request).toBe(false);
    expect(state.error).toBe('Ошибка авторизации');
  });

  it('должен устанавливать request=true при fetchUser.pending', () => {
    const initialState = userReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const action = fetchUser.pending('', undefined);
    const state = userReducer(initialState, action);

    expect(state.request).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен устанавливать request=false и записывать user при fetchUser.fulfilled', () => {
    const initialState = userReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const userMock = {
      email: 'test@test.com',
      name: 'Test'
    };

    const action = fetchUser.fulfilled(userMock as any, '', undefined);
    const state = userReducer(initialState, action);

    expect(state.request).toBe(false);
    expect(state.user).toEqual(userMock);
    expect(state.isAuthChecked).toBe(true);
  });

  it('должен устанавливать request=false и выдать ошибку при fetchUser.rejected', () => {
    const initialState = userReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const error = new Error('Ошибка загрузки');
    const action = fetchUser.rejected(error, '', undefined);

    const state = userReducer(initialState, action);

    expect(state.request).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });

  it('должен устанавливать request=true при updateUser.pending', () => {
    const initialState = userReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const action = updateUser.pending('', {} as any);
    const state = userReducer(initialState, action);

    expect(state.request).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен устанавливать request=false и обновлять user при updateUser.fulfilled', () => {
    const initialState = userReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const userMock = {
      email: 'test@test.com',
      name: 'Updated'
    };

    const action = updateUser.fulfilled(userMock as any, '', {} as any);
    const state = userReducer(initialState, action);

    expect(state.request).toBe(false);
    expect(state.user).toEqual(userMock);
  });

  it('должен устанавливать request=false и выдать ошибку при updateUser.rejected', () => {
    const initialState = userReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const error = new Error('Ошибка обновления');
    const action = updateUser.rejected(error, '', {} as any);

    const state = userReducer(initialState, action);

    expect(state.request).toBe(false);
    expect(state.error).toBe('Ошибка обновления');
  });

  it('должен очищать user при logoutUser.fulfilled', () => {
    const initialState = userReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const action = logoutUser.fulfilled(undefined, '', undefined);
    const state = userReducer(initialState, action);

    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });
});

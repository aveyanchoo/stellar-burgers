import {
  userOrdersReducer,
  fetchUserOrders,
  clearUserOrders
} from './userOrdersSlice';

describe('userOrdersSlice reducer', () => {
  it('очистка данных заказа у пользователя', () => {
    const initialState = userOrdersReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const stateWithOrder = userOrdersReducer(initialState, {
      type: fetchUserOrders.fulfilled.type,
      payload: [
        {
          _id: 'order-1',
          number: 1001,
          status: 'done',
          name: 'a1',
          createdAt: '',
          updatedAt: '',
          ingredients: []
        }
      ]
    });

    const state = userOrdersReducer(stateWithOrder, clearUserOrders());

    expect(state.orders).toEqual([]);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('должен устанавливать isLoading=true при fetchUserOrders.pending', () => {
    const initialState = userOrdersReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const action = fetchUserOrders.pending('', undefined);
    const state = userOrdersReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен устанавливать isLoading=false и записывать данные заказов в стор при fetchUserOrders.fulfilled', () => {
    const initialState = userOrdersReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const ordersMock = [
      {
        _id: 'order-1',
        number: 1001,
        status: 'done',
        name: 'a1',
        createdAt: '',
        updatedAt: '',
        ingredients: []
      },
      {
        _id: 'order-2',
        number: 1002,
        status: 'pending',
        name: 'b2',
        createdAt: '',
        updatedAt: '',
        ingredients: []
      }
    ];

    const action = fetchUserOrders.fulfilled(ordersMock, '', undefined);
    const state = userOrdersReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(ordersMock);
  });

  it('должен устанавливать isLoading=false и выдать ошибку при fetchUserOrders.rejected', () => {
    const initialState = userOrdersReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const error = new Error('Ошибка загрузки');
    const action = fetchUserOrders.rejected(error, '', undefined);

    const state = userOrdersReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});

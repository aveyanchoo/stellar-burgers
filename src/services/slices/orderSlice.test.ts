import { orderReducer, createOrder, clearOrderModal } from './orderSlice';

describe('orderSlice reducer', () => {
  it('очистка данных заказа в модалке', () => {
    const initialState = orderReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const stateWithOrder = orderReducer(initialState, {
      type: createOrder.fulfilled.type,
      payload: {
        _id: 'order-1',
        number: 1001,
        status: 'done',
        name: 'a1',
        createdAt: '',
        updatedAt: '',
        ingredients: []
      }
    });

    const state = orderReducer(stateWithOrder, clearOrderModal());

    expect(state.orderModalData).toBeNull();
  });

  it('должен устанавливать orderRequest=true при createOrder.pending', () => {
    const initialState = orderReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const action = createOrder.pending('', []);
    const state = orderReducer(initialState, action);

    expect(state.orderRequest).toBe(true);
  });

  it('должен устанавливать orderRequest=false и записывать данные заказа в стор при createOrder.fulfilled', () => {
    const initialState = orderReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const orderMock = {
      _id: 'order-1',
      number: 1001,
      status: 'done',
      name: 'a1',
      createdAt: '',
      updatedAt: '',
      ingredients: []
    };

    const action = createOrder.fulfilled(orderMock, '', []);
    const state = orderReducer(initialState, action);

    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(orderMock);
  });

  it('должен устанавливать orderRequest=false при createOrder.rejected', () => {
    const initialState = orderReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const action = createOrder.rejected(new Error('fail'), '', []);
    const state = orderReducer(initialState, action);

    expect(state.orderRequest).toBe(false);
  });
});

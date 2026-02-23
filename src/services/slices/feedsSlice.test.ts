import { feedsReducer, fetchFeeds } from './feedsSlice';

describe('feedsSlice reducer', () => {
  it('должен устанавливать isLoading=true при fetchFeeds.pending', () => {
    // Получаем начальное состояние редьюсера
    const initialState = feedsReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    // Создаём pending-экшен вручную
    const action = fetchFeeds.pending('', undefined);
    // Передаём его в редьюсер
    const state = feedsReducer(initialState, action);

    // Проверяем изменения
    expect(state.isLoading).toBe(true);
  });

  it('должен устанавливать isLoading=false и записывать данные заказов в стор при fetchFeeds.fulfilled', () => {
    const initialState = feedsReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const ordersMock = {
      orders: [
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
      ],
      total: 10,
      totalToday: 5
    };

    const action = fetchFeeds.fulfilled(ordersMock, '', undefined);
    const state = feedsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(ordersMock.orders);
    expect(state.total).toBe(10);
    expect(state.totalToday).toBe(5);
  });

  it('должен устанавливать isLoading=false при fetchFeeds.rejected', () => {
    const initialState = feedsReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const action = fetchFeeds.rejected(new Error('fail'), '', undefined);
    const state = feedsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
  });
});

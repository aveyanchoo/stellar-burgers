import { rootReducer } from './rootReducer';

import { ingredientsReducer } from './slices/ingredientsSlice';
import { constructorReducer } from './slices/constructorSlice';
import { orderReducer } from './slices/orderSlice';
import { feedsReducer } from './slices/feedsSlice';
import { userReducer } from './slices/userSlice';
import { userOrdersReducer } from './slices/userOrdersSlice';

describe('rootReducer', () => {
  it('должен возвращать корректное начальное состояние при неизвестном экшене', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };

    const state = rootReducer(undefined, unknownAction);

    const expectedState = {
      ingredients: ingredientsReducer(undefined, unknownAction),
      burgerConstructor: constructorReducer(undefined, unknownAction),
      order: orderReducer(undefined, unknownAction),
      feeds: feedsReducer(undefined, unknownAction),
      user: userReducer(undefined, unknownAction),
      userOrders: userOrdersReducer(undefined, unknownAction)
    };

    expect(state).toEqual(expectedState);
  });
});

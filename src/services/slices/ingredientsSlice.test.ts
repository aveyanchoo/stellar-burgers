import { ingredientsReducer, fetchIngredients } from './ingredientsSlice';

describe('ingredientsSlice reducer', () => {
  it('должен устанавливать isLoading=true при fetchIngredients.pending', () => {
    // Получаем начальное состояние редьюсера
    const initialState = ingredientsReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    // Создаём pending-экшен вручную
    const action = fetchIngredients.pending('', undefined);

    // Передаём его в редьюсер
    const state = ingredientsReducer(initialState, action);

    // Проверяем изменения
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен устанавливать isLoading=false и записывать items в стор при fetchIngredients.fulfilled', () => {
    const initialState = ingredientsReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const ingredientsMock = [
      {
        _id: '1',
        name: 'Булка',
        type: 'bun',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 200,
        price: 100,
        image: 'test.png',
        image_mobile: 'test.png',
        image_large: 'test.png'
      }
    ] as any;

    const action = fetchIngredients.fulfilled(ingredientsMock, '', undefined);

    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual(ingredientsMock);
  });

  it('должен устанавливать isLoading=false и выдать ошибку при fetchIngredients.rejected', () => {
    const initialState = ingredientsReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const error = new Error('Ошибка загрузки');
    const action = fetchIngredients.rejected(error, '', undefined);

    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});

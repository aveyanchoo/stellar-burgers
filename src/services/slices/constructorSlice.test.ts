import {
  addIngredient,
  constructorReducer,
  removeIngredient,
  moveIngredient
} from './constructorSlice';

describe('constructorSlice reducer', () => {
  it('добавление ингредиента', () => {
    const initialState = constructorReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const ingredientMock = {
      _id: '1',
      id: 'a1',
      name: 'A',
      type: 'main',
      proteins: 1,
      fat: 1,
      carbohydrates: 1,
      calories: 10,
      price: 10,
      image: '',
      image_mobile: '',
      image_large: ''
    };

    const state = constructorReducer(
      initialState,
      addIngredient(ingredientMock)
    );

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(ingredientMock);
  });

  it('удаление ингредиента', () => {
    const initialState = constructorReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const ingredient1 = {
      _id: '1',
      id: 'a1',
      name: 'A',
      type: 'main',
      proteins: 1,
      fat: 1,
      carbohydrates: 1,
      calories: 10,
      price: 10,
      image: '',
      image_mobile: '',
      image_large: ''
    };

    const ingredient2 = {
      _id: '2',
      id: 'a2',
      name: 'B',
      type: 'main',
      proteins: 1,
      fat: 1,
      carbohydrates: 1,
      calories: 10,
      price: 10,
      image: '',
      image_mobile: '',
      image_large: ''
    };

    const stateWithIngredients = constructorReducer(
      constructorReducer(initialState, addIngredient(ingredient1)),
      addIngredient(ingredient2)
    );

    expect(stateWithIngredients.ingredients).toHaveLength(2);

    const stateAfterRemove = constructorReducer(
      stateWithIngredients,
      removeIngredient('a1')
    );

    expect(stateAfterRemove.ingredients).toHaveLength(1);
    expect(stateAfterRemove.ingredients[0]).toEqual(ingredient2);
  });

  it('изменение порядка ингредиентов в начинке', () => {
    const initialState = constructorReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const ingredient1 = {
      _id: '1',
      id: 'a1',
      name: 'A',
      type: 'main',
      proteins: 1,
      fat: 1,
      carbohydrates: 1,
      calories: 10,
      price: 10,
      image: '',
      image_mobile: '',
      image_large: ''
    };

    const ingredient2 = {
      _id: '2',
      id: 'a2',
      name: 'B',
      type: 'main',
      proteins: 1,
      fat: 1,
      carbohydrates: 1,
      calories: 10,
      price: 10,
      image: '',
      image_mobile: '',
      image_large: ''
    };

    const ingredient3 = {
      _id: '3',
      id: 'a3',
      name: 'C',
      type: 'main',
      proteins: 1,
      fat: 1,
      carbohydrates: 1,
      calories: 10,
      price: 10,
      image: '',
      image_mobile: '',
      image_large: ''
    };

    const stateWithIngredients = constructorReducer(
      constructorReducer(
        constructorReducer(initialState, addIngredient(ingredient1)),
        addIngredient(ingredient2)
      ),
      addIngredient(ingredient3)
    );

    expect(stateWithIngredients.ingredients[0]).toEqual(ingredient1);
    expect(stateWithIngredients.ingredients[1]).toEqual(ingredient2);
    expect(stateWithIngredients.ingredients[2]).toEqual(ingredient3);

    const stateAfterMove = constructorReducer(
      stateWithIngredients,
      moveIngredient({ from: 1, to: 2 })
    );

    expect(stateAfterMove.ingredients[0]).toEqual(ingredient1);
    expect(stateAfterMove.ingredients[1]).toEqual(ingredient3);
    expect(stateAfterMove.ingredients[2]).toEqual(ingredient2);
  });
});

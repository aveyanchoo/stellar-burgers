/* eslint-disable prettier/prettier */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

type TMovePayload = { 
  from: number; 
  to: number 
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredient: (state, action: PayloadAction<TMovePayload>) => {
      const { from, to } = action.payload

      if (
        from === to ||
        from < 0 ||
        to < 0 ||
        from >= state.ingredients.length ||
        to >= state.ingredients.length
      ) {
        return
      }

      const temp = state.ingredients[from];
      state.ingredients[from] = state.ingredients[to];
      state.ingredients[to] = temp
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = []
    }
  }
});

export const { setBun, addIngredient, removeIngredient, moveIngredient, clearConstructor } = constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;

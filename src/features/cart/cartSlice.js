import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItem from "../../cartItems";
import axios from "axios";
//esse aqui é o defaultState do useReducer

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: [],
  amount: 1,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  /* esse parametro aqui da para usar com argumento na invocação dessa getCartItems, nesse caso
  a (_) usa o argumento na invocação la no App.jsx, ja o (thunkAPI) */
  async (_, thunkAPI) => {
    try {
      console.log(_);
      console.log(thunkAPI);
      const rest = await axios(url);
      return rest.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("there was an error... #####");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  //esse aqui é o reducer do useReducer, graças a immer library cx não precisa fazer os return para mutar o state
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      // se vc der um return aqui dentro ded reducers vc reescreve o initial state ex: return {cartItems:[]}, com isso todas os objetos do initial vai ser apagado
    },
    removeItem: (state, action) => {
      console.log(action);
      state.cartItems = state.cartItems.filter(
        (itemId) => itemId.id !== action.payload
      );
    },
    increaseItem: (state, { payload }) => {
      const cartItem = state.cartItems.find(
        (itemId) => itemId.id === payload.id
      );
      console.log(cartItem);
      cartItem.amount = cartItem.amount + 1;
    },
    decreaseItem: (state, { payload }) => {
      const cartItem = state.cartItems.find(
        (itemId) => itemId.id === payload.id
      );
      console.log(cartItem);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotal: (state, { payload }) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  // e esse aqui é o reducer que lida com async, ou seja, axios e fetch, API
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// console.log(cartSlice);

export const {
  clearCart,
  removeItem,
  increaseItem,
  decreaseItem,
  calculateTotal,
} = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
    const {order, sortBy, category, search, currentPage} = params;
    const {data} = await axios.get(`https://62d437c0cd960e45d4552a2b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);

    return data;
})

const initialState = {
    items: [],
    status: 'loading' // loading / success / error
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        }
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading';
            state.items = [];
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error';
            state.items = [];
        }
    }
})

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;
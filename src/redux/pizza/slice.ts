import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from "axios";
import {FetchPizzasArgs, initialState, Pizza, Status} from "./types";

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params: FetchPizzasArgs) => {
    const {order, sortBy, category, search, currentPage} = params;
    const {data} = await axios.get<Pizza[]>(`https://62d437c0cd960e45d4552a2b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);

    return data as Pizza[];
})

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = Status.LOADING;
            state.items = [];
        });

        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });

        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.items = [];
        });
    }
})

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;
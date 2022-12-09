export type Pizza = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export interface pizzaSliceState {
    items: Pizza[];
    status: Status
}

export const initialState: pizzaSliceState = {
    items: [],
    status: Status.LOADING
};

export type SearchPizzaParams = {
    order: string;
    sortBy: string;
    category: string;
    search: string;
    currentPage: string;
}

export type FetchPizzasArgs = SearchPizzaParams;
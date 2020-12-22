import { createStore, configureStore, createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'sidebar',
    initialState: {
        width: -1
    },
    reducers: {
        resize: (state: any, action: any) => {
            state.width += action.payload;
        },
    },
});
export const { resize } = slice.actions;

const reducer = (state: any, action: any) => {
    switch(action.type) {
        case 'sidebar/resize':
            return state.width += action.payload;
        default:
            return state;
    }
};

const store = createStore(reducer, {width: 0});
store.subscribe(() => {
    console.log("store updated", store.getState());
});

store.dispatch({
    type: 'sidebar/resize',
    payload: 100,
})
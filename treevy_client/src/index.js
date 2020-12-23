import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

//Last video: https://www.youtube.com/watch?v=h892pHdLQtM&list=PL55RiY5tL51rrC3sh8qLiYHqUV3twEYU_&index=10
ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root"));


// Tried to use reduxjs/toolkit but I do not fully understand how to use it (and could not check whether it was actually working as intended).
// import { configureStore, createSlice } from '@reduxjs/toolkit';

// const sideBarSlice = createSlice({
//     name: 'sideBar',
//     initialState: {
//         width: -1,
//     },
//     reducers: {
//         updateWidth: (state, action) => {
//             state.width = action.payload;
//         }
//     }
// });

// const { updateWidth } = sideBarSlice.actions;

// const store = configureStore({
//     reducer: {
//         sideBar: sideBarSlice.reducers,
//     },
// });

// store.subscribe(() => {
//     console.log("store updated", store.getState());
// });
// store.dispatch(updateWidth(100));
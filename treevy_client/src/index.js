// import React from "react";
// import ReactDom from "react-dom";
// import App from "./App";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/css/bootstrap-theme.css";

// ReactDom.render(<App />, document.getElementById("root"));

//Last video: https://www.youtube.com/watch?v=BVvBa18o8Es&list=PL55RiY5tL51rrC3sh8qLiYHqUV3twEYU_&index=5
import { createStore } from "redux";
const initialState = {
    width: 0,
};
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'sidebar/resize':
            state = {
                ...state,
                width: state.width + action.payload,
            }
            break;
        default:
            break;
    }
    return state;
};

const store = createStore(reducer);
store.subscribe(() => {
    console.log("store updated", store.getState());
});

store.dispatch({
    type: 'sidebar/resize',
    payload: 100,
})
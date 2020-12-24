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
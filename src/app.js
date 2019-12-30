import React from "react";
import ReactDOM from "react-dom";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import AppRouter from "./routes/AppRouter";
import configureStore from "./store/configureStore";
import { addExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";
import { Provider } from "react-redux";

const store = configureStore();

console.log(store.getState());

store.dispatch(addExpense({ description: "Water bill" }));
store.dispatch(
  addExpense({ description: "me bill", amount: 1000, createdAt: 40000 })
);
store.dispatch(addExpense({ description: "email bill", amount: 4500 }));
// store.dispatch(setTextFilter("Water"));

// setTimeout(() => {
//   store.dispatch(setTextFilter("bill"));
// }, 3000);

const state = store.getState();

const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);
console.log(store.getState());

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));

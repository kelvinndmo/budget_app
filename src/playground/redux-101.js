import { createStore } from "redux";

//Action Generators
const incremenntCount = ({ incrementBy = 1 } = {}) => ({
  type: "INCREMENT",
  incrementBy: typeof incrementBy == "number" ? incrementBy : 1
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: "DECREMENT",
  decrementBy
});

const setCount = ({ count = 0 } = {}) => ({
  type: "SET",
  count
});

const resetCount = () => ({
  type: "RESET",
  count: 500
});

//reducers
// - Reducers are pure functions;output only determined by input
// - Never change state or action
const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + action.incrementBy
      };
    case "DECREMENT":
      return {
        count: state.count - action.decrementBy
      };
    case "SET":
      return {
        count: action.count
      };
    case "RESET":
      return {
        count: action.count
      };
    default:
      return state;
  }
  console.log("running");
  return state;
};

const store = createStore(countReducer);

store.subscribe(() => {
  console.log(store.getState(), "ddd");
});

store.dispatch(incremenntCount({ incrementBy: 10 }));
// store.dispatch(incremenntCount());

// store.dispatch({
//   type: "INCREMENT",
//   incrementBy: 5
// });

// store.dispatch({
//   type: "DECREMENT",
//   decrementBy: 10
// });
store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(incremenntCount());
store.dispatch(setCount({ count: 1000 }));

store.dispatch(resetCount());

console.log(store.getState());

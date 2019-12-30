import { createStore, combineReducers } from "redux";
import uuid from "uuid";

//ADD_EXPENSE
const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});
//REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});
//EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});
//SET_TEXT_FILTER
const setTextFilter = text => ({
  type: "SET_TEXT",
  text
});

//SORT_BY_DATE
const sortByDate = () => ({
  type: "SORT_BY_DATE"
});
//SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT"
});
//SET_START_DATE
const setStartDate = date => ({
  type: "SET_START_DATE",
  date
});

//SET_END_DATE
const setEndDate = date => ({
  type: "SET_END_DATE",
  date
});

const expensesReducerDefaultState = [];

const expenseReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter(expense => expense.id !== action.id);
    case "EDIT_EXPENSE":
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

const filterReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT":
      return {
        ...state,
        text: action.text
      };
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount"
      };
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "Date"
      };
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.date
      };
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.date
      };
    default:
      return state;
  }
};

// get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const startDateMatch =
        typeof startDate !== "number" || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== "number" || expense.createdAt <= endDate;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

//store creation
const store = createStore(
  combineReducers({
    expenses: expenseReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visbleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visbleExpenses, "exepnses");
});

// store.dispatch(setTextFilter("r"));
const expenseOne = store.dispatch(
  addExpense({ description: "Rent", amount: 10, createdAt: 2000 })
);
const expense2 = store.dispatch(
  addExpense({ description: "Coffee", amount: 20, createdAt: 4000 })
);
store.dispatch(
  addExpense({ description: "Coffee", amount: 0, createdAt: 4000 })
);

store.dispatch(
  addExpense({ description: "Coffee", amount: 50, createdAt: 4000 })
);

// store.dispatch(editExpense(expenseOne.expense.id, { amount: 1000 }));
// console.log("...");

// store.dispatch(sortByDate());
store.dispatch(sortByAmount());
// console.log("ddd");
// // store.dispatch(setStartDate(3000));
// console.log("DDDDD");

// store.dispatch(setTextFilter("rent"));
// store.dispatch(setEndDate(200));

// store.dispatch(removeExpense({ id: expense2.expense.id }));
const demoState = {
  expenses: [
    {
      id: "ddksdsdsjdsdjsd",
      description: "january rent",
      note: "This is was the final payment",
      amount: 54500,
      createdAt: 0
    }
  ],
  filters: {
    text: "rent",
    sortBy: "amount", //date or amount
    startDate: undefined,
    endDate: undefined
  }
};

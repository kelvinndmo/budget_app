import React, { Component } from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { editExpense, removeExpense } from "../actions/expenses";
const EditExpensePage = props => {
  const { id } = props.expense;
  return (
    <div>
      <ExpenseForm
        expense={props.expense}
        onSubmit={expense => {
          props.dispatch(editExpense(props.expense.id, expense));
          props.history.push("/");
          console.log("updated", expense);
        }}
      />
      <button
        onClick={() => {
          props.dispatch(removeExpense({ id }));
          props.history.push("/");
        }}
      >
        Remove
      </button>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find(expense => expense.id == props.match.params.id)
  };
};
export default connect(mapStateToProps)(EditExpensePage);

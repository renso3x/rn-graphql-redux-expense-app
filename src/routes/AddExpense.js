import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { expensesQuery } from './Expenses';
import { addExpense, loadExpense } from '../reducers/expenses';
import Form from '../components/Form';

class AddExpense extends Component {
  submit = async (values) => {
    console.log(values);
    const response = await this.props.mutate({
      variables: values,
      update: (store, { data: { createExpense } }) => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: expensesQuery });
        // Add our comment from the mutation to the end.
        data.expenses.push(createExpense);
        this.props.addExpense(values);
        this.props.loadExpense(data.expenses);
        // Write our data back to the cache.
        store.writeQuery({ query: expensesQuery, data });
      },
    });

    console.log(response);
    if (response) {
      this.props.history.goBack();
    }
  };

  render() {
    return <Form submit={this.submit} goBack={this.props.history.goBack} />;
  }
}

const addExpenseMutation = gql`
  mutation createExpense($name: String!, $price: Int!) {
    createExpense(name: $name, price: $price) {
      __typename
      id
      name
      price
    }
  }
`;

const withGraphQL = graphql(addExpenseMutation)(AddExpense);
const mapStateToprops = ({ expenses }) => ({
  expenses,
});
const withRedux = connect(mapStateToprops, {
  addExpense,
  loadExpense,
})(withGraphQL);

export default withRedux;

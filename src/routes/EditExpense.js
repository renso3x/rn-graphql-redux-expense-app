import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { expensesQuery } from './Expenses';
import { editExpense } from '../reducers/expenses';
import Form from '../components/Form';


class EditExpense extends Component {
  submit = async (values) => {
    const response = await this.props.mutate({
      variables: values,
      update: (store, { data: { updateExpense } }) => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: expensesQuery });
        // Add our comment from the mutation to the end.
        data.expenses.map(x => (x.id === updateExpense.id ? updateExpense : x));
        this.props.editExpense(values, values.id);
        // Write our data back to the cache.
        store.writeQuery({ query: expensesQuery, data });
      },
    });

    if (response) {
      this.props.history.goBack();
    }
  };

  render() {
    const { item } = this.props.history.location.state;
    return (
      <Form
        initialValues={{ ...item, price: item.price.toString() }}
        submit={this.submit}
        goBack={this.props.history.goBack}
      />
    );
  }
}

const editExpenseMutation = gql`
  mutation updateExpense($id: ID!,$name: String!, $price: Int!) {
    updateExpense(id: $id, name: $name, price: $price) {
      __typename
      id
      name
      price
    }
  }
`;

const withGraphQL = graphql(editExpenseMutation)(EditExpense);
const mapStateToprops = ({ expenses }) => ({
  expenses,
});
const withRedux = connect(mapStateToprops, {
  editExpense,
})(withGraphQL);

export default withRedux;

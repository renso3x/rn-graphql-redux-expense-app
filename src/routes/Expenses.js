import React, { Component } from 'react';
import { SafeAreaView, View, Text, FlatList } from 'react-native';
import { Button, List } from 'react-native-paper';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { loadExpense, deleteExpeneses } from '../reducers/expenses';

const styles = {
  view: {
    flex: 1,
    justifyContent: 'center',
    margin: 15,
  },
  heading: {
    alignSelf: 'center',
    fontSize: 40,
    marginBottom: 10,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 30,
  },
  price: {
    fontSize: 30,
  },
  btnAction: {
    margin: 3,
  },
  btnMain: {
    margin: 15,
  },
  btnBack: {
    alignSelf: 'flex-start',
  },
};

export const expensesQuery = gql`
  query expenses {
    expenses {
      id
      name
      price
      __typename
    }
  }
`;

export const deleteExpenseMutation = gql`
  mutation deleteExpense($id: ID!) {
    deleteExpense(id: $id) {
      id
    }
  }
`;

class Expense extends Component {
  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    if (data.expenses) {
      nextProps.loadExpense(data.expenses);
    }
  }

  onEdit = (item) => {
    this.props.history.push('/edit-expense', {
      item
    });
  }

  onDelete = (item) => {
    this.props.mutate({
      variables: {
        id: item.id,
      },
      update: (store) => {
        const data = store.readQuery({ query: expensesQuery });
        data.expenses = data.expenses.filter(x => x.id !== item.id);
        this.props.deleteExpeneses(item.id);
        store.writeQuery({ query: expensesQuery, data });
      },
    });
  }

  render() {
    const { data: { expenses, loading }, history } = this.props;
    return (
      (loading && !expenses) ?
        null :
        <SafeAreaView style={styles.view} >
          <Button icon="arrow-back" style={styles.btnBack} onPress={history.goBack}>Back</Button>
          <Text style={styles.heading}>My Expenses</Text>
          <FlatList
            keyExtractor={item => item.id}
            data={expenses}
            renderItem={({ item }) => (
              <List.Item
                title={`Expense: ${item.name}`}
                description={`Price: ${item.price}`}
                right={() => (
                  <View style={styles.row}>
                    <Button style={styles.btnAction} color="blue" mode="contained" onPress={() => this.onEdit(item)}>
                      Edit
                    </Button>
                    <Button style={styles.btnAction} color="red" mode="contained" onPress={() => this.onDelete(item)}>
                      Delete
                    </Button>
                  </View>
                )}
              />
            )}
          />
          <Button style={styles.btnMain} color="green" mode="contained" onPress={() => history.push('/add-expense')}>
            Add Expenses
          </Button>
        </SafeAreaView >
    );
  }
}

const withGraphQL = compose(
  graphql(deleteExpenseMutation),
  graphql(expensesQuery),
)(Expense);

const mapStateToprops = ({ expenses }) => ({
  expenses,
});
const withRedux = connect(mapStateToprops, {
  loadExpense,
  deleteExpeneses,
})(withGraphQL);

export default withRedux;

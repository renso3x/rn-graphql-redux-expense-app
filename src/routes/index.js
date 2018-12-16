import React from 'react';
import { NativeRouter, Switch, Route } from 'react-router-native';

import CheckToken from './CheckToken';
import Login from './Login';
import Dashboard from './Dashboard';
import Expenses from './Expenses';
import AddExpense from './AddExpense';
import EditExpense from './EditExpense';

export default () => (
  <NativeRouter>
    <Switch>
      <Route exact path="/" component={CheckToken} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/expenses" component={Expenses} />
      <Route exact path="/add-expense" component={AddExpense} />
      <Route exact path="/edit-expense" component={EditExpense} />
    </Switch>
  </NativeRouter>
);

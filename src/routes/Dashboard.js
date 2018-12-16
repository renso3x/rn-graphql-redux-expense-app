import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';

const styles = {
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default ({ history }) => (
  <SafeAreaView style={styles.view}>
    <Button icon="view-list" mode="contained" onPress={() => history.push('/expenses')}>
      My Expenses
    </Button>
  </SafeAreaView>
);

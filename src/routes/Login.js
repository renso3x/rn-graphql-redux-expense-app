import React from 'react';
import { AsyncStorage, View } from 'react-native';
import { Button } from 'react-native-paper';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import TextField from '../components/TextField';

const defaultState = {
  values: {
    email: '',
    password: '',
  },
  isSubmitting: false,
};

const styles = {
  view: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

class Login extends React.Component {
  state = defaultState;

  onChangeText = (key, value) => {
    this.setState(state => ({
      values: {
        ...state.values,
        [key]: value.toLowerCase(),
      },
    }));
  };

  submit = async () => {
    if (this.state.isSubmitting) {
      return;
    }

    this.setState({ isSubmitting: true });

    console.log(this.state.values);
    const response = await this.props.mutate({
      variables: this.state.values,
    });
    console.log(response);

    if (response) {
      await AsyncStorage.setItem('token', response.data.signin.payload.token);
      this.setState(defaultState);
      this.props.history.push('/dashboard');
    }
  };

  goToSignup = () => {
    this.props.history.push('/signup');
  };

  render() {
    const { values: { email, password } } = this.state;

    return (
      <View
        style={styles.view}
      >
        <View style={{ width: 350 }}>
          <TextField value={email} autoCapitalize="none" name="email" onChangeText={this.onChangeText} />
          <TextField
            value={password}
            name="password"
            onChangeText={this.onChangeText}
            secureTextEntry
          />
          <Button mode="contained" onPress={this.submit}>Login</Button>
        </View>
      </View >
    );
  }
}

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    signin (email: $email password: $password) {
      payload {
        token
      }
    }
  }
`;

export default graphql(loginMutation)(Login);
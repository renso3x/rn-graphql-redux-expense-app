import React from 'react';
import { AsyncStorage, Text } from 'react-native';
import { TOKEN_KEY } from '../constant';

class CheckToken extends React.Component {
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (!token) {
      this.props.history.push('/login');
      return;
    }
    this.props.history.push('/dashboard');
  };

  render() {
    return <Text>loading...</Text>;
  }
}


export default CheckToken;
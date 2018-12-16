import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import TextField from '../components/TextField';

const styles = {
  view: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    margin: 5,
  },
};

const defaultState = {
  values: {
    name: '',
    price: '',
  },
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    const { initialValues = {} } = props;
    this.state = {
      ...defaultState,
      values: {
        ...defaultState.values,
        ...initialValues,
      },
    };
  }

  onChangeText = (key, value) => {
    this.setState(state => ({
      values: {
        ...state.values,
        [key]: value,
      },
    }));
  };

  submit = async () => {
    if (this.state.isSubmitting) {
      return;
    }
    console.log(this.state.values);
    this.props.submit(this.state.values);
  };

  render() {
    const { goBack } = this.props;
    const { values: { name, price } } = this.state;

    return (
      <View
        style={styles.view}
      >
        <View style={{ width: 300 }}>
          <TextField value={name} name="name" onChangeText={this.onChangeText} />
          <TextField value={price} name="price" onChangeText={this.onChangeText} />
          <Button onPress={this.submit} style={styles.btn} color="green" mode="contained">Submit</Button>
          <Button onPress={goBack} style={styles.btn} color="blue" mode="contained">Back</Button>
        </View>
      </View>
    );
  }
}

export default Form;

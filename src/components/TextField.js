import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';


const styles = StyleSheet.create({
  field: {
    borderBottomWidth: 1,
    marginBottom: 15,
  },
});

export default class TextField extends React.PureComponent {
  onChangeText = (text) => {
    const { onChangeText, name } = this.props;
    onChangeText(name, text);
  };

  render() {
    const { value, secureTextEntry, name } = this.props;

    return (
      <TextInput
        onChangeText={this.onChangeText}
        value={value}
        type={'outlined'}
        style={styles.field}
        placeholder={name}
        secureTextEntry={!!secureTextEntry}
      />
    );
  }
}
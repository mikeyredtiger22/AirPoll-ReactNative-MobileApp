import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const PillButton = props => (
  <TouchableOpacity
    {...props}
    style={[styles.button, props.style]}
    containerStyle={styles.container}
  >
    <Text style={styles.text}>{props.text}</Text>
  </TouchableOpacity>
);

export default PillButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffffff99',
    paddingHorizontal: 20,
    borderRadius: 100,
  },
  container: {
    margin: 5,
  },
  text: {
    color: '#005944',
    fontSize: 35,
    textAlign: 'center',
    padding: 8,
  }
});

import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class HomePage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>AirPoll HomePage</Text>
        <Button title='Start'  onPress={() => console.log('Navigate')}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

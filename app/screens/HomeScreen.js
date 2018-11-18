import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { testID: null };
    this.getSecureStore();
  }

  setSecureStore = () => {
    Expo.SecureStore.setItemAsync('testID', 'testValue');
  };

  getSecureStore = () => {
    Expo.SecureStore.getItemAsync('testID').then(value => this.setState({ testID: value }));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>AirPoll HomePage</Text>
        <Text>{this.state.testID}</Text>
        <Button title='Start' onPress={() => this.props.navigation.navigate('MapsScreen')}/>
        <Button title='Set' onPress={this.setSecureStore}/>
        <Button title='Get' onPress={this.getSecureStore}/>
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

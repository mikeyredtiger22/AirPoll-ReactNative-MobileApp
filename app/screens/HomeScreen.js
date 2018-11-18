import React from 'react';
import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native';
import PillButton from '../components/PillButton';

export default class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { testID: null, showInput: false };
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
      <ImageBackground
        style={styles.background}
        source={require('../../assets/title-background.png')}>
        <PillButton
          text='START'
          style={styles.startButton}
          onPress={() => this.props.navigation.navigate('MapsScreen')}/>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  startButton: {
    position: 'absolute',
    top: '70%',
  }
});

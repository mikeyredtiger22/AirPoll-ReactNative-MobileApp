import React from 'react';
import { Animated, ImageBackground, StyleSheet, Text, TextInput } from 'react-native';
import PillButton from '../components/PillButton';

export default class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      testID: null,
      showInput: false,
      inputText: '',
      animationPercent: new Animated.Value(0),
    };
    this.getSecureStore();
  }

  handleStartButton = () => {
    if (this.state.showInput) {
      return;
    }
    this.setState({ showInput: true });
    Animated.timing(
      this.state.animationPercent,
      {
        toValue: 100,
        duration: 500,
      }
    ).start();
  };

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
        <Animated.View style={{
          position: 'absolute',
          top: this.state.animationPercent.interpolate({
            inputRange: [0, 100],
            outputRange: ['70%', '100%'],
          })
        }}>
          <PillButton
            text='START'
            style={styles.startButton}
            onPress={this.handleStartButton}/>
        </Animated.View>
        <Animated.View style={{
          position: 'absolute',
          width: '60%',
          top: this.state.animationPercent.interpolate({
            inputRange: [0, 100],
            outputRange: ['100%', '50%'],
          })
        }}>
          <Text style={styles.inputLabel}>Enter your sensor ID:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({ text })}
            value={this.state.inputText}
            keyboardType='numeric'
          />
        </Animated.View>
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
  },
  input: {
    height: 50,
    borderWidth: 1,
    backgroundColor: '#d7d7d750',
    borderRadius: 50,
    paddingHorizontal: 15,
    fontSize: 30,
  },
  inputLabel: {
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 5,
  }
});

import React from 'react';
import { Animated, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PillButton from '../components/PillButton';

const SENSOR_ID_KEY = 'SENSOR_ID';

export default class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      testID: null,
      showInput: false,
      inputText: '',
      animationPercent: new Animated.Value(0),
    };
    this.getSecureStore(SENSOR_ID_KEY);
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

  // save sensor ID and open maps screen
  handleSubmit = () => {
    this.setSecureStore(SENSOR_ID_KEY, this.state.inputText).then(() => {
      this.props.navigation.navigate('MapsScreen');
    });
  };

  setSecureStore = (key, value) => {
    return Expo.SecureStore.setItemAsync(key, value);
  };

  getSecureStore = (key) => {
    Expo.SecureStore.getItemAsync(key).then(value => this.setState({ testID: value }));
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
            onPress={this.handleStartButton}
          />
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
            onChangeText={(text) => this.setState({ inputText: text })}
            value={this.state.inputText}
            keyboardType='numeric' // depends on IoT device registration with TTN
            onSubmitEditing={this.handleSubmit}
          />
        </Animated.View>
        {(this.state.inputText.length > 0) &&
        <View style={styles.submitIcon}>
          <Ionicons
            name='ios-arrow-dropright'
            color='white'
            size={48}
          />
        </View>
        }
        <Text style={styles.testIDLabel}>test ID:{this.state.testID}</Text>
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
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#d7d7d750',
    borderRadius: 50,
    paddingHorizontal: 15,
    fontSize: 30,
  },
  inputLabel: {
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 5,
    color: 'white',
  },
  submitIcon: {
    position: 'absolute',
    marginTop: 13, // trial and error values to line up on different screen sizes
    top: '53%',
    right: '5%',
  },
  testIDLabel: {
    position: 'absolute',
    bottom: 0,
  }
});

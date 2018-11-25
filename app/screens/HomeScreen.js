import React from 'react';
import { Animated, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PillButton from '../components/PillButton';
import { SERVER_URL, USER_OBJ_KEY } from '../DefaultValues';

export default class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      testID: null,
      apiResult: '',
      showInput: false,
      inputText: '',
      animationPercent: new Animated.Value(0),
    };
  }

  componentDidMount() {
    //Open maps screen if user object exists
    Expo.SecureStore.getItemAsync(USER_OBJ_KEY).then(user => {
      if (user) {
        this.props.navigation.navigate('MapsScreen', { userObj: user });
      }
    });
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
    const inputText = this.state.inputText;
    if (!inputText) {
      // todo show error?
      return;
    }
    this.createUser(inputText, response => {
      if (response.error) {
        //todo handle error
      }

      this.setSecureStore(USER_OBJ_KEY, response).then(() => {
        this.props.navigation.navigate('MapsScreen');
      });
    });
  };

  createUser = (sensorID, callback) => {
    const url = SERVER_URL + '/user?sensorID=' + sensorID;
    fetch(url, { method: 'POST' })
    .then(res => res.text())
    .then(body => callback(body))
    .catch(err => {
      console.warn(err);
      callback(body);
    });
  };

  setSecureStore = (key, value) => {
    return Expo.SecureStore.setItemAsync(key, value);
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
            onPress={this.testAPIRequest}
            name='ios-arrow-dropright'
            color='white'
            size={48}
          />
        </View>
        }
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
});

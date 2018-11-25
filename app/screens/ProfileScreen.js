import React from 'react';
import { StyleSheet, View } from 'react-native';
import PillButton from '../components/PillButton';

const SENSOR_ID_KEY = 'SENSOR_ID';
const USER_OBJ_KEY = 'USER_OBJ';

export default class ProfileScreen extends React.Component {
  handleLogout = () => {
    Expo.SecureStore.deleteItemAsync(SENSOR_ID_KEY).then(() => {
      Expo.SecureStore.deleteItemAsync(USER_OBJ_KEY).then(() => {
        this.props.navigation.navigate('HomeScreen');
      });
    });
  };

  render() {
    return (
        <View style={styles.container}>
          <PillButton text='LOGOUT' onPress={this.handleLogout} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

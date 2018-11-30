import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PillButton from '../components/PillButton';
import { SERVER_URL, USER_OBJ_KEY } from '../DefaultValues';

export default class ProfileScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = { userObj: null };
  }

  componentDidMount() {
    this.getUserObj(user => {
      this.saveUserData(user);
    });
  }

  getUserObj = (callback) => {
    const user = this.props.navigation.getParam('userObj', undefined);
    if (user) {
      callback(user);
    } else {
      Expo.SecureStore.getItemAsync(USER_OBJ_KEY).then(user => {
        callback(user);
      });
    }
  };

  syncUserData = (userID, callback) => {
    const url = SERVER_URL + '/user?userID=' + userID;
    fetch(url)
    .then(res => res.text())
    .then(body => callback(body))
    .catch(err => {
      console.warn(err);
      callback(body);
    });
  };

  saveUserData = (userObjString) => {
    const userJson = JSON.parse(userObjString);
    if (userJson.user) {
      this.setState({ userObj: userJson});
      Expo.SecureStore.setItemAsync(USER_OBJ_KEY, userObjString);
    }
  };

  handleSyncPoints = () => {
    this.syncUserData(this.state.userObj.user.userID, (response) => {
      this.saveUserData(response);
    });
  };

  handleLogout = () => {
    Expo.SecureStore.deleteItemAsync(USER_OBJ_KEY).then(() => {
      this.props.navigation.navigate('HomeScreen');
    });
  };

  render() {
    const points = this.state.userObj?.user?.points || 0;
    return (
      <View style={styles.container}>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsLabel}>Points: {points}</Text>
          <TouchableOpacity>
            <Ionicons
              onPress={this.handleSyncPoints}
              name='md-sync'
              color='black'
              size={48}
            />
          </TouchableOpacity>
        </View>
        <PillButton text='LOGOUT' onPress={this.handleLogout}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#888888'
  },
  pointsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30
  },
  pointsLabel: {
    flex: 1,
    fontSize: 25,
  }
});

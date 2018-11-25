import React from 'react';
import { StyleSheet } from 'react-native';
import { MapView } from 'expo';
import { SERVER_URL, USER_OBJ_KEY } from '../DefaultValues';

export default class MapsScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = { heatmapData: [] };
  }

  componentDidMount() {
    this.getUserObj(user => {
      this.getHeatmapData(user, heatmapData => {
        this.setState({ heatmapData: heatmapData });
      });
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

  getHeatmapData = (user) => {
    const userID = JSON.parse(user).user.userID;
    const url = SERVER_URL + '?userID=' + userID;
    fetch(url)
    .then(res => res.text())
    .then(body => console.log('got Data!'))
    .catch(err => {
      console.error(err);
    });
  };

  render() {
    return (
      <MapView
        style={styles.mapView}
        initialRegion={{
          latitude: 50.917060,
          longitude: -1.398031,
          latitudeDelta: 0.08,
          longitudeDelta: 0.05,
        }}
        showsScale={true}
        loadingEnabled={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
  },
});

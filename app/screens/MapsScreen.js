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
        this.setState({ heatmapData: JSON.parse(heatmapData).heatmapData });
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

  getHeatmapData = (user, callback) => {
    const treatment = JSON.parse(user).user.treatment;
    const url = SERVER_URL + '?treatment=' + treatment;
    fetch(url)
    .then(res => res.text())
    .then(body => callback(body))
    .catch(err => {
      console.error(err);
    });
  };

  render() {
    return (
      <MapView
        style={styles.mapView}
        initialRegion={{
          latitude: 50.937060,
          longitude: -1.398031,
          latitudeDelta: 0.08,
          longitudeDelta: 0.05,
        }}
        showsScale={true}
        loadingEnabled={true}
      >
        {this.state.heatmapData.map((datapoint) => {
          return (
            <MapView.Circle
              key={datapoint.lat * datapoint.lng * datapoint.value}
              center={{
                latitude: datapoint.lat,
                longitude: datapoint.lng,
              }}
              radius={500}
              strokeColor={'#ff000000'}
              fillColor={'#7e00ff10'}
            />
          );
        })}
      </MapView> // todo later: data vis needs to stand out on all map themes
    );
  }
}

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
  },
});

import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { MapView } from 'expo';

export default class MapsScreen extends React.Component {
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

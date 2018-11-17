import React from 'react';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import HomeScreen from './app/screens/HomeScreen';
import MapsScreen from './app/screens/MapsScreen';

const AppNavigator = createSwitchNavigator({
  HomeScreen,
  MapsScreen
}, {initialRouteName: 'HomeScreen'});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer/>;
  }
}

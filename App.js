import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './app/screens/HomeScreen';

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer/>;
  }
}

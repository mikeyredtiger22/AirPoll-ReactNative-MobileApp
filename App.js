import React from 'react';
import { createAppContainer, createBottomTabNavigator, createSwitchNavigator } from "react-navigation";
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './app/screens/HomeScreen';
import MapsScreen from './app/screens/MapsScreen';
import ProfileScreen from './app/screens/ProfileScreen';

const MapsTabNavigator = createBottomTabNavigator({
  MapsScreen,
  ProfileScreen
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state;
      const maps = (routeName === 'MapsScreen');
      const iconName = maps ? 'md-compass' : 'md-options';
      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: '#03a6b0',
    inactiveTintColor: '#2b2b2b',
  },
});

const AppNavigator = createSwitchNavigator({
  HomeScreen,
  MapsTabNavigator,
}, {initialRouteName: 'HomeScreen'});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer/>;
  }
}

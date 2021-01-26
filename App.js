import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/HomeScreen'
import Connection from "./components/Connection";
import * as Font from 'expo-font';
import {ActivityIndicator} from 'react-native';

const Tab = createBottomTabNavigator();

export default class App extends React.Component {

    state ={
        assetsLoaded: false
    }

    componentDidMount() {
        Font.loadAsync({
            'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
            'raleway-medium': require('./assets/fonts/Raleway-Medium.ttf')
        }).then(r => {
            this.setState({assetsLoaded: true});
        })
    }

    render() {
        if (!this.state.assetsLoaded) {
            return <ActivityIndicator/>;
        }
    return (
        <NavigationContainer>
          <Tab.Navigator tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
              labelStyle: { fontSize: 20, justifyContent: 'center', fontFamily: 'raleway-medium',},
              tabStyle: { justifyContent: 'center'},
              style: {backgroundColor: '#E8E8E8'}
          }}>
              <Tab.Screen name='Device' component={HomeScreen}/>
              <Tab.Screen name='Connection' component={Connection} />
          </Tab.Navigator>
        </NavigationContainer>
    );
  }
}

import React, {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import Home from '../src/screens/Home/Home';
import MainScreen from '../src/screens/MainScreen/MainScreen';
import Tabs from './tabs';
const App = createStackNavigator();

const AppRoutes = () => {
  const [isLogged, setLogged] = useState<string>(null);
  const dispatch = useDispatch();

  const saveSessionToken = async (sessionKey: string) => {
    setLogged(sessionKey);
    dispatch({type: 'SESSION_KEY', title: sessionKey});
  };

  useEffect(() => {
    AsyncStorage.getItem('sessionToken').then(response => {
      response ? saveSessionToken(response) : null;
    });
  }, []);

  return (
    <NavigationContainer>
      <App.Navigator screenOptions={{headerShown: false}}>
        {isLogged ? (
          <App.Screen name="Tabs" component={Tabs} />
        ) : (
          <App.Screen name="Home" component={Home} />
        )}
      </App.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;

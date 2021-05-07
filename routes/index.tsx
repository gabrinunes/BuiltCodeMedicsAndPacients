import React, {useEffect, useState, useCallback} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Home from '../src/screens/Home/Home';
import MedicRegister from '../src/screens/Register/MedicRegister';
import MainScreen from './MainScreen';
const App = createStackNavigator();

const AppRoutes = () => {
  const [isLogged, setLogged] = useState<string>(null);
  const dispatch = useDispatch();
  const dados = useSelector(state => state.dados);

  const saveSessionToken = useCallback(async (sessionKey: string) => {
    setLogged(sessionKey);
    dispatch({type: 'SESSION_KEY', title: sessionKey});
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('sessionToken').then(response => {
      response ? saveSessionToken(response) : null;
    });
  }, []);

  return (
    <NavigationContainer>
      <App.Navigator screenOptions={{headerShown: false}}>
        {isLogged || dados ? (
          <App.Screen name="MainScreen" component={MainScreen} />
        ) : (
          <App.Screen name="Home" component={Home} />
        )}
        <App.Screen name="MedicRegister" component={MedicRegister} />
      </App.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;

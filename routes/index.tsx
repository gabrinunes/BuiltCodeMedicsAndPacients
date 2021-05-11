import React, {useEffect, useState, useCallback} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Home from '../src/screens/Home/Home';
import MedicRegister from '../src/screens/Register/MedicRegister';
import PatientRegister from '../src/screens/Register/PatitentRegister';
import PatientEdit from '../src/screens/Edit/PatientEdit';
import MedicEdit from '../src/screens/Edit/MedicEdit';
import MainScreen from './MainScreen';
const App = createStackNavigator();

const AppRoutes = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector(state => state.dados);

  const saveSessionToken = useCallback(async (sessionKey: string) => {
    dispatch({type: 'SESSION_KEY', title: sessionKey});
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('sessionToken').then(response => {
      response ? saveSessionToken(response) : null;
    });
  }, [isLogged]);

  return (
    <NavigationContainer>
      <App.Navigator screenOptions={{headerShown: false}}>
        {isLogged ? (
          <App.Screen name="MainScreen" component={MainScreen} />
        ) : (
          <App.Screen name="Home" component={Home} />
        )}
        <App.Screen name="MedicRegister" component={MedicRegister} />
        <App.Screen name="PatientRegister" component={PatientRegister} />
        <App.Screen name="MedicEdit" component={MedicEdit} />
        <App.Screen name="PatientEdit" component={PatientEdit} />
      </App.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;

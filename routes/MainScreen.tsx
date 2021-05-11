import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import Medics from '../src/screens/Medics/Medics';
import Pacients from '../src/screens/Pacients/Pacients';
import Button from '../src/components/button';
import {useDispatch} from 'react-redux';
import {View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
const MainScreen: React.FC = () => {
  const Tab = createBottomTabNavigator();
  const dispatch = useDispatch();
  const Logout = () => {
    const resetLogout = async () => {
      await AsyncStorage.setItem('sessionToken', '');
      dispatch({type: 'SESSION_KEY', title: ''});
    };
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button label="Sair" onPress={() => resetLogout()} />
      </View>
    );
  };

  return (
    <Tab.Navigator>
      <Tab.Screen name="Medics" component={Medics} />
      <Tab.Screen name="Pacients" component={Pacients} />
      <Tab.Screen name="Logout" component={Logout} />
    </Tab.Navigator>
  );
};

export default MainScreen;

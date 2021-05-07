import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import Medics from '../src/screens/Medics/Medics';
import Pacients from '../src/screens/Pacients/Pacients';
const MainScreen: React.FC = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Medics" component={Medics} />
      <Tab.Screen name="Pacients" component={Pacients} />
    </Tab.Navigator>
  );
};

export default MainScreen;

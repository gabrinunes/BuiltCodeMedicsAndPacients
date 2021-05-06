import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Medics from '../src/screens/Medics/Medics';
import Pacients from '../src/screens/Pacients/Pacients';
const Tabs: React.FC = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Medics" component={Medics} />
      <Tab.Screen name="Pacients" component={Pacients} />
    </Tab.Navigator>
  );
};

export default Tabs;

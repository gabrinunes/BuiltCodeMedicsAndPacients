import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';

import dados from './src/store/store';
import SplashScreen from 'react-native-splash-screen';
import Routes from './routes';
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={dados}>
      <Routes />
    </Provider>
  );
};

export default App;

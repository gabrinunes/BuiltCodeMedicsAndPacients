import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';

import dados from './src/store/store';
import Routes from './routes';

const App = () => {
  return (
    <Provider store={dados}>
      <Routes />
    </Provider>
  );
};

export default App;

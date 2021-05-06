/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import {Text, View} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

const MainScreen = () => {
  const dados = useSelector(state => state.dados);

  return (
    <View style={{flex: 1}}>
        <Text>{dados}</Text>
    </View>
  );
};

export default MainScreen;

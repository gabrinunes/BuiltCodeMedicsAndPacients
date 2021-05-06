import React from 'react';
import {View, Text} from 'react-native';

import {Input, LoginButton, Container} from './styles';
import api from '../../services/api';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';

interface Response {
  data: {
    success: true;
    data: {
      accessToken: string;
    };
  };
}

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogin = async () => {
    const response: Response = await api.post('v1/mobile/auth', {
      email: 'gn_cunha@hotmail.com',
      password: 'ywKh!ux8Ffnw',
    });
    console.log('dados', response.data.data.accessToken);
    saveSessionToken(response.data.data.accessToken);
    response.data.success === true ? navigation.navigate('Tabs') : null;
  };

  const saveSessionToken = async (sessionKey: string) => {
    await AsyncStorage.setItem('sessionToken', sessionKey);
    dispatch({type: 'SESSION_KEY', title: sessionKey});
  };

  return (
    <Container>
      <Text>Login</Text>
      <Input placeholder="User" />
      <Input placeholder="Password" secureTextEntry={true} />
      <LoginButton onPress={() => handleLogin()}>
        <Text>Login</Text>
      </LoginButton>
    </Container>
  );
};
export default Home;

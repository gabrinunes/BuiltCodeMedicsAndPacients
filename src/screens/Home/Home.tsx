import React, {useState} from 'react';
import {View, Text, Alert} from 'react-native';

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
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('ywKh!ux8Ffnw');

  const handleLogin = async () => {
    if (user === '' || password === '') {
      Alert.alert('Dados Incompletos', 'Por favor preencha todos os campos', [
        {text: 'Ok', onPress: () => {}},
      ]);
    } else {
      try {
        const response: Response = await api.post('v1/mobile/auth', {
          email: user,
          password: password,
        });
        console.log('dados', response.data.data.accessToken);
        saveSessionToken(response.data.data.accessToken);
      } catch (error) {
        Alert.alert(
          'Login Invalido :(',
          'Por favor verifique seu email e senha',
          [{text: 'ok', onPress: () => {}}],
        );
      }
    }
  };

  const saveSessionToken = async (sessionKey: string) => {
    await AsyncStorage.setItem('sessionToken', sessionKey);
    dispatch({type: 'SESSION_KEY', title: sessionKey});
  };

  return (
    <Container>
      <Text>Login</Text>
      <Input placeholder="User" onChangeText={value => setUser(value)} />
      <Input
        placeholder="Password"
        onChangeText={value => setPassword(value)}
        secureTextEntry={true}
      />
      <LoginButton onPress={() => handleLogin()}>
        <Text>Login</Text>
      </LoginButton>
    </Container>
  );
};
export default Home;

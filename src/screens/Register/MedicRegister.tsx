import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Input from '../../components/inputs/index';
import Button from '../../components/button/index';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import api from '../../services/api';
// import { Container } from './styles';

const Register: React.FC = () => {
  const {goBack} = useNavigation();
  const dados = useSelector(state => state.dados);
  const dadosiD = useSelector(state => state.idDoc);
  const dispatch = useDispatch();
  const [name, SetName] = useState<string>('');
  const [crm, SetCrm] = useState<string>('');
  const [crmUf, SetCrmUf] = useState<string>('');
  const config = {
    headers: {Authorization: `Bearer ${dados}`},
  };

  const handleRegister = async () => {
    try {
      const response = await api.post(
        'v1/mobile/doctors/create',
        {
          name: name,
          crm: crm,
          crmUf: crmUf,
        },
        config,
      );
      console.log('response', response.data.data.id);
      goBack();
    } catch (error) {
      console.log('erro', error);
    }
  };

  useEffect(() => {
    console.log('dados do id', dadosiD);
  }, []);

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity onPress={() => goBack()}>
        <Icon name="arrow-left" size={30} />
      </TouchableOpacity>
      <View
        style={{alignItems: 'center', justifyContent: 'center', padding: 10}}>
        <Input placeholder="seu nome" onChangeText={value => SetName(value)} />
        <Input placeholder="seu Crm" onChangeText={value => SetCrm(value)} />
        <Input
          placeholder="seu CrmUF"
          onChangeText={value => SetCrmUf(value)}
        />
        <Button label="cadastrar" onPress={() => handleRegister()} />
      </View>
    </View>
  );
};

export default Register;

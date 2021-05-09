import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import Input from '../../components/inputs/index';
import Button from '../../components/button/index';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {Medics} from '../Medics/Medics';
import api from '../../services/api';

// import { Container } from './styles';

const PatientRegister: React.FC = () => {
  const {goBack} = useNavigation();
  const idDoc = useSelector(state => state.Medics);
  const dados = useSelector(state => state.dados);
  const [medics, setMedics] = useState<Medics[]>([]);
  const [name, setName] = useState<string>('');
  const [birth, setBirth] = useState();
  const [cpf, setCpf] = useState<string>('');
  const [docId, setDocId] = useState<string>('');
  const config = {
    headers: {Authorization: `Bearer ${dados}`},
  };

  const handleRegisterPatient = async () => {
    const response = await api.post(
      'v1/mobile/patients/create',
      {
        name: name,
        birthDate: birth,
        cpf: cpf,
        doctorId: docId,
      },
      config,
    );
    console.log('response,', response);
  };

  const parseDate = (birth: string) => {
    var dateParts = birth.split('/');

    var date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    console.log('data parsed', date);
    setBirth(date);
  };
  useEffect(() => {
    setMedics(idDoc[0].medicsList);
  }, []);

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity onPress={() => goBack()}>
        <Icon name="arrow-left" size={30} />
      </TouchableOpacity>
      <View
        style={{alignItems: 'center', justifyContent: 'center', padding: 10}}>
        <Input
          placeholder="Nome do Paciente"
          onChangeText={value => setName(value)}
        />
        <Input
          placeholder="data de nascimento em formato mm/dd/yyyy"
          onChangeText={value => parseDate(value)}
        />
        <Input placeholder="cpf" onChangeText={value => setCpf(value)} />
      </View>
      <Picker selectedValue={medics} onValueChange={value => setDocId(value)}>
        {medics.map(item => (
          <Picker.Item label={`Médico :${item.name}`} value={item.id} />
        ))}
      </Picker>
      <View style={{alignItems: 'center'}}>
        <Button label="cadastrar" onPress={() => handleRegisterPatient()} />
      </View>
    </View>
  );
};

export default PatientRegister;

import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Input from '../../components/inputs';
import Button from '../../components/button';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import api from '../../services/api';
// import { Container } from './styles';

const PatientEdit: React.FC = () => {
  const {goBack} = useNavigation();
  const dados = useSelector(state => state.dados);
  const route = useRoute();
  const {id, docId, patient} = route.params;
  const [name, setName] = useState<string>(patient.name);
  const [birth, setBirth] = useState(patient.birthDate);
  const [cpf, setCpf] = useState<string>(patient.cpf);
  const config = {
    headers: {Authorization: `Bearer ${dados}`},
  };
  console.log('chegou os parametros', id, docId);

  const parseDate = (birth: string) => {
    var dateParts = birth.split('/');

    var date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    console.log('data parsed', date);
    setBirth(date);
  };

  const handleEdit = async () => {
    try {
      await api.put(
        `/v1/mobile/patients/update/${id}`,
        {
          name: name,
          birthDate: birth,
          cpf: cpf,
          doctorId: docId,
        },
        config,
      );
      goBack();
    } catch (error) {
      console.log('erro', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity onPress={() => goBack()}>
        <Icon name="arrow-left" size={30} />
      </TouchableOpacity>
      <View
        style={{alignItems: 'center', justifyContent: 'center', padding: 10}}>
        <Input
          preset={name}
          placeholder="Nome do Paciente"
          onChangeText={value => setName(value)}
        />
        <Input
          preset={birth}
          placeholder="data de nascimento em formato mm/dd/yyyy"
          onChangeText={value => parseDate(value)}
        />
        <Input
          preset={cpf}
          placeholder="cpf"
          onChangeText={value => setCpf(value)}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <Button label="cadastrar" onPress={() => handleEdit()} />
      </View>
    </View>
  );
};

export default PatientEdit;

import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Alert} from 'react-native';
import Button from '../../components/button/index';
import Platelets from '../../components/platelets/index';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';
import {useSelector} from 'react-redux';

export interface Patients {
  id: string;
  name: string;
  birthDate: string;
  cpf: string;
}

const Pacients: React.FC = () => {
  const navigation = useNavigation();
  const dados = useSelector(state => state.dados);
  const [patients, setPatients] = useState<Patients[]>([]);
  const config = {
    headers: {Authorization: `Bearer ${dados}`},
  };
  const handlePatients = async () => {
    try {
      const response = await api.get('/v1/mobile/patients', config);
      console.log('response', response.data.data.itens);
      setPatients(response.data.data.itens);
    } catch (error) {}
  };

  const handleDeletePatient = async (id: string) => {
    try {
      await api.delete(`/v1/mobile/patients/delete/${id}`, config);
      const deletedPatient = patients.filter(patient => id !== patient.id);
      setPatients(deletedPatient);
    } catch (error) {}
  };

  useEffect(() => {
    handlePatients();
  }, []);

  const checkPatient = () => {
    Alert.alert(
      'Cadastro de Paciente',
      'O Médico não foi selecionado,por favor selecione o médico na aba Medics :) ',
      [{text: 'Ok', onPress: () => navigation.navigate('PatientRegister')}],
    );
  };

  const renderItems = ({item}: {item: Patients}) => (
    <Platelets
      dataPacients={item}
      isPacient={true}
      onpress={() => handleDeletePatient(item.id)}
    />
  );

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <FlatList data={patients} renderItem={renderItems} />
      <Button label="Cadastrar Paciente" onPress={() => checkPatient()} />
    </View>
  );
};

export default Pacients;

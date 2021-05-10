import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, FlatList, Alert} from 'react-native';
import Button from '../../components/button/index';
import Platelets from '../../components/platelets/index';
import {
  useNavigation,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native';
import api from '../../services/api';
import {useSelector} from 'react-redux';
import {Medics} from '../Medics/Medics';
import {Picker} from '@react-native-picker/picker';

export interface Patients {
  id: string;
  doctorId: string;
  doctor: Medics;
  name: string;
  birthDate: string;
  cpf: string;
}

const Pacients: React.FC = () => {
  const navigation = useNavigation();
  const dados = useSelector(state => state.dados);
  const medicsList = useSelector(state => state.Medics);
  const isFocused = useIsFocused();
  const [patients, setPatients] = useState<Patients[]>([]);
  const [patientsFilter, setPatientsFilter] = useState<Patients[]>([]);
  const [medics, setMedics] = useState<Medics[]>([]);
  const config = {
    headers: {Authorization: `Bearer ${dados}`},
  };
  const handlePatients = async () => {
    try {
      const response = await api.get('/v1/mobile/patients', config);
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

  const filterPatientsByMedics = (docId: string) => {
    console.log('value', patients, docId);
    const filtered = patients.filter(patient => patient.doctorId === docId);
    setPatientsFilter(filtered);
  };

  useEffect(() => {
    handlePatients();
    setMedics(medicsList[0].medicsList);
  }, [isFocused]);

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
      onpressEdit={() =>
        navigation.navigate('PatientEdit', {
          id: item.id,
          docId: item.doctorId,
          patient: item,
        })
      }
      onpress={() => handleDeletePatient(item.id)}
    />
  );

  return (
    <>
      <Picker onValueChange={value => filterPatientsByMedics(value)}>
        {medics.map(item => (
          <Picker.Item label={item.name} value={item.id} />
        ))}
      </Picker>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <FlatList data={patients} renderItem={renderItems} />
        <Button label="Cadastrar Paciente" onPress={() => checkPatient()} />
      </View>
    </>
  );
};

export default Pacients;

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
  const [filter, setFilter] = useState<boolean>(false);
  const [filterSearch, setFilterSearch] = useState<boolean>(false);
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

  const checkIfMedicExists = () => {
    medics.length === 0 ? setFilterSearch(false) : null;
  };

  const filterPatientsByMedics = (docId: string) => {
    console.log('docId', patients, docId);
    docId ? setFilterSearch(true) : setFilterSearch(false);
    const filtered = patients.filter(patient => patient.doctorId === docId);
    console.log('resultado', filtered);
    setPatientsFilter(filtered);
  };

  const filterToggle = () => {
    if (filterSearch === false) {
      Alert.alert(
        'Selecione o M??dico',
        'por favor,selecione um m??dico para filtrar',
        [{text: 'OK', onPress: () => {}}],
      );
    } else {
      filter ? setFilter(false) : setFilter(true);
    }
  };

  useEffect(() => {
    handlePatients();
    checkIfMedicExists();
    setMedics(medicsList[0].medicsList);
  }, [isFocused]);

  const checkPatient = () => {
    if (medics.length > 0) {
      navigation.navigate('PatientRegister');
    } else {
      Alert.alert(
        'Cadastro de Paciente',
        'N??o ha M??dicos cadastrados,por favor cadastre um para cadastrar pacientes :( ',
        [{text: 'Ok', onPress: () => {}}],
      );
    }
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
        <Picker.Item label="Selecione um medico" value="" />
        {medics.map(item => (
          <Picker.Item label={item.name} value={item.id} />
        ))}
      </Picker>
      <View style={{alignItems: 'center'}}>
        {filter ? (
          <Button label="Desativar" onPress={() => filterToggle()} />
        ) : (
          <Button label="Filtrar" onPress={() => filterToggle()} />
        )}
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {filter ? (
          <FlatList data={patientsFilter} renderItem={renderItems} />
        ) : (
          <FlatList data={patients} renderItem={renderItems} />
        )}
        <Button label="Cadastrar Paciente" onPress={() => checkPatient()} />
      </View>
    </>
  );
};

export default Pacients;

import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';

import Input from '../../components/inputs/index';
import Button from '../../components/button/index';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../services/api';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Platelets from '../../components/platelets/index';
export interface Medics {
  crm: string;
  crmUf: string;
  id: string;
  name: string;
}

const Medics: React.FC = () => {
  const dados = useSelector(state => state.dados);
  const idDoc = useSelector(state => state.Medics);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [medics, setMedics] = useState<Medics[]>([]);
  const [loading, setloading] = useState(false);
  const config = {
    headers: {Authorization: `Bearer ${dados}`},
  };
  const handleListMedics = async () => {
    setloading(true);
    try {
      const response = await api.get('v1/mobile/doctors/', config);
      setloading(false);
      setMedics(response.data.data.itens);
      const medicsList = response.data.data.itens;
      dispatch({type: 'SET_ID', medicsList});
    } catch (error) {
      console.log('error', error);
    }
  };

  const deleteDoctor = async (id: string) => {
    try {
      const response = await api.delete(
        `v1/mobile/doctors/delete/${id}`,
        config,
      );
      const filtered = medics.filter(medic => id !== medic.id);
      setMedics(filtered);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    console.log('dados da store', dados, idDoc);
    handleListMedics();
  }, [dados]);

  const renderItems = ({item}: {item: Medics}) => (
    <Platelets dataMedics={item} onpress={() => deleteDoctor(item.id)} />
  );

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <FlatList data={medics} renderItem={renderItems} />
      <Button
        label="Cadastrar Médico"
        onPress={() => navigation.navigate('MedicRegister')}
      />
    </View>
  );
};

export default Medics;

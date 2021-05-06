import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';

import Input from '../../components/inputs/index';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../services/api';

interface Medics {
  crm: string;
  crmUf: string;
  id: string;
  name: string;
}

const Medics: React.FC = () => {
  const dados = useSelector(state => state.dados);
  const [name, SetName] = useState<string>('');
  const [crm, SetCrm] = useState<string>('');
  const [crmUf, SetCrmUf] = useState<string>('');
  const [medics, setMedics] = useState<Medics[]>([]);
  const [loading, setloading] = useState(false);
  const config = {
    headers: {Authorization: `Bearer ${dados}`},
  };
  // const handleRegister = async () => {
  //   const response = await api.post(
  //     'v1/mobile/doctors/create',
  //     {
  //       name: 'Beatriz Jenkins',
  //       crm: '02454896565798',
  //       crmUf: 'MG',
  //     },
  //     config,
  //   );
  //   console.log('oq retornou', response);
  // };
  const handleListMedics = async () => {
    setloading(true);
    const response = await api.get('v1/mobile/doctors/', config);
    setloading(false);
    setMedics(response.data.data.itens);
  };

  const deleteDoctor = async (id: string) => {
    try {
      const response = await api.delete(
        `v1/mobile/doctors/delete/${id}`,
        config,
      );
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    handleListMedics();
    // handleRegister();
  }, [dados]);

  const renderItems = ({item}: {item: Medics}) => (
    <>
      <TouchableOpacity
        onPress={() => console.log('id do item', item.id)}
        style={{
          width: 350,
          alignItems: 'flex-start',
          height: 90,
          padding: 10,
          backgroundColor: 'grey',
          marginTop: 10,
          borderRadius: 10,
        }}>
        <Text style={{fontSize: 16}}>Médico:{item.name}</Text>
        <Text style={{fontSize: 14}}>Crm:{item.crm}</Text>
        <Text style={{fontSize: 14}}>CrmUf:{item.crmUf}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          Alert.alert('Excluir Medico', 'Deseja Excluir o medico Selecionado', [
            {text: 'Sim', onPress: () => deleteDoctor(item.id)},
            {text: 'Não', onPress: () => {}},
          ])
        }
        style={{position: 'absolute', left: 310, top: 35}}>
        <Icon name="trash" size={20} />
      </TouchableOpacity>
      <TouchableOpacity style={{position: 'absolute', left: 280, top: 35}}>
        <Icon name="edit" size={20} />
      </TouchableOpacity>
    </>
  );

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <FlatList data={medics} renderItem={renderItems} />
    </View>
  );
};

export default Medics;

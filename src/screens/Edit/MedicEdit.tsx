import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Input from '../../components/inputs';
import Button from '../../components/button';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation, useRoute} from '@react-navigation/native';
import api from '../../services/api';
import {useSelector} from 'react-redux';
// import { Container } from './styles';

const MedicEdit: React.FC = () => {
  const {goBack} = useNavigation();
  const dados = useSelector(state => state.dados);
  const route = useRoute();
  const {docId, medic} = route.params;
  const [name, SetName] = useState<string>(medic.name);
  const [crm, SetCrm] = useState<string>(medic.crm);
  const [crmUf, SetCrmUf] = useState<string>(medic.crmUf);
  const config = {
    headers: {Authorization: `Bearer ${dados}`},
  };

  const handleEdit = async () => {
    try {
      await api.put(
        `/v1/mobile/doctors/update/${docId}`,
        {
          name: name,
          crm: crm,
          crmUf: crmUf,
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
          placeholder="seu nome"
          onChangeText={value => SetName(value)}
        />
        <Input
          preset={crm}
          placeholder="seu Crm"
          onChangeText={value => SetCrm(value)}
        />
        <Input
          preset={crmUf}
          placeholder="seu CrmUF"
          onChangeText={value => SetCrmUf(value)}
        />
        <Button label="Editar" onPress={() => handleEdit()} />
      </View>
    </View>
  );
};

export default MedicEdit;

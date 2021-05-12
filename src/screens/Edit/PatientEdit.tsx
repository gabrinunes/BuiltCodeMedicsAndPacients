import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import Input from '../../components/inputs';
import Button from '../../components/button';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import api from '../../services/api';
import {Picker} from '@react-native-picker/picker';
// import { Container } from './styles';

const PatientEdit: React.FC = () => {
  const {goBack} = useNavigation();
  const dados = useSelector(state => state.dados);
  const idDoc = useSelector(state => state.Medics);
  const [medics, setMedics] = useState<Medics[]>([]);
  const route = useRoute();
  const {id, patient} = route.params;
  const [name, setName] = useState<string>(patient.name);
  const [birth, setBirth] = useState(patient.birthDate);
  const [cpf, setCpf] = useState<string>(patient.cpf);
  const [docIdSelected, setDocIdSelected] = useState<string>('');
  const config = {
    headers: {Authorization: `Bearer ${dados}`},
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

  const handleEdit = async () => {
    if (name === '' || birth === '' || cpf === '' || docIdSelected === '') {
      Alert.alert('Dados Incompletos', 'Por favor preencha todos os campos', [
        {text: 'Ok', onPress: () => {}},
      ]);
    } else {
      try {
        await api.put(
          `/v1/mobile/patients/update/${id}`,
          {
            name: name,
            birthDate: birth,
            cpf: cpf,
            doctorId: docIdSelected,
          },
          config,
        );
        goBack();
      } catch (error) {
        console.log('erro', error);
      }
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
      <Picker
        selectedValue={medics}
        onValueChange={value => setDocIdSelected(value)}>
        {medics.map(item => (
          <Picker.Item
            label={`Médico :${item.name}`}
            value={item.id}
            key={item.id}
          />
        ))}
      </Picker>
      <View style={{alignItems: 'center'}}>
        <Button label="editar" onPress={() => handleEdit()} />
      </View>
    </View>
  );
};

export default PatientEdit;

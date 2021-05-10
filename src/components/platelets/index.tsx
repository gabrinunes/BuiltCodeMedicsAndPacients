import React from 'react';
import {View, TouchableOpacity, Text, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Medics} from '../../screens/Medics/Medics';
import {Patients} from '../../screens/Pacients/Pacients';

// import { Container } from './styles';

interface Props {
  onpress(): void;
  onpressEdit(): void;
  isPacient?: boolean;
  dataMedics?: Medics;
  dataPacients?: Patients;
}

const platelets: React.FC<Props> = ({
  dataPacients,
  onpress,
  onpressEdit,
  isPacient,
  dataMedics,
}) => {
  return (
    <>
      <TouchableOpacity
        style={{
          width: 350,
          alignItems: 'flex-start',
          height: 90,
          padding: 10,
          backgroundColor: 'grey',
          marginTop: 10,
          borderRadius: 10,
        }}>
        {isPacient ? (
          <>
            <Text style={{fontSize: 16}}>Pacient:{dataPacients?.name}</Text>
            <Text style={{fontSize: 14}}>
              BirthDate:{dataPacients?.birthDate}
            </Text>
            <Text style={{fontSize: 14}}>Cpf:{dataPacients?.cpf}</Text>
          </>
        ) : (
          <>
            <Text style={{fontSize: 16}}>Médico:{dataMedics?.name}</Text>
            <Text style={{fontSize: 14}}>Crm:{dataMedics?.crm}</Text>
            <Text style={{fontSize: 14}}>CrmUf:{dataMedics?.crmUf}</Text>
          </>
        )}
      </TouchableOpacity>
      {isPacient ? (
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              'Excluir Paciente',
              'Deseja Excluir o paciente Selecionado',
              [
                {text: 'Sim', onPress: () => onpress()},
                {text: 'Não', onPress: () => {}},
              ],
            )
          }
          style={{position: 'absolute', left: 310, top: 35}}>
          <Icon name="trash" size={20} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              'Excluir Medico',
              'Deseja Excluir o medico Selecionado',
              [
                {text: 'Sim', onPress: () => onpress()},
                {text: 'Não', onPress: () => {}},
              ],
            )
          }
          style={{position: 'absolute', left: 310, top: 35}}>
          <Icon name="trash" size={20} />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={onpressEdit}
        style={{position: 'absolute', left: 280, top: 35}}>
        <Icon name="edit" size={20} />
      </TouchableOpacity>
    </>
  );
};

export default platelets;

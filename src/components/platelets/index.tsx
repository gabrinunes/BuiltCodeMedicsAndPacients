import React from 'react';
import {View, TouchableOpacity, Text, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Medics} from '../../screens/Medics/Medics';
import {Patients} from '../../screens/Pacients/Pacients';
import {TouchContainer, TouchInconDelete, TouchInconEdit} from './style';
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
      <TouchContainer>
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
      </TouchContainer>
      {isPacient ? (
        <TouchInconDelete
          onPress={() =>
            Alert.alert(
              'Excluir Paciente',
              'Deseja Excluir o paciente Selecionado',
              [
                {text: 'Sim', onPress: () => onpress()},
                {text: 'Não', onPress: () => {}},
              ],
            )
          }>
          <Icon name="trash" size={20} />
        </TouchInconDelete>
      ) : (
        <TouchInconDelete
          onPress={() =>
            Alert.alert(
              'Excluir Medico',
              'Deseja Excluir o medico Selecionado',
              [
                {text: 'Sim', onPress: () => onpress()},
                {text: 'Não', onPress: () => {}},
              ],
            )
          }>
          <Icon name="trash" size={20} />
        </TouchInconDelete>
      )}
      <TouchInconEdit
        onPress={onpressEdit}
        style={{position: 'absolute', left: 280, top: 35}}>
        <Icon name="edit" size={20} />
      </TouchInconEdit>
    </>
  );
};

export default platelets;

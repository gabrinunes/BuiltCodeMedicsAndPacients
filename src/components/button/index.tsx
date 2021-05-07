import React from 'react';
import {View, Text} from 'react-native';

import {LoginButton} from './style';

interface Props {
  onPress(): void;
  label: string;
}

const button: React.FC<Props> = ({label, onPress}) => {
  return (
    <LoginButton onPress={() => onPress()}>
      <Text>{label}</Text>
    </LoginButton>
  );
};

export default button;

/* eslint-disable prettier/prettier */
import React from 'react';
import {Input} from './styles';
import {View} from 'react-native';

interface Props {
  onChangeText():void;
  placeholder?: string;
}

const inputs: React.FC<Props> = ({placeholder,onChangeText}) => {
  return <Input placeholder={placeholder} onChangeText={onChangeText} />;
};

export default inputs;

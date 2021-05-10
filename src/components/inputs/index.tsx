/* eslint-disable prettier/prettier */
import React from 'react';
import {Input} from './styles';
import {View} from 'react-native';

interface Props {
  onChangeText():void;
  preset?:string;
  placeholder?: string;
}

const inputs: React.FC<Props> = ({placeholder,onChangeText,preset}) => {
  return <Input value={preset} placeholder={placeholder} onChangeText={onChangeText} />;
};

export default inputs;

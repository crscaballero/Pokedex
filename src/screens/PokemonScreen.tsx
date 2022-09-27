import React from 'react';
import { View, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParams } from '../navigator/Navigator';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({navigation, route}: Props) => {
  const {simplePokemon, color} = route.params;
  return (
    <View>
      <Text>PokemonScreen</Text>
      <Text style={{color: 'black'}}>{simplePokemon.name}</Text>
      <Text style={{color: 'black'}}>{color}</Text>
    </View>
  );
};

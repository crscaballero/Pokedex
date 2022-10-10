import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SimplePokemon } from '../interfaces/PokemonInterfaces';
import { HomeScreen } from '../screens/HomeScreen';
import { PokemonScreen } from '../screens/PokemonScreen';
import { StyleSheet } from 'react-native';

export type RootStackParams = {
  HomeScreen: undefined;
  PokemonScreen: {
    simplePokemon: SimplePokemon
    color: string;
  };
  SearchScreen: undefined;
}

const Stack = createStackNavigator<RootStackParams>();

export const Navigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: styles.tabArea
    }}
  >
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  tabArea: {
    backgroundColor: 'white'
  }
});

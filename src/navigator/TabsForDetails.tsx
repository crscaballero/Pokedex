import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { PokemonScreen } from '../screens/PokemonScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { RootStackParams } from './Navigator';
import { StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const Tab2 = createStackNavigator<RootStackParams>();

export const TabsForDetails = () => (
  <Tab2.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: styles.tabArea
    }}
  >
    <Tab2.Screen name="HomeScreen" component={SearchScreen} />
    <Tab2.Screen name="PokemonScreen" component={PokemonScreen} />
  </Tab2.Navigator>
);

const styles = StyleSheet.create({
  tabArea: {
    backgroundColor: 'white'
  }
});

import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { Navigator } from './Navigator';
import { TabsForDetails } from './TabsForDetails';

const Tab = createBottomTabNavigator();

export const Tabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#5856D6',
      tabBarLabelStyle: {
        marginBottom: (Platform.OS === 'ios') ? 0 : 10
      },
      tabBarStyle: {
        ...styles.tabArea,
        height: (Platform.OS === 'ios') ? 80 : 60,
      }
    }}
  >
    <Tab.Screen
      name="Navigator"
      component={Navigator}
      options={{
        tabBarLabel: 'List',
        tabBarIcon: ({color}: any) => (<Icon color={color} size={25} name="list-outline" />)
      }}
    />
    <Tab.Screen
      name="SearchScreen"
      component={TabsForDetails}
      options={{
        tabBarLabel: 'Search',
        tabBarIcon: ({color}: any) => (<Icon color={color} size={25} name="search-outline" />)
      }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabArea: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.82)',
    borderWidth: 0,
    elevation: 0,
  }
});

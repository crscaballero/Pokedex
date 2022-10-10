import 'react-native-gesture-handler';
import React from 'react';
// import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { Tabs } from './navigator/Tabs';

const App = () => {
  return (
    <NavigationContainer>
    {/* <SafeAreaView> */}
      {/* <StatusBar barStyle='dark-content' /> */}
      <Tabs />
    {/* </SafeAreaView> */}
    </NavigationContainer>
  );
};

export default App;

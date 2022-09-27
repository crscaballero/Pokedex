import 'react-native-gesture-handler';
import React from 'react';
// import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { Navigator } from './navigator/Navigator';

const App = () => {
  return (
    <NavigationContainer>
    {/* <SafeAreaView> */}
      {/* <StatusBar barStyle='dark-content' /> */}
      <Navigator />
    {/* </SafeAreaView> */}
    </NavigationContainer>
  );
};

export default App;

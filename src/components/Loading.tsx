import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

export const Loading = () => (
  <View style={styles.activityContainer} >
    <ActivityIndicator size={50} color="grey" />
    <Text style={{color: 'grey'}}>
      Loading
    </Text>
  </View>
)

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

import React from 'react';

import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {isSigned} from '../../constants/auth';

export const HomeScreen = () => {
  const logout = () => {
    console.log('hola');
    isSigned(false);
  };
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Button mode="outlined" onPress={logout}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

import React from 'react';

import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';

export const HomeScreen = ({navigation}: {navigation: any}) => {
  const logout = () => {
    navigation.navigate('Services');
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

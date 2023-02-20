import React from 'react';

import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useAppDispatch} from '../../hooks';
import {logout} from '../../slices/auth';

export const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Button mode="outlined" onPress={handleLogout}>
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

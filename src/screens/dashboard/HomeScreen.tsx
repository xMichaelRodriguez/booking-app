/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useColorScheme} from 'react-native';
import {useAppSelector} from '../../hooks';

export const HomeScreen = () => {
  const color = useColorScheme();
  const isDark = color === 'dark';
  const {username} = useAppSelector(state => state.auth);
  return (
    <View style={styles.container}>
      <Text style={{color: isDark ? '#fbfbfb' : '#282828'}}>
        Welcome Back {username}
      </Text>
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

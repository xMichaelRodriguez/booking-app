import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SignInView} from './views/SignInView';

export const SignInScreen = ({navigation}: {navigation?: any}) => {
  return (
    <View style={styles.view}>
      <SignInView navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 15,
  },
  inputView: {
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
  },
});

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {theme} from '../theme/theme';
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
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
    color: theme.colors.secondary,
  },
  logoView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textColor: {color: '#282828'},
});

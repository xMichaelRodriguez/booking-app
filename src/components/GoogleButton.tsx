/* eslint-disable react-native/no-inline-styles */
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useEffect} from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Avatar, Text} from 'react-native-paper';

import {useAppDispatch} from '../hooks';
import {starLoginGoogle} from '../store/slices/auth';

export const GoogleButton = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    GoogleSignin.configure({});
  }, []);

  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const onSigin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      const {accessToken} = await GoogleSignin.getTokens();

      dispatch(starLoginGoogle(accessToken));

      await GoogleSignin.signOut();
    } catch (error) {
      if (error instanceof Error)
        if (error.message === 'DEVELOPER_ERROR')
          console.log('User cancelled the sign-in flow');

      console.log('Error occurred while signing in with Google');
    }
  };

  return (
    <TouchableOpacity
      style={[
        {backgroundColor: isDark ? '#166BEF' : '#fbfbfb', elevation: 1},
        styles.googleButton,
      ]}>
      <Avatar.Image
        style={{backgroundColor: 'transparent', marginHorizontal: 10}}
        source={require('../assets/google-logo.png')}
        size={30}
      />
      <Text onPress={onSigin} style={{color: isDark ? '#fbfbfb' : '#808080'}}>
        Iniciar sesion con Google
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {marginLeft: -20},
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    padding: 10,
    borderRadius: 10,
  },
});

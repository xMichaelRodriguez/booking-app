/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';
import {Avatar, Divider, IconButton, Text} from 'react-native-paper';

import {useAppDispatch, useAppSelector} from '../hooks';
import {authLogout} from '../store/slices/auth';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DrawerMenu = ({props}: {props: any}) => {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === 'dark';
  const {username, email} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(authLogout());
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.profileContainer}>
        <Avatar.Image source={require('../assets/candy-logo.jpg')} />
        <Text
          variant="titleLarge"
          style={[
            styles.titleUser,
            {color: isDarkTheme ? '#fbfbfb' : '#282828'},
          ]}>
          {username.length > 0 && username}
        </Text>
        <Text
          variant="bodyMedium"
          style={{color: isDarkTheme ? '#fbfbfb' : '#282828'}}>
          {email.length > 0 && email}
        </Text>
      </View>
      <DrawerItemList {...props} />
      <Divider />
      <DrawerItem
        label={'Logout'}
        icon={() => <IconButton icon="power-standby" />}
        onPress={handleLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  profileContainer: {
    padding: 10,
    lineHeight: 20,
    margin: 20,
  },
  titleUser: {
    fontWeight: 'bold',
  },

  buttonStyle: {
    // flex: 1,
    // justifyContent: '',
    alignContent: 'center',
  },
});

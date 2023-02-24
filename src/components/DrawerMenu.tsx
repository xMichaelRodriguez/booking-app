/* eslint-disable react/no-unstable-nested-components */
import {DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Divider, IconButton, Text} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../hooks';
import {logout} from '../store/slices/auth';

export const DrawerMenu = ({props}: {props: any}) => {
  const {username, email} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.profileContainer}>
        <Avatar.Image source={require('../assets/candy-logo.jpg')} />
        <Text variant="titleLarge" style={styles.titleUser}>
          {username && username}
        </Text>
        <Text variant="bodyMedium">{email && email}</Text>
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

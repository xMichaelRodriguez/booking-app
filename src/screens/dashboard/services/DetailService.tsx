/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {View, Image, StyleSheet, useColorScheme} from 'react-native';

import {Avatar, Text, Button, Dialog, Portal} from 'react-native-paper';
import {ROLE_ADMIN} from '../../../constants/roles';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {removeService} from '../../../store/slices/services/thunks';
export const DetailService = ({navigation}: {navigation: any}) => {
  const {isActiveService} = useAppSelector(state => state.service);
  const {isLoading} = useAppSelector(state => state.ui);
  const {role} = useAppSelector(state => state.auth);
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const [visible, setVisible] = React.useState(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const dispatch = useAppDispatch();
  const onSchedule = () => {
    navigation.navigate('Root', {
      screen: 'BookCake',
    });
  };

  const onRemove = () => {
    dispatch(
      removeService((isRemoved: boolean) => {
        if (isRemoved) {
          navigation.goBack();
        }
      }),
    );
  };
  return (
    <View style={styles.mainContainer}>
      <Image
        style={styles.image}
        source={{
          uri: isActiveService?.secureUrl,
        }}
      />

      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text
            variant="bodyLarge"
            style={[styles.text, {color: isDark ? '#fbfbfb' : '#282828'}]}>
            Name
          </Text>
          <Text
            variant="bodyMedium"
            style={[styles.subText, {color: isDark ? '#fbfbfb' : '#282828'}]}>
            {isActiveService?.name}
          </Text>
        </View>

        <View style={styles.textContainer}>
          <Text
            variant="bodyLarge"
            style={[styles.text, {color: isDark ? '#fbfbfb' : '#282828'}]}>
            Description
          </Text>
          <Text
            variant="bodyMedium"
            style={[styles.subText, {color: isDark ? '#fbfbfb' : '#282828'}]}>
            {isActiveService?.description}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text
            variant="bodyLarge"
            style={[styles.text, {color: isDark ? '#fbfbfb' : '#282828'}]}>
            Price
          </Text>
          <Text
            variant="bodyMedium"
            style={[styles.subText, {color: isDark ? '#fbfbfb' : '#282828'}]}>
            $ {isActiveService?.price}
          </Text>
        </View>

        <View style={styles.buttonContianer}>
          {role?.id === ROLE_ADMIN ? (
            <Button
              style={styles.buttonWidth}
              mode="outlined"
              icon="trash-can-outline"
              onPress={toggleVisible}
              loading={isLoading}>
              Remove
            </Button>
          ) : (
            <Button
              mode="contained"
              style={styles.buttonWidth}
              onPress={onSchedule}>
              Book order
            </Button>
          )}
        </View>
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={toggleVisible}>
          <Dialog.Title>
            <Avatar.Image source={{uri: isActiveService?.secureUrl}} />
          </Dialog.Title>
          <Dialog.Content>
            <Text variant="titleLarge">{isActiveService?.name}</Text>
            <Text variant="bodyMedium">
              do you want to Delete this Service?
            </Text>
          </Dialog.Content>
          <Dialog.Actions style={styles.containerChildren}>
            <Button
              mode="outlined"
              style={styles.buttonWidth}
              onPress={toggleVisible}>
              Cancel
            </Button>
            <Button onPress={onRemove} mode="contained">
              yes, to Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1.5,
    padding: 10,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    paddingVertical: 25,
    paddingHorizontal: 10,
  },
  subText: {
    paddingVertical: 10,
  },
  text: {
    fontWeight: 'bold',
  },
  buttonWidth: {
    width: '100%',
  },
  buttonContianer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',

    alignSelf: 'center',
  },
  containerChildren: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
  },
  buttonWidth2: {
    width: '90%',
  },
});

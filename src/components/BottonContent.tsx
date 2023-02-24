/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Divider, Text} from 'react-native-paper';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import {useAppSelector} from '../hooks';
import {theme} from '../theme/theme';

export const BottonContent = () => {
  const {isActiveService} = useAppSelector(state => state.service);

  if (!isActiveService) {
    return (
      <ActivityIndicator
        style={styles.activityStyle}
        animating={true}
        color={theme.colors.primary}
        size="large"
      />
    );
  }
  return (
    <View style={styles.bottomSheetContainer}>
      <View style={styles.header}>
        <Avatar.Image
          size={60}
          style={styles.borderBox}
          source={require('./../assets/no-data.png')}
        />
        <View>
          <Text variant="headlineSmall">{isActiveService?.name}</Text>
          <Text variant="bodyLarge">${isActiveService?.price}</Text>
        </View>
      </View>

      <Divider style={{width: '90%'}} />

      <Text variant="bodyLarge">sure you want to eliminate it?</Text>

      <Button
        style={styles.buttonWidth}
        icon="trash-can-outline"
        mode="contained"
        buttonColor={theme.colors.error}>
        Confirm
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  bottomSheetContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },

  borderBox: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    gap: 12,
  },
  divider: {
    marginVertical: 12,
  },
  activityStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  buttonWidth: {
    width: '90%',
  },
});

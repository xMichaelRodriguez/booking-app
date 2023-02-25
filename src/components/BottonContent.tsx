/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, useTheme} from 'react-native-paper';
import {Image, ActivityIndicator, StyleSheet, View} from 'react-native';
import {useAppSelector} from '../hooks';

export const BottonContent = () => {
  const {isActiveService} = useAppSelector(state => state.service);
  const theme = useTheme();

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
      <View style={styles.containerImage}>
        <Image
          style={[styles.image, {borderRadius: 10}]}
          resizeMode="contain"
          source={{uri: isActiveService?.media_url}}
        />
      </View>
      <View>
        <Text variant="headlineSmall">{isActiveService?.caption}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  bottomSheetContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  borderBox: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  containerImage: {
    height: 350,
    width: 350,
  },
  divider: {
    marginVertical: 12,
  },
  activityStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWidth: {
    width: '90%',
  },
});

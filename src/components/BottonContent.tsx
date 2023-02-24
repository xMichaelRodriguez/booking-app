/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Card, Divider, Text} from 'react-native-paper';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {useAppSelector} from '../hooks';
import {theme} from '../theme/theme';
import VideoPlayer from 'react-native-video-player';
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
        {isActiveService?.thumbnail_url ? (
          <VideoPlayer src={{uri: isActiveService.media_url}} />
        ) : (
          <Card>
            <Card.Cover source={{uri: isActiveService?.media_url}} />
          </Card>
        )}

        <View>
          <Text variant="headlineSmall">{isActiveService?.caption}</Text>
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
    flexDirection: 'column',
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

/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, useTheme, Button, Divider} from 'react-native-paper';
import {Image, ActivityIndicator, StyleSheet, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../hooks';
import {useNavigation} from '@react-navigation/native';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {removeService} from '../store/slices/services/thunks';

type Prop = {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
};
export const BottonContent = ({bottomSheetRef}: Prop) => {
  const {isActiveService} = useAppSelector(state => state.service);
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const onSchedule = () => {
    navigation.navigate('Root', {
      screen: 'BookCake',
    });
    bottomSheetRef?.current?.snapToIndex(0);
  };
  const onRemove = () => {
    dispatch(
      removeService((isRemoved: boolean) => {
        if (isRemoved) {
          bottomSheetRef?.current?.snapToIndex(0);
        }
      }),
    );
  };

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
          source={{uri: isActiveService?.secureUrl}}
        />
      </View>
      <View style={{padding: 20}}>
        <Text variant="labelLarge">{isActiveService?.name}</Text>
        <Divider style={{margin: 5}} />
        <Text variant="labelMedium">{isActiveService?.description}</Text>
      </View>
      <View style={{flexDirection: 'row', gap: 5}}>
        <Button mode="outlined" onPress={onRemove}>
          Remove
        </Button>
        <Button mode="contained" onPress={onSchedule}>
          Schedule
        </Button>
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
    height: 180,
    width: 180,
    marginVertical: 8,
  },
  divider: {
    marginVertical: 12,
  },
  activityStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWidth: {
    width: '90%',
  },
});

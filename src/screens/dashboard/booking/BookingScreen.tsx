/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {List, Button, Text} from 'react-native-paper';
import {FlatList, StyleSheet, useWindowDimensions, View} from 'react-native';
import {IBooking} from '../../../interface/booking.interface';
import {BookingItemCard} from './BookingItemCard';
import {useNavigation} from '@react-navigation/native';
import {ButtonSheetWrapper} from '../../../components/ButtonSheetWrapper';
import BottomSheet from '@gorhom/bottom-sheet';
import {theme} from '../../../theme/theme';

const data: IBooking[] = [
  {
    id: 1,
    service: {
      id: 1,
      name: 'Service 1',
      description: 'item description',
      price: 10,
    },
    client: {
      id: 1,
      username: 'JohnDoe',
      email: 'johndoe@example.com',
    },
    status: {
      id: 1,
      name: 'Reservado',
    },
    date: '01/14/2023',
    hour: '12:00 AM',
  },

  {
    id: 2,
    service: {
      id: 2,
      name: 'Service 2',
      description: 'item description',
      price: 12,
    },
    client: {
      id: 1,
      username: 'JohnDoe',
      email: 'johndoe@example.com',
    },
    status: {
      id: 2,
      name: 'Cancelado',
    },
    date: '01/14/2023',
    hour: '01:00 PM',
  },
  {
    id: 3,
    service: {
      id: 3,
      name: 'Service 3',
      description: 'item description',
      price: 13,
    },
    client: {
      id: 1,
      username: 'JohnDoe',
      email: 'johndoe@example.com',
    },
    status: {
      id: 3,
      name: 'Entregado',
    },
    date: '01/14/2023',
    hour: '01:00 PM',
  },
];

export const BookingScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation();

  // Get the height of the screen
  const {height} = useWindowDimensions();
  const openSheet = () => {
    bottomSheetRef.current?.snapToIndex(1);
  };
  return (
    <View style={{flex: 1}}>
      <List.Section>
        <FlatList
          keyboardDismissMode="on-drag"
          data={data}
          renderItem={({item}) => (
            <BookingItemCard
              key={item.id}
              booking={item}
              handleOpenSheet={openSheet}
              navigation={navigation}
            />
          )}
        />
      </List.Section>
      <ButtonSheetWrapper
        bottomSheetRef={bottomSheetRef}
        percentage={'20%'}
        height={height}>
        <View style={custom.containerChildren}>
          <Text variant="titleLarge">
            Sure you wish to cancel the reservation?
          </Text>

          <Button
            style={custom.buttonWidth}
            mode="contained"
            icon="trash-can-outline"
            buttonColor={theme.colors.error}>
            Confirm
          </Button>
        </View>
      </ButtonSheetWrapper>
    </View>
  );
};

const custom = StyleSheet.create({
  containerChildren: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
  },
  buttonWidth: {
    width: '90%',
  },
});

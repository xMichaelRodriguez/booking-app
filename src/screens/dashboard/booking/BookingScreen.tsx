/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef} from 'react';
import {List, Button, Text, useTheme} from 'react-native-paper';
import {FlatList, StyleSheet, useWindowDimensions, View} from 'react-native';
import {BookingItemCard} from './BookingItemCard';
import {useNavigation} from '@react-navigation/native';
import {ButtonSheetWrapper} from '../../../components/ButtonSheetWrapper';
import BottomSheet from '@gorhom/bottom-sheet';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  getBookings,
  onDeleteBook,
  setActiveBooking,
} from '../../../store/slices/bookings/thunks';
import {IBook} from '../../../store/slices/bookings/interface/bookin.interface';

export const BookingScreen = () => {
  const theme = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation();
  const {bookings} = useAppSelector(state => state.bookings);
  const {isLoading} = useAppSelector(state => state.ui);

  const dispatch = useAppDispatch();
  // Get the height of the screen
  const {height} = useWindowDimensions();
  const openSheet = (item: IBook) => {
    dispatch(setActiveBooking(item));
    bottomSheetRef.current?.snapToIndex(1);
  };

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);

  const handleDeleteBooking = () => {
    dispatch(
      onDeleteBook(
        (result: boolean) => result && bottomSheetRef.current?.snapToIndex(0),
      ),
    );
  };

  return (
    <View style={{flex: 1, padding: 10}}>
      <List.Section>
        <FlatList
          keyboardDismissMode="on-drag"
          data={bookings}
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
            buttonColor={theme.colors.error}
            onPress={handleDeleteBooking}
            loading={isLoading}>
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
  fab: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 16,
    backgroundColor: 'blue',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

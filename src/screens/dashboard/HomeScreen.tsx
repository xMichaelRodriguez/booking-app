/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable react-native/no-inline-styles */
import type BottomSheet from '@gorhom/bottom-sheet';
import moment, {type Moment} from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {Button, Text, useTheme} from 'react-native-paper';

import {ButtonSheetWrapper} from '../../components/ButtonSheetWrapper';
import {BookingList} from '../../components/calendar/BookingList';
import {CalendarHeader} from '../../components/calendar/CalendarHeader';
import {NotData} from '../../components/ui/NotData';
import WrapperAnimate from '../../components/ui/WrapperAnimate';
import {INITIAL_DATE} from '../../constants/times';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {type IBook} from '../../store/slices/bookings/interface/bookin.interface';
import {
  getBookings,
  onDeleteBook,
  setActiveBooking,
} from '../../store/slices/bookings/thunks';

export const HomeScreen = () => {
  const {isLoading} = useAppSelector(state => state.ui);
  const {bookings} = useAppSelector(state => state.bookings);
  const theme = useTheme();
  const {height} = useWindowDimensions();
  const [selectedDate, setSelectedDate] = useState<Moment>(
    moment(INITIAL_DATE),
  );
  const bottomSheetRef = useRef<BottomSheet>(null);
  const dispatch = useAppDispatch();
  const openSheet = (item: IBook) => {
    dispatch(setActiveBooking(item));
    bottomSheetRef.current?.snapToIndex(1);
  };

  const handleDeleteBooking = () => {
    dispatch(
      onDeleteBook(
        ({result}: {result: boolean}) =>
          result && bottomSheetRef.current?.snapToIndex(0),
      ),
    );
  };

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);

  return (
    <View style={{flex: 1}}>
      <WrapperAnimate>
        <CalendarHeader
          selected={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        {bookings ? (
          <WrapperAnimate>
            <BookingList
              handleOpenSheet={openSheet}
              selectedDate={selectedDate}
            />
          </WrapperAnimate>
        ) : (
          <NotData />
        )}
      </WrapperAnimate>
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
            Confirmar
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
  activityStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flex: 1,
  },
  image: {
    width: 300,
    height: 300,
  },
});

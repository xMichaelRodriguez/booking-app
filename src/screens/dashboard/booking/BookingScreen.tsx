/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable react-native/no-inline-styles */
import type BottomSheet from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  Image,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
  useColorScheme,
  ActivityIndicator,
  // ActivityIndicator,
} from 'react-native';
import {List, Button, Text, useTheme, Dialog, Portal} from 'react-native-paper';

import {ButtonSheetWrapper} from '../../../components/ButtonSheetWrapper';
import WrapperAnimate from '../../../components/ui/WrapperAnimate';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {onClearActiveBooking} from '../../../store/slices/bookings/bookingSlice';
import {type IBook} from '../../../store/slices/bookings/interface/bookin.interface';
import {
  getBookings,
  onDeleteBook,
  setActiveBooking,
  setCompleteBookingState,
} from '../../../store/slices/bookings/thunks';
import {BookingItemCard} from './BookingItemCard';

const noDataImage = require('../../../assets/no-data.png');
export const BookingScreen = () => {
  const theme = useTheme();

  const [visible, setVisible] = React.useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation();
  const {bookings, isBookingActive, isLoading} = useAppSelector(
    state => state.bookings,
  );
  const {isLoading: uiLoading} = useAppSelector(state => state.ui);
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
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

  const hideDialog = () => {
    dispatch(onClearActiveBooking());
    setVisible(false);
  };

  const handleDeleteBooking = () => {
    dispatch(
      onDeleteBook(
        ({result}: {result: boolean}) =>
          result && bottomSheetRef.current?.snapToIndex(0),
      ),
    );
  };
  const handleComplete = () => {
    dispatch(setCompleteBookingState());
    hideDialog();
  };

  if (isLoading)
    return (
      <ActivityIndicator
        style={custom.activityStyle}
        animating={true}
        color={theme.colors.primary}
        size="large"
      />
    );

  if (Object.entries(bookings).length < 1)
    return (
      <View style={custom.activityStyle}>
        <Image style={custom.image} source={noDataImage} />
        <Text
          style={{color: isDark ? '#fbfbfb' : '#282828'}}
          variant="titleLarge">
          No Data
        </Text>
      </View>
    );

  return (
    <View style={{flex: 1, padding: 10}}>
      <WrapperAnimate>
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
      </WrapperAnimate>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{isBookingActive?.serviceId?.name}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              do you want to complete this booking?
            </Text>
          </Dialog.Content>
          <Dialog.Actions style={custom.containerChildren}>
            <Button
              mode="outlined"
              style={custom.buttonWidth}
              onPress={hideDialog}>
              Cancelar
            </Button>
            <Button onPress={handleComplete} mode="contained">
              yes, to complete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
            loading={uiLoading}>
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

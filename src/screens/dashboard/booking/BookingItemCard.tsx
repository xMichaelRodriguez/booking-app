/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Text,
  Divider,
  IconButton,
} from 'react-native-paper';

import {useAppDispatch, useAppSelector} from '../../../hooks';
import {type IBook} from '../../../store/slices/bookings/interface/bookin.interface';
import {setActiveBooking} from '../../../store/slices/bookings/thunks';
import {startLoadingUI} from '../../../store/slices/ui/uiSlice';
import {COMPLETED_STATE_ID} from '../../../utils/state-id';

interface IProps {
  booking: IBook;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any;
  handleOpenSheet: (item: IBook) => void;
}

const statesOfBooking = {
  Reservado: 'blue',
  Entregado: 'green',
  Cancelado: 'red',
};

export const BookingItemCard = ({booking, handleOpenSheet}: IProps) => {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === 'dark';
  const dispatch = useAppDispatch();
  const {isLoading} = useAppSelector(state => state.ui);
  const navigation = useNavigation();
  const iconColor =
    statesOfBooking[booking.statusId.name as keyof typeof statesOfBooking] ??
    'black';

  const setActiveOnOpenSheet = () => {
    handleOpenSheet(booking);
  };

  const handleEditBook = async () => {
    dispatch(startLoadingUI());
    dispatch(setActiveBooking(booking));

    navigation.navigate(
      'Root' as never,
      {
        screen: 'EditBook',
      } as never,
    );
  };
  return (
    <Card
      mode="contained"
      style={[
        custom.margins,
        {
          backgroundColor: isDarkTheme ? '#353740' : '#eee',
        },
      ]}>
      <Card.Content>
        <View style={custom.container}>
          <Avatar.Image
            size={60}
            source={{uri: booking.serviceId?.secureUrl}}
          />
          <View style={{maxWidth: '75%', overflow: 'hidden'}}>
            <Text
              numberOfLines={5}
              variant="titleSmall"
              style={{color: isDarkTheme ? '#fbfbfb' : '#282828'}}>
              {booking.serviceId?.name}
            </Text>
          </View>
        </View>
        <Divider />
        <View style={custom.inlineContianer}>
          <View style={custom.dataSchedule}>
            <IconButton
              icon={'calendar-month-outline'}
              iconColor={isDarkTheme ? '#fbfbfb' : '#282828'}
            />
            <Text style={{color: isDarkTheme ? '#fbfbfb' : '#282828'}}>
              {booking.date}
            </Text>
          </View>
          <View style={custom.dataSchedule}>
            <IconButton
              icon={'clock-time-seven-outline'}
              iconColor={isDarkTheme ? '#fbfbfb' : '#282828'}
            />
            <Text style={{color: isDarkTheme ? '#fbfbfb' : '#282828'}}>
              {booking.hour}
            </Text>
          </View>
          <View style={custom.dataSchedule}>
            <IconButton
              icon={'wall-sconce-flat-variant-outline'}
              iconColor={iconColor}
            />
            <Text style={{color: isDarkTheme ? '#fbfbfb' : '#282828'}}>
              {booking.statusId.name}
            </Text>
          </View>
        </View>
        <View style={custom.cardSpace}>
          <Button
            style={custom.buttonSize}
            mode="outlined"
            onPress={setActiveOnOpenSheet}
            disabled={booking.statusId.id === COMPLETED_STATE_ID}>
            Cancelar
          </Button>

          <Button
            style={custom.buttonSize}
            mode="contained"
            onPress={handleEditBook}
            loading={isLoading}
            disabled={booking.statusId.id === COMPLETED_STATE_ID}>
            Edit
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

const custom = StyleSheet.create({
  margins: {margin: 5, borderRadius: 20},
  container: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },

  cardSpace: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  inlineContianer: {
    marginHorizontal: -20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dataSchedule: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonSize: {
    width: '50%',
  },
});

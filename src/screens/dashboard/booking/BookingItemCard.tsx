/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Avatar,
  Button,
  Card,
  Text,
  Divider,
  IconButton,
} from 'react-native-paper';
import {StyleSheet, useColorScheme, View} from 'react-native';
import {IBooking} from '../../../interface/booking.interface';

interface IProps {
  booking: IBooking;
  navigation: any;
  handleOpenSheet: () => void;
}

const statesOfBooking = {
  Reservado: 'blue',
  Entregado: 'green',
  Cancelado: 'red',
};

export const BookingItemCard = ({booking, handleOpenSheet}: IProps) => {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === 'dark';

  const iconColor =
    statesOfBooking[booking.status.name as keyof typeof statesOfBooking] ||
    'black';

  const setActiveOnOpenSheet = () => {
    handleOpenSheet();
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
            style={custom.borderBox}
            source={require('./../../../assets/no-data.png')}
          />
          <View>
            <Text
              variant="titleMedium"
              style={{color: isDarkTheme ? '#fbfbfb' : '#282828'}}>
              {booking.service.name}
            </Text>
            <Text
              variant="bodyMedium"
              style={{color: isDarkTheme ? '#fbfbfb' : '#282828'}}>
              Price: ${booking.service.price}
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
              {booking.status.name}
            </Text>
          </View>
        </View>
        <View style={custom.cardSpace}>
          <Button
            style={custom.buttonSize}
            mode="outlined"
            onPress={setActiveOnOpenSheet}>
            Cancel
          </Button>
          <Button
            style={custom.buttonSize}
            mode="contained"
            onPress={() => console.log('HOLA2')}>
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
  borderBox: {
    borderRadius: 10,
    overflow: 'hidden',
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
    width: '40%',
  },
});

import React from 'react';
import {
  Avatar,
  Button,
  Card,
  Text,
  Divider,
  IconButton,
} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {theme} from '../../../theme/theme';
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
  const iconColor =
    statesOfBooking[booking.status.name as keyof typeof statesOfBooking] ||
    'black';

  const setActiveOnOpenSheet = () => {
    handleOpenSheet();
  };
  return (
    <Card style={custom.margins} mode="contained">
      <Card.Content>
        <View style={custom.container}>
          <Avatar.Image
            size={60}
            style={custom.borderBox}
            source={require('./../../../assets/no-data.png')}
          />
          <View>
            <Text variant="titleMedium">{booking.service.name}</Text>
            <Text variant="bodyMedium" style={{color: theme.colors.subTitle}}>
              Price: ${booking.service.price}
            </Text>
          </View>
        </View>
        <Divider />
        <View style={custom.inlineContianer}>
          <View style={custom.dataSchedule}>
            <IconButton
              icon={'calendar-month-outline'}
              iconColor={theme.colors.primary}
            />
            <Text>{booking.date}</Text>
          </View>
          <View style={custom.dataSchedule}>
            <IconButton
              icon={'clock-time-seven-outline'}
              iconColor={theme.colors.primary}
            />
            <Text>{booking.hour}</Text>
          </View>
          <View style={custom.dataSchedule}>
            <IconButton
              icon={'wall-sconce-flat-variant-outline'}
              iconColor={iconColor}
            />
            <Text>{booking.status.name}</Text>
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
    marginHorizontal: -10,
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

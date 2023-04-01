import React from 'react';
import {View, StyleSheet} from 'react-native';
import {IconButton, Text} from 'react-native-paper';

import {type IState} from '../../store/slices/bookings/interface/bookin.interface';
const statesOfBooking = {
  Reservado: 'blue',
  Entregado: 'green',
  Cancelado: 'red',
};
const iconNamePerState = {
  Reservado: 'calendar-clock-outline',
  Entregado: 'calendar-check-outline',
  Cancelado: 'calendar-remove-outline',
};

interface props {
  username: string;
  status: IState;
}
export const DescriptionItem = ({username, status}: props) => {
  const iconColor =
    statesOfBooking[status.name as keyof typeof statesOfBooking] ?? 'black';

  const iconName =
    iconNamePerState[status.name as keyof typeof iconNamePerState] ?? '';
  return (
    <View style={styles.container}>
      <Text>{username}</Text>
      <IconButton icon={iconName} iconColor={iconColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Divider,
  IconButton,
  Text,
  useTheme,
} from 'react-native-paper';
import {ROLE_ADMIN} from '../../constants/roles';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {IBook} from '../../store/slices/bookings/interface/bookin.interface';
import {setActiveBooking} from '../../store/slices/bookings/thunks';
import {startLoadingUI} from '../../store/slices/ui/uiSlice';
import {COMPLETED_STATE_ID} from '../../utils/state-id';

interface IProps {
  booking: IBook;
  handleOpenSheet: (item: IBook) => void;
}

const statesOfBooking = {
  Reservado: 'blue',
  Finalizado: 'green',
  Cancelado: 'red',
};
export const BookingItem = ({booking, handleOpenSheet}: IProps) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === 'dark';
  const {role} = useAppSelector(state => state.auth);
  const {isLoading} = useAppSelector(state => state.ui);
  const iconColor =
    statesOfBooking[booking.statusId.name as keyof typeof statesOfBooking] ||
    'black';

  const dispatch = useAppDispatch();
  const setActiveOnOpenSheet = () => {
    handleOpenSheet(booking);
  };

  const onEdit = async () => {
    dispatch(startLoadingUI());
    await dispatch(setActiveBooking(booking));
    navigation.navigate('Root', {
      screen: 'EditBook',
    });
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
          <View style={custom.dataSchedule}>
            <Text
              style={{
                color: theme.colors.primary,
                marginHorizontal: 10,
              }}>
              {booking.hour}
            </Text>
          </View>
          <Avatar.Image
            size={60}
            source={{uri: booking.serviceId?.secureUrl}}
          />
          <View
            style={[
              {maxWidth: '50%', overflow: 'hidden'},
              custom.inlineContianer,
            ]}>
            <Text
              numberOfLines={5}
              variant="titleSmall"
              style={{color: isDarkTheme ? '#fbfbfb' : '#282828'}}>
              {booking.serviceId?.caption.slice(0, 50)}...
            </Text>
            <View>
              <IconButton
                icon={'wall-sconce-flat-variant-outline'}
                iconColor={iconColor}
              />
            </View>
          </View>
        </View>
        <Divider />

        <View style={custom.cardSpace}>
          <Button
            style={custom.buttonSize}
            mode="outlined"
            onPress={setActiveOnOpenSheet}>
            Cancel
          </Button>

          {role && role.id === ROLE_ADMIN ? (
            ''
          ) : (
            <Button
              style={custom.buttonSize}
              mode="contained"
              onPress={onEdit}
              loading={isLoading}
              disabled={booking.statusId.id === COMPLETED_STATE_ID}>
              {' '}
              {role && role.id !== ROLE_ADMIN ? 'Edit' : 'complete booking'}
            </Button>
          )}
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
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  dataSchedule: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonSize: {
    width: '50%',
  },
});

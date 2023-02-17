/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {List, Text} from 'react-native-paper';
import {IBooking} from '../../interface/booking.interface';

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
      name: 'Completed',
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
      id: 1,
      name: 'Completed',
    },
    date: '01/14/2023',
    hour: '01:00 PM',
  },
];
export const BookingScreen = ({navigation}: {navigation: any}) => {
  const goBookingItem = (item: IBooking) => {
    navigation.navigate('Root', {
      screen: 'BookingItem',
      params: {
        ...item,
      },
    });
  };
  return (
    <List.Section>
      <List.Subheader>
        <Text variant="displaySmall">Bookings List</Text>
      </List.Subheader>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <List.Item
            onPress={() => goBookingItem(item)}
            key={item.id}
            title={item.service?.name}
            description={item.client?.username}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
        )}
      />
    </List.Section>
  );
};

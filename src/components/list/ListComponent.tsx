/* eslint-disable react/no-unstable-nested-components */

import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {List, Text} from 'react-native-paper';

import {IServiceInput} from '../../interface/service.interface';

const data: IServiceInput[] = [
  {
    name: 'First Item',
    description: 'item description',
    price: 10,
  },
];
export const ListComponent = ({navigation}: {navigation: any}) => {
  const details = (item: IServiceInput) => {
    const {name, description, price} = item;
    navigation.navigate('Root', {
      screen: 'ServiceItem',
      params: {
        name,
        description,
        price,
      },
    });
  };
  return (
    <List.Section>
      <List.Subheader>
        <Text>Services List</Text>
      </List.Subheader>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <List.Item
            key={item.name}
            title={item.name}
            description={item.price}
            onPress={() => details(item)}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
        )}
      />
    </List.Section>
  );
};

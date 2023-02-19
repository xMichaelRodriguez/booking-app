/* eslint-disable react/no-unstable-nested-components */

import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {List} from 'react-native-paper';

import {IServiceInput} from '../../interface/service.interface';

const data: IServiceInput[] = [
  {
    id: 1,
    name: 'First Item',
    description: 'item description',
    price: 10,
  },
  {
    id: 2,
    name: 'Second Item',
    description: 'item description 2',
    price: 15,
  },
];
export const ListComponent = ({navigation}: {navigation: any}) => {
  const details = (item: IServiceInput) => {
    navigation.replace('Root', {
      screen: 'ServiceItem',
      params: {
        ...item,
      },
    });
  };
  return (
    <List.Section>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <List.Item
            key={item.name}
            title={item.name}
            description={`Price: $${item.price}`}
            onPress={() => details(item)}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
        )}
      />
    </List.Section>
  );
};

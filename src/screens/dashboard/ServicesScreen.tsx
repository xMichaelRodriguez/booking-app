import React from 'react';
import {View} from 'react-native';
import {ListComponent} from '../../components/list/ListComponent';

export const ServicesScreen = ({navigation}: {navigation: any}) => {
  return (
    <View>
      <ListComponent navigation={navigation} />
    </View>
  );
};

/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {ActivityIndicator, Button, List} from 'react-native-paper';
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {INavigationProps} from '../../interface';
import {IService} from '../../slices/services/interface/services.interface';

import {getServices} from '../../slices/services/thunks';
import {theme} from '../../theme/theme';
import {FabButton} from '../../components/list/FabButton';

const noDataImage = require('../../assets/no-data.png');

export const ServicesScreen = ({navigation}: INavigationProps) => {
  const {services, isLoading} = useAppSelector(state => state.service);
  const dispatch = useAppDispatch();

  const [isExtended, setIsExtended] = React.useState(true);
  const details = (item: IService) => {
    navigation.replace('Root', {
      screen: 'ServiceItem',
      params: {
        ...item,
      },
    });
  };
  const createService = () => {
    navigation.replace('Root', {
      screen: 'NewService',
    });
  };

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const onScroll = ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  if (isLoading) {
    return (
      <ActivityIndicator
        style={custom.activityStyle}
        animating={true}
        color={theme.colors.primary}
        size="large"
      />
    );
  }

  if (services === undefined) {
    return (
      <View style={custom.activityStyle}>
        <Image style={custom.image} source={noDataImage} />
        <Button
          icon={'plus'}
          mode="contained"
          contentStyle={custom.buttonW}
          onPress={createService}>
          Create Service
        </Button>
      </View>
    );
  }
  return (
    <View style={custom.view}>
      <List.Section>
        <FlatList
          onScroll={onScroll}
          data={services}
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
      <FabButton isExtended={isExtended} />
    </View>
  );
};

const custom = StyleSheet.create({
  activityStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  view: {flex: 1},
  buttonW: {
    width: 300,
  },
  image: {
    width: 300,
    height: 300,
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
});

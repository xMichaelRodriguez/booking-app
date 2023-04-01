/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Image, StyleSheet, useColorScheme, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {ActivityIndicator, useTheme, Text, Button} from 'react-native-paper';

import {useAppDispatch, useAppSelector} from '../../../hooks';
import {useInfinityScroll} from '../../../hooks/useInfinityScroll';
import {type INavigationProps} from '../../../interface';
import {onClearService} from '../../../store/slices/services/servicesSlice';
import {getServices} from '../../../store/slices/services/thunks';
import {ListItemCard} from './components/ListItemCard';

const noDataImage = require('../../../assets/no-data.png');

export const ServicesScreen = ({navigation}: INavigationProps) => {
  const theme = useTheme();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const dispatch = useAppDispatch();
  // store
  const {services, isLoadingService} = useAppSelector(state => state.service);
  const {isLoading: hookIsLoading, loadMore} = useInfinityScroll();

  // load services
  useEffect(() => {
    dispatch(getServices());
    return () => {
      dispatch(onClearService());
    };
  }, [dispatch]);

  const openSheet = () => {
    navigation.navigate('Root', {
      screen: 'detailServices',
    });
  };

  if (isLoadingService)
    return (
      <ActivityIndicator
        style={custom.activityStyle}
        animating={true}
        color={theme.colors.primary}
        size="large"
      />
    );

  if (Object.entries(services).length < 1) {
    const handleNewService = () => {
      navigation.navigate('Root', {screen: 'manageService'});
    };
    return (
      <View style={custom.activityStyle}>
        <Image style={custom.image} source={noDataImage} />
        <Text
          style={[{color: isDark ? '#fbfbfb' : '#282828'}, {margin: 10}]}
          variant="titleLarge">
          No Data
        </Text>
        <Button mode="contained" icon="plus" onPress={handleNewService}>
          New Service
        </Button>
      </View>
    );
  }

  return (
    <View style={custom.view}>
      <FlatList
        style={{paddingHorizontal: 10}}
        keyboardDismissMode="on-drag"
        onEndReached={() => {
          loadMore();
        }}
        onEndReachedThreshold={0.5}
        data={services}
        renderItem={({item}) => (
          <ListItemCard
            handleOpenSheet={openSheet}
            key={item.id}
            navigation={navigation}
            item={item}
          />
        )}
        ListFooterComponent={
          hookIsLoading ? (
            <ActivityIndicator
              style={custom.activityStyle}
              animating={true}
              color={theme.colors.primary}
              size="large"
            />
          ) : null
        }
      />
    </View>
  );
};

const custom = StyleSheet.create({
  activityStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flex: 1,
  },

  view: {flex: 1},
  buttonW: {
    width: 300,
  },
  margins: {
    textAlign: 'left',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
  },
});

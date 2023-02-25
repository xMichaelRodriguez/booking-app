/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ServicesScreen} from '../screens/dashboard/services/ServicesScreen';
import {HomeScreen} from '../screens/dashboard/HomeScreen';
import {BookingScreen} from '../screens/dashboard/booking/BookingScreen';
import {DrawerMenu} from './DrawerMenu';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IconButton, useTheme, Text} from 'react-native-paper';
import {BookingItemList} from '../screens/dashboard/booking/BookingItemList';
import {CreateOrUpdateBooking} from '../screens/dashboard/booking/CreateOrUpdateBooking';

const Drawer = createDrawerNavigator();

export const DrawerComponent = ({navigation}: {navigation: any}) => {
  const theme = useTheme();

  const handleGoBack = (subScreen: string) => {
    navigation.replace('Root', {screen: subScreen});
  };

  return (
    <Drawer.Navigator
      drawerContent={props => DrawerMenu({props})}
      initialRouteName="Home"
      backBehavior="history"
      screenOptions={{
        drawerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTitleStyle: {
          color: 'white',
        },

        drawerActiveTintColor: theme.colors.primary,
      }}>
      <Drawer.Group>
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            drawerIcon: ({size}) => (
              <IconButton icon="home-outline" size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Services"
          component={ServicesScreen}
          options={{
            drawerIcon: ({size}) => (
              <IconButton icon="store-cog-outline" size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Bookings"
          component={BookingScreen}
          options={{
            drawerIcon: ({size}) => (
              <IconButton icon="calendar-clock-outline" size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="BookingItem"
          options={{
            title: 'Details',
            headerLeft: () => (
              <TouchableOpacity onPress={() => handleGoBack('Bookings')}>
                <IconButton icon="chevron-left" />
              </TouchableOpacity>
            ),
            drawerItemStyle: {
              display: 'none',
            },
          }}
          component={BookingItemList}
        />

        <Drawer.Screen
          name="BookCake"
          component={CreateOrUpdateBooking}
          options={{
            title: 'Book Cake',
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => handleGoBack('Services')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <IconButton icon="chevron-left" />
                <Text>Back</Text>
              </TouchableOpacity>
            ),

            drawerItemStyle: {
              display: 'none',
            },
          }}
        />
      </Drawer.Group>
    </Drawer.Navigator>
  );
};

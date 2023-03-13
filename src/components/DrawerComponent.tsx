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
import {CreateOrUpdateBooking} from '../screens/dashboard/booking/CreateOrUpdateBooking';
import {CalendarToUpdate} from '../screens/dashboard/booking/components/CalendarToUpdate';
import {ServiceManager} from '../screens/dashboard/services/components/ServiceManager';

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
        swipeEnabled: false,
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
            headerTitleAlign: 'center',
            drawerIcon: ({size}) => (
              <IconButton icon="home-outline" size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Services"
          component={ServicesScreen}
          options={{
            headerTitleAlign: 'center',
            drawerIcon: ({size}) => (
              <IconButton icon="store-cog-outline" size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="newService"
          component={ServiceManager}
          options={{
            title: 'Edit Service',
            headerTitleAlign: 'center',
            drawerIcon: ({size}) => (
              <IconButton icon="store-cog-outline" size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Bookings"
          component={BookingScreen}
          options={{
            title: 'Booking List',
            headerTitleAlign: 'center',
            drawerIcon: ({size}) => (
              <IconButton icon="calendar-clock-outline" size={size} />
            ),
          }}
        />

        <Drawer.Screen
          name="BookCake"
          component={CreateOrUpdateBooking}
          options={{
            title: 'Schedule Order',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => handleGoBack('Services')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  margin: 0,
                }}>
                <IconButton iconColor="#fbfbfb" icon="chevron-left" />
                <Text style={{color: '#fbfbfb'}}>Back</Text>
              </TouchableOpacity>
            ),

            drawerItemStyle: {
              display: 'none',
            },
          }}
        />
        <Drawer.Screen
          name="EditBook"
          component={CalendarToUpdate}
          options={{
            title: 'Edit Book',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => handleGoBack('Bookings')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  margin: 0,
                }}>
                <IconButton iconColor="#fbfbfb" icon="chevron-left" />
                <Text style={{color: '#fbfbfb'}}>Back</Text>
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

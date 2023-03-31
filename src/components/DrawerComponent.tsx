/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ServicesScreen} from '../screens/dashboard/services/ServicesScreen';
import {HomeScreen} from '../screens/dashboard/HomeScreen';
import {BookingScreen} from '../screens/dashboard/booking/BookingScreen';
import {DrawerMenu} from './DrawerMenu';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IconButton, useTheme, Text} from 'react-native-paper';
import {UpdateBooking} from '../screens/dashboard/booking/components/UpdateBooking';
import {ServiceManager} from '../screens/dashboard/services/components/ServiceManager';
import {ROLE_ADMIN} from '../constants/roles';
import {useAppDispatch, useAppSelector} from '../hooks';
import {DetailService} from '../screens/dashboard/services/DetailService';
import {CreateBooking} from '../screens/dashboard/booking/components/CreateBooking';
import messaging from '@react-native-firebase/messaging';
import {subscribeNotifications} from '../store/slices/auth';
import {useNotificationPermission} from '../hooks/useNotifications';
const Drawer = createDrawerNavigator();

export const DrawerComponent = ({navigation}: {navigation: any}) => {
  const {role} = useAppSelector(state => state.auth);
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const hasPermission = useNotificationPermission();
  useEffect(() => {
    const getToken = async () => {
      try {
        if (await hasPermission) {
          const token = await messaging().getToken();
          dispatch(subscribeNotifications(token));
        }
      } catch (error) {
        console.error({error});
      }
    };

    getToken();
  }, [dispatch, hasPermission]);

  useEffect(() => {
    // TODO: Background Notification
    const unsubscribe = messaging().setBackgroundMessageHandler(
      async (remoteMessage: any) => {
        try {
          console.log('Notificación recibida en segundo plano', remoteMessage);
        } catch (error) {
          console.debug({error});
        }
      },
    );
    return () => {
      unsubscribe;
    };
  }, []);

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
            title: 'Inicio',
            headerTitleAlign: 'center',
            drawerIcon: ({size}) => (
              <IconButton icon="home-outline" size={size} />
            ),
          }}
        />
      </Drawer.Group>

      {/* services */}
      <Drawer.Group>
        <Drawer.Screen
          name="Services"
          component={ServicesScreen}
          options={{
            title: 'Productos',
            headerTitleAlign: 'center',
            drawerIcon: ({size}) => (
              <IconButton icon="store-cog-outline" size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="manageService"
          component={ServiceManager}
          options={{
            title: 'Administrar Producto',
            headerTitleAlign: 'center',
            drawerIcon: ({size}) => (
              <IconButton icon="store-cog-outline" size={size} />
            ),
            drawerItemStyle: {
              display: role?.id !== ROLE_ADMIN ? 'none' : 'flex',
            },
          }}
        />
        <Drawer.Screen
          name="detailServices"
          component={DetailService}
          options={{
            title: 'detalles de Producto',
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
      </Drawer.Group>

      {/* bookings */}
      <Drawer.Group>
        <Drawer.Screen
          name="Bookings"
          component={BookingScreen}
          options={{
            title: 'Lista de Ordenes',
            headerTitleAlign: 'center',
            drawerIcon: ({size}) => (
              <IconButton icon="calendar-clock-outline" size={size} />
            ),
          }}
        />

        <Drawer.Screen
          name="BookCake"
          component={CreateBooking}
          options={{
            title: 'Programar Orden',
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
          component={UpdateBooking}
          options={{
            title: 'Editar Orden',
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

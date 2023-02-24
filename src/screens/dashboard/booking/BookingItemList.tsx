import React from 'react';
import {Text} from 'react-native-paper';
import {IBooking} from '../../../interface/booking.interface';
export const BookingItemList = ({route}: {route: any; navigation: any}) => {
  const bookingParams: IBooking = route.params;

  // useEffect(() => {
  //   if (bookingParams) {
  //     const {client, date, hour, id, service, status} = bookingParams;
  //     setValue('client.username', client.username);
  //     setValue('service.name', service.name);
  //     setValue('status', status);
  //     setValue('hour', hour);
  //     setValue('date', date);
  //     setValue('id', id);
  //   }
  // }, [bookingParams, setValue]);

  // const handleGoBack = () => {
  //   navigation.replace('Root', {screen: 'Bookings'});
  //   navigation.closeDrawer();

  //   return true;
  // };
  // useFocusEffect(
  //   React.useCallback(() => {
  //     const subscription = BackHandler.addEventListener(
  //       'hardwareBackPress',
  //       () => {
  //         return handleGoBack();
  //       },
  //     );

  //     return () => subscription.remove();
  //   }, [handleGoBack]),
  // );

  // useEffect(() => {
  //   const getServices = async () => {
  //     try {
  //       const response = await fetch(urlService, {
  //         method: 'GET',
  //         headers: {Authorization: `Bearer ${token}`},
  //       });
  //       const data: IService[] = await response.json();
  //       setServices(data);
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         console.log(error);
  //       }
  //     }
  //   };
  //   const getStates = async () => {
  //     try {
  //       const response = await fetch(urlStates, {
  //         method: 'GET',
  //         headers: {Authorization: `Bearer ${token}`},
  //       });
  //       const data: IState[] = await response.json();
  //       setStates(data);
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         console.log(error);
  //       }
  //     }
  //   };

  //   getServices();
  //   getStates();
  // }, [bookingParams]);

  return <Text>{JSON.stringify(bookingParams)}</Text>;
};

// const styles = StyleSheet.create({
//   margins: {marginBottom: 15},
//   container: {
//     flex: 0,
//     padding: 10,
//     margin: 3,
//     justifyContent: 'center',
//   },

//   dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
//   dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
// });

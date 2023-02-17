/* eslint-disable react-hooks/exhaustive-deps */
import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import {Button, Text, TextInput} from 'react-native-paper';
import {BackHandler, StyleSheet, View} from 'react-native/';
import {IBooking} from '../../interface/booking.interface';
import {theme} from '../../theme/theme';
export const BookingItemList = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const bookingParams: IBooking = route.params;

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<IBooking>();

  React.useEffect(() => {
    if (bookingParams) {
      const {client, date, hour, id, service, status} = bookingParams;
      setValue('client.username', client.username);
      setValue('service.name', service.name);
      setValue('status', status);
      setValue('hour', hour);
      setValue('date', date);
      setValue('id', id);
    }
  }, [bookingParams, setValue]);

  const handleGoBack = () => {
    navigation.replace('Root', {screen: 'Bookings'});
    navigation.closeDrawer();

    return true;
  };
  useFocusEffect(
    React.useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          return handleGoBack();
        },
      );

      return () => subscription.remove();
    }, [handleGoBack]),
  );

  const onSubmit: SubmitHandler<IBooking> = data => {
    console.log(data);
  };
  return (
    <View style={styles.container}>
      <View style={styles.margins}>
        <Controller
          name="client.username"
          control={control}
          rules={{
            required: {value: true, message: 'Required Description'},
            minLength: {value: 3, message: 'Minumum valid characters: 50'},
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              error={!!errors.client?.username}
              label="client"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.client?.username?.type === 'required' && (
          <Text style={{color: theme.colors.error}}>
            {errors.client?.username.message}
          </Text>
        )}
        {errors.client?.username?.type === 'minLength' && (
          <Text style={{color: theme.colors.error}}>
            {errors.client?.username.message}
          </Text>
        )}
      </View>

      <View style={styles.margins}>
        <Controller
          name="service.name"
          control={control}
          rules={{
            required: {value: true, message: 'Required Description'},
            minLength: {value: 3, message: 'Minumum valid characters: 50'},
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              error={!!errors.service?.name}
              label="service"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.service?.name?.type === 'required' && (
          <Text style={{color: theme.colors.error}}>
            {errors.service?.name.message}
          </Text>
        )}
        {errors.service?.name?.type === 'minLength' && (
          <Text style={{color: theme.colors.error}}>
            {errors.service?.name.message}
          </Text>
        )}
      </View>

      <View style={styles.margins}>
        <Controller
          name="status.name"
          control={control}
          rules={{
            required: {value: true, message: 'Required Price'},
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              error={!!errors.status?.name}
              label="State"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              keyboardType="decimal-pad"
              value={String(value)}
            />
          )}
        />
        {errors.status?.name?.type === 'required' && (
          <Text style={{color: theme.colors.error}}>
            {errors.status?.name.message}
          </Text>
        )}
      </View>

      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  margins: {marginBottom: 15},
  container: {
    flex: 0,
    padding: 10,
    margin: 3,
    justifyContent: 'center',
  },
});

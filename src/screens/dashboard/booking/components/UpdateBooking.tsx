/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {useNavigation, useTheme} from '@react-navigation/native';
import moment from 'moment';
import React, {useMemo, useEffect, useState} from 'react';
import {useForm, type SubmitHandler} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native-paper';

import {INITIAL_DATE, times, weeKendTimes} from '../../../../constants/times';
import {useAppSelector, useAppDispatch} from '../../../../hooks';
import {type ICreateBook} from '../../../../store/slices/bookings/interface/bookin.interface';
import {updateBooking} from '../../../../store/slices/bookings/thunks';
import {BookVIew} from '../views/BookVIew';

export const UpdateBooking = () => {
  const navigation = useNavigation();

  const [timeState, setTimeState] = useState(times);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const {isBookingActive} = useAppSelector(state => state.bookings);
  const theme = useTheme();
  // TODO hook dispatch
  const dispatch = useAppDispatch();

  // handler for item selected
  const handlePress = useMemo(
    () => (time: string) => {
      setActiveItem(time);
    },
    [],
  );

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    getValues,
    setError,
    clearErrors,
    reset,
    watch,
  } = useForm<ICreateBook>();

  // set Value to hour by active booking
  useEffect(() => {
    const hourOk = isBookingActive?.hour?.split(' ')[0];
    setActiveItem(hourOk ?? null);

    setValue('hour', hourOk ?? '');
  }, [isBookingActive, setValue]);

  // set value to date by active booking
  useEffect(() => {
    if (isBookingActive != null) {
      const {date: bookingDate} = isBookingActive;
      const formattedDate = moment(bookingDate).format('YYYY-MM-DD');

      setValue('date', formattedDate);
    } else setValue('date', INITIAL_DATE);
  }, [isBookingActive, setValue]);

  // set note by active booking
  useEffect(() => {
    setValue('note', isBookingActive?.note ?? '');
  }, [isBookingActive, setValue]);

  const selected = watch('date');
  // set list hour
  useEffect(() => {
    const currentDate = moment(getValues().date);
    const isWeekend =
      currentDate.weekday() === 0 || currentDate.weekday() === 6;
    if (isWeekend) setTimeState(weeKendTimes);
    else setTimeState(times);
  }, [getValues, selected]);

  // observer activeItem
  useEffect(() => {
    setValue('hour', activeItem ?? '');
  }, [activeItem, setValue]);

  const onSubmit: SubmitHandler<ICreateBook> = data => {
    if (!data.hour) {
      setError('hour', {
        type: 'required',
        message: 'You must select a time',
      });
      return;
    }

    clearErrors('hour');
    if (!data.date) {
      setError('date', {
        type: 'required',
        message: 'You must select a date',
      });
      return;
    }

    clearErrors('date');

    dispatch(
      updateBooking(data, ({result}: {result: boolean}) => {
        if (result) {
          reset();
          navigation.goBack();
        }
      }),
    );
  };

  if (isBookingActive == null)
    return (
      <ActivityIndicator
        style={styles.activityStyle}
        animating={true}
        color={theme.colors.primary}
        size="large"
      />
    );

  return (
    <ScrollView style={styles.container}>
      <BookVIew
        mediaUrl={isBookingActive.serviceId?.secureUrl}
        name={isBookingActive.serviceId?.name}
        description={isBookingActive.serviceId?.description}
        activeItem={activeItem}
        control={control}
        errors={errors}
        handlePress={handlePress}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        timeState={timeState}
        buttonName={'ReSchedule'}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  activityStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 10,
    marginBottom: 20,
  },
});

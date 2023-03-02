import React, {useMemo, useEffect, useState} from 'react';

import {ActivityIndicator} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../../hooks';
import {SubmitHandler, useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {ICreateBook} from '../interface/createBook.interface';
import {createBooking} from '../../../../store/slices/bookings/thunks';
import {useNavigation, useTheme} from '@react-navigation/native';
import {BookVIew} from '../views/BookVIew';

const INITIAL_DATE = '2023-01-01';

const times = [
  '8:00',
  '8:30',
  '9:00',
  '9:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
];
const weeKendTimes = [
  '7:00',
  '7:30',
  '8:00',
  '8:30',
  '9:00',
  '9:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
];

export const CalendarComponent = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(INITIAL_DATE);
  const [timeState, setTimeState] = useState(times);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const {isActiveService} = useAppSelector(state => state.service);
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
    setError,
    clearErrors,
    reset,
  } = useForm<ICreateBook>();

  // set date
  useEffect(() => {
    if (!selected) {
      return setError('date', {
        type: 'required',
        message: 'You must select a Date',
      });
    }
    clearErrors('date');
    setValue('date', selected);
  }, [clearErrors, selected, setError, setValue]);

  // setHour
  useEffect(() => {
    if (!activeItem) {
      return;
    }
    clearErrors('hour');
    setValue('hour', activeItem);
  }, [activeItem, clearErrors, setValue]);

  useEffect(() => {
    const currentDate = new Date(selected);
    const isWeekennd = currentDate.getDay() === 5 || currentDate.getDay() === 6;
    if (isWeekennd) {
      return setTimeState(weeKendTimes);
    } else {
      return setTimeState(times);
    }
  }, [selected]);

  const onSubmit: SubmitHandler<ICreateBook> = data => {
    if (!data.hour) {
      return setError('hour', {
        type: 'required',
        message: 'You must select a time',
      });
    }
    clearErrors('hour');
    setActiveItem(null);
    dispatch(
      createBooking(data, (result: boolean) => {
        if (result) {
          reset();
          return navigation.goBack();
        }
        reset();
      }),
    );
  };

  if (!isActiveService) {
    return (
      <ActivityIndicator
        style={styles.activityStyle}
        animating={true}
        color={theme.colors.primary}
        size="large"
      />
    );
  }
  return (
    <BookVIew
      caption={isActiveService.caption}
      mediaUrl={isActiveService.mediaUrl}
      activeItem={activeItem}
      control={control}
      errors={errors}
      handlePress={handlePress}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      selected={selected}
      setSelected={setSelected}
      timeState={timeState}
      buttonName={'Confirm Booking'}
    />
  );
};

const styles = StyleSheet.create({
  activityStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

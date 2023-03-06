import React, {useMemo, useEffect, useState} from 'react';

import {ActivityIndicator} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../../hooks';
import {SubmitHandler, useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';

import {useNavigation, useTheme} from '@react-navigation/native';
import {BookVIew} from '../views/BookVIew';
import {INITIAL_DATE, times, weeKendTimes} from '../../../../constants/times';
import {ICreateBook} from '../../../../store/slices/bookings/interface/bookin.interface';
import {createBooking} from '../../../../store/slices/bookings/thunks';

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
    const isWeekennd = currentDate.getDay() === 0 || currentDate.getDay() === 6;
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
    dispatch(
      createBooking(data, (result: boolean) => {
        if (result) {
          setActiveItem(null);
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

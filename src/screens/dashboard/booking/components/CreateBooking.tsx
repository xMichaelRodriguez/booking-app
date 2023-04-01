/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import moment from 'moment';
import React, {useMemo, useEffect, useState} from 'react';
import {type SubmitHandler, useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {times, weeKendTimes} from '../../../../constants/times';
import {useAppDispatch, useAppSelector} from '../../../../hooks';
import {type INavigationProps} from '../../../../interface';
import {type ICreateBook} from '../../../../store/slices/bookings/interface/bookin.interface';
import {createBooking} from '../../../../store/slices/bookings/thunks';
import {BookVIew} from '../views/BookVIew';

export const CreateBooking = ({navigation}: INavigationProps) => {
  const [timeState, setTimeState] = useState(times);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const {isActiveService} = useAppSelector(state => state.service);
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
    getValues,
    clearErrors,
    watch,
    reset,
  } = useForm<ICreateBook>();

  // setHour
  useEffect(() => {
    if (!activeItem) return;

    clearErrors('hour');
    setValue('hour', activeItem);
  }, [activeItem, clearErrors, setValue]);

  const newDateSelected = watch('date');
  useEffect(() => {
    const currentDate = moment(getValues().date);
    const isWeekend =
      currentDate.weekday() === 0 || currentDate.weekday() === 6;
    if (isWeekend) {
      setTimeState(weeKendTimes);
      return;
    }

    setTimeState(times);
  }, [getValues, newDateSelected]);

  const onSubmit: SubmitHandler<ICreateBook> = data => {
    if (!data.hour) {
      setError('hour', {
        type: 'required',
        message: 'You must select a time',
      });
      return;
    }

    clearErrors('hour');
    dispatch(
      createBooking(data, ({result}: {result: boolean}) => {
        if (result) {
          setActiveItem(null);
          reset();
          return navigation.replace('Root', {screen: 'Services'});
        }
        reset();
      }),
    );
  };

  if (isActiveService == null)
    return navigation.replace('Root', {screen: 'Services'});

  return (
    <ScrollView style={styles.container}>
      <BookVIew
        name={isActiveService.name}
        description={isActiveService.description}
        mediaUrl={isActiveService?.secureUrl}
        activeItem={activeItem}
        control={control}
        errors={errors}
        handlePress={handlePress}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        timeState={timeState}
        buttonName={'Confirmmar Orden'}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  activityStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 2,
    padding: 10,
  },
});

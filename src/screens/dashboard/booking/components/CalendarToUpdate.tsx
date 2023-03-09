import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useMemo, useEffect, useState} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native-paper';
import {times, weeKendTimes} from '../../../../constants/times';
import {useAppSelector, useAppDispatch} from '../../../../hooks';
import {ICreateBook} from '../../../../store/slices/bookings/interface/bookin.interface';
import {updateBooking} from '../../../../store/slices/bookings/thunks';
import {BookVIew} from '../views/BookVIew';

export const CalendarToUpdate = () => {
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
  } = useForm<ICreateBook>();

  // set Value to hour by active booking
  useEffect(() => {
    const hourOk = isBookingActive?.hour?.split(' ')[0];
    setActiveItem(hourOk ?? null);

    setValue('hour', hourOk ?? '');
  }, [isBookingActive, setValue]);

  // set value to date by active booking
  useEffect(() => {
    if (isBookingActive && isBookingActive.date) {
      const {date} = isBookingActive;

      setValue('date', new Date(date));
    }
  }, [isBookingActive, setValue]);

  // set note by active booking
  useEffect(() => {
    setValue('note', isBookingActive?.note ?? '');
  }, [isBookingActive, setValue]);

  // set list hour
  useEffect(() => {
    const currentDate = new Date(getValues().date);
    const isWeekennd = currentDate.getDay() === 0 || currentDate.getDay() === 6;
    if (isWeekennd) {
      return setTimeState(weeKendTimes);
    } else {
      return setTimeState(times);
    }
  }, [getValues]);

  // observer activeItem
  useEffect(() => {
    setValue('hour', activeItem ?? '');
  }, [activeItem, setValue]);

  const onSubmit: SubmitHandler<ICreateBook> = data => {
    if (!data.hour) {
      return setError('hour', {
        type: 'required',
        message: 'You must select a time',
      });
    }
    clearErrors('hour');
    if (!data.date) {
      return setError('date', {
        type: 'required',
        message: 'You must select a date',
      });
    }
    clearErrors('date');

    dispatch(
      updateBooking(data, (result: boolean) => {
        if (result) {
          reset();
          return navigation.goBack();
        }
      }),
    );
  };

  if (!isBookingActive) {
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
    <ScrollView style={styles.container}>
      <BookVIew
        mediaUrl={isBookingActive.serviceId?.mediaUrl}
        caption={isBookingActive.serviceId?.caption}
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

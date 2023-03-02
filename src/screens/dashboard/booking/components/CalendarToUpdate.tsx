import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useMemo, useEffect, useState} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native-paper';
import {useAppSelector, useAppDispatch} from '../../../../hooks';
import {updateBooking} from '../../../../store/slices/bookings/thunks';
import {ICreateBook} from '../interface/createBook.interface';
import {BookVIew} from '../views/BookVIew';

const today = new Date();

const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 al mes ya que los meses en JavaScript van de 0 a 11
const day = today.getDate().toString().padStart(2, '0');
const INITIAL_DATE = `${year}-${month}-${day}`;

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
export const CalendarToUpdate = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(INITIAL_DATE);
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
      const splitDate = isBookingActive.date.replace(/\//g, '-').split('-');
      const formatDate = `${splitDate[2]}-${splitDate[0]}-${splitDate[1]}`;
      setSelected(formatDate);
      setValue('date', formatDate);
    }
  }, [isBookingActive, setValue]);

  // set note by active booking
  useEffect(() => {
    setValue('note', isBookingActive?.note ?? '');
  }, [isBookingActive, setValue]);
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

  // set list hour
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
    clearErrors('date');
    clearErrors('hour');

    setValue('hour', activeItem ?? '');
    setValue('date', selected);
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
        selected={selected}
        setSelected={setSelected}
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

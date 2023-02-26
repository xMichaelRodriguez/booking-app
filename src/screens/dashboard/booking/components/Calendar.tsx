/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, useEffect, useState} from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Button, TextInput, useTheme} from 'react-native-paper';
import {useAppSelector} from '../../../../hooks';
import {HeaderBook} from './HeaderBook';
import {CalendarSection} from './CalendarSection';
import {TimeSection} from './TimeSection';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {ICreateBook} from '../interface/createBook.interface';

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
  const [selected, setSelected] = useState(INITIAL_DATE);
  const [timeState, setTimeState] = useState(times);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const {isActiveService} = useAppSelector(state => state.service);
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
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
    console.debug({errors});
    console.debug(data);
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
    <>
      <View>
        <HeaderBook />
      </View>
      <View>
        <CalendarSection selected={selected} setSelected={setSelected} />
        {errors.date && (
          <Text style={{color: isDark ? '#EA0000' : theme.colors.error}}>
            {errors.date.message}
          </Text>
        )}
      </View>
      <View>
        <TimeSection
          activeItem={activeItem}
          handlePress={handlePress}
          timeState={timeState}
        />
        {errors.hour && (
          <Text style={{color: isDark ? '#EA0000' : theme.colors.error}}>
            {errors.hour.message}
          </Text>
        )}
      </View>
      <View style={styles.margins}>
        <Controller
          name="note"
          control={control}
          rules={{
            required: {value: true, message: 'Required Note'},
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              multiline
              numberOfLines={3}
              error={!!errors.note}
              onBlur={onBlur}
              mode="outlined"
              label="Note"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.note && (
          <Text style={{color: isDark ? '#FF2727' : theme.colors.error}}>
            {errors.note.message}
          </Text>
        )}
      </View>

      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Confirm
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  margins: {
    margin: 20,
  },
  activityStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
  },
  container: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContainer: {
    padding: 10,
  },
});

import React, {useMemo, useEffect, useState} from 'react';

import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';
import {useAppSelector} from '../../../../hooks';
import {HeaderBook} from './HeaderBook';
import {CalendarSection} from './CalendarSection';
import {TimeSection} from './TimeSection';

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

  const handlePress = useMemo(() => (time: string) => setActiveItem(time), []);

  useEffect(() => {
    const currentDate = new Date(selected);
    const isWeekennd = currentDate.getDay() === 5 || currentDate.getDay() === 6;
    if (isWeekennd) {
      return setTimeState(weeKendTimes);
    } else {
      return setTimeState(times);
    }
  }, [selected]);

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

      <CalendarSection selected={selected} setSelected={setSelected} />

      <TimeSection
        activeItem={activeItem}
        handlePress={handlePress}
        timeState={timeState}
      />
      <View>
        <TextInput mode="outlined" label="Note" multiline numberOfLines={3} />
      </View>
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

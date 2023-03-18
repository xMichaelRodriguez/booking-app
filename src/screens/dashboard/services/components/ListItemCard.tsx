/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Card} from 'react-native-paper';
import {StyleSheet, useColorScheme} from 'react-native';
import {IService} from '../../../../store/slices/services/interface/services.interface';
import {useAppDispatch} from '../../../../hooks';
import {setActiveService} from '../../../../store/slices/services/thunks';

interface IProps {
  navigation: any;
  item: IService;
  handleOpenSheet: () => void;
}

export const ListItemCard = ({item, handleOpenSheet}: IProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const dispatch = useAppDispatch();
  const setActiveOnOpenSheet = () => {
    dispatch(setActiveService(item));
    handleOpenSheet();
  };
  return (
    <Card
      onPress={setActiveOnOpenSheet}
      style={[
        custom.margins,
        {backgroundColor: isDark ? '#353740' : '#fbfbfb'},
      ]}>
      <Card.Content>
        <Card.Cover source={{uri: item.secureUrl}} />
        <Card.Title
          title={item.name}
          titleStyle={{
            color: isDark ? '#fbfbfb' : '#282828',
          }}
        />
      </Card.Content>
    </Card>
  );
};

const custom = StyleSheet.create({
  margins: {
    margin: 5,
    borderRadius: 20,
  },
  container: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  borderBox: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardSpace: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  inlineContianer: {
    marginHorizontal: -20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dataSchedule: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonSize: {
    width: '40%',
  },
});

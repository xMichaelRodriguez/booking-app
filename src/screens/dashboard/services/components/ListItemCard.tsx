/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import {Card} from 'react-native-paper';

import WrapperAnimate from '../../../../components/ui/WrapperAnimate';
import {useAppDispatch} from '../../../../hooks';
import {type IService} from '../../../../store/slices/services/interface/services.interface';
import {setActiveService} from '../../../../store/slices/services/thunks';

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        <WrapperAnimate>
          <Card.Cover source={{uri: item.secureUrl}} />
        </WrapperAnimate>
        <WrapperAnimate>
          <Card.Title
            title={item.name}
            titleStyle={{
              color: isDark ? '#fbfbfb' : '#282828',
            }}
          />
        </WrapperAnimate>
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

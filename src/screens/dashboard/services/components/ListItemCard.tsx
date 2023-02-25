import React from 'react';
import {Card, useTheme} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {IService} from '../../../../store/slices/services/interface/services.interface';
import {useAppDispatch} from '../../../../hooks';
import {setActiveService} from '../../../../store/slices/services/thunks';
import {theme} from '../../../../theme/theme';

interface IProps {
  navigation: any;
  item: IService;
  handleOpenSheet: () => void;
}

export const ListItemCard = ({item, handleOpenSheet}: IProps) => {
  const themeHook = useTheme();

  const dispatch = useAppDispatch();
  const setActiveOnOpenSheet = () => {
    console.log(themeHook.dark, themeHook.colors.surface);
    dispatch(setActiveService(item));
    handleOpenSheet();
  };
  return (
    <Card
      onPress={setActiveOnOpenSheet}
      mode="contained"
      style={[custom.margins]}>
      <Card.Content>
        <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
        <Card.Title title={item.caption} accessibilityIgnoresInvertColors />
      </Card.Content>
    </Card>
  );
};

const custom = StyleSheet.create({
  margins: {
    margin: 5,
    borderRadius: 20,
    backgroundColor: theme.dark ? '#282828' : '#fbfbfb',
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

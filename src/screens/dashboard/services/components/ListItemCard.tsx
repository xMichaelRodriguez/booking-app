import React from 'react';
import {Text, Card} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {IService} from '../../../../store/slices/services/interface/services.interface';
import {useAppDispatch} from '../../../../hooks';
import {setActiveService} from '../../../../store/slices/services/thunks';

interface IProps {
  navigation: any;
  item: IService;
  handleOpenSheet: () => void;
}

export const ListItemCard = ({item, handleOpenSheet}: IProps) => {
  const dispatch = useAppDispatch();
  const setActiveOnOpenSheet = () => {
    dispatch(setActiveService(item));
    handleOpenSheet();
  };

  return (
    // <Card style={custom.margins} mode="contained">
    //   <Card.Content>
    //     <View style={custom.container}>
    //       <Avatar.Image
    //         size={60}
    //         style={custom.borderBox}
    //         source={{uri: item.media_url}}
    //       />
    //       <View>
    //         <Text variant="bodyMedium">{item.caption}</Text>
    //       </View>
    //     </View>
    //     <Divider />
    //     <View style={custom.cardSpace}>
    //       <Button mode="outlined" onPress={setActiveOnOpenSheet}>
    //         Remove
    //       </Button>
    //       <Button mode="contained" onPress={() => details(item)}>
    //         Details
    //       </Button>
    //     </View>
    //   </Card.Content>
    // </Card>

    <Card style={custom.margins} onPress={setActiveOnOpenSheet}>
      {item.thumbnail_url ? (
        <Card.Cover source={{uri: item.thumbnail_url}} />
      ) : (
        <Card.Cover source={{uri: item.media_url}} />
      )}
      <Card.Content style={custom.margins}>
        <Text variant="titleLarge">{item.caption}</Text>
      </Card.Content>
    </Card>
  );
};

const custom = StyleSheet.create({
  margins: {padding: 10, margin: 10, textAlign: 'left'},
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
    justifyContent: 'space-around',
  },
});

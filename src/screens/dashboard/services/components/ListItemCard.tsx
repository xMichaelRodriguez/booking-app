import React from 'react';
import {Button, Text, Card, Avatar, Divider} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import {theme} from '../../../../theme/theme';
import {IService} from '../../../../slices/services/interface/services.interface';

interface IProps {
  navigation: any;
  item: IService;
  handleOpenSheet: () => void;
}
export const ListItemCard = ({item, navigation, handleOpenSheet}: IProps) => {
  const details = (service: IService) => {
    navigation.replace('Root', {
      screen: 'ServiceItem',
      params: {
        ...service,
      },
    });
  };

  return (
    <Card style={custom.margins} mode="contained">
      <Card.Content>
        <View style={custom.container}>
          <Avatar.Image
            size={60}
            style={custom.borderBox}
            source={require('.././../../../assets/no-data.png')}
          />
          <View>
            <Text variant="titleMedium">{item.name}</Text>
            <Text variant="bodyMedium" style={{color: theme.colors.subTitle}}>
              Price: ${item.price}
            </Text>
          </View>
        </View>
        <Divider />
        <View style={custom.cardSpace}>
          <Button mode="outlined" onPress={handleOpenSheet}>
            Remove
          </Button>
          <Button mode="contained" onPress={() => details(item)}>
            Details
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

const custom = StyleSheet.create({
  margins: {padding: 10, margin: 10},
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

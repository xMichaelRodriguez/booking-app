import React, {useEffect} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {ActivityIndicator, Button, List} from 'react-native-paper';
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {INavigationProps} from '../../../interface';

import {getServices} from '../../../slices/services/thunks';
import {theme} from '../../../theme/theme';
import {FabButton} from '../../../components/list/FabButton';
import {ListItemCard} from './components/ListItemCard';

const noDataImage = require('../../../assets/no-data.png');

export const ServicesScreen = ({navigation}: INavigationProps) => {
  // ref
  // const refRBSheet = useRef<RBSheet>(null);

  // state
  // const [selectedItem, setSelectedItem] = useState<IService | null>(null);

  // store
  const {services, isLoading} = useAppSelector(state => state.service);
  const dispatch = useAppDispatch();

  const [isExtended, setIsExtended] = React.useState(true);

  const createService = () => {
    navigation.replace('Root', {
      screen: 'NewService',
    });
  };

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const onScroll = ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  // const handleDelete = (item: IService) => {
  //   setSelectedItem(item);
  //   // refRBSheet.current?.open();
  //   console.log(selectedItem);
  // };

  if (isLoading) {
    return (
      <ActivityIndicator
        style={custom.activityStyle}
        animating={true}
        color={theme.colors.primary}
        size="large"
      />
    );
  }

  if (services === undefined) {
    return (
      <View style={custom.activityStyle}>
        <Image style={custom.image} source={noDataImage} />
        <Button
          icon={'plus'}
          mode="contained"
          contentStyle={custom.buttonW}
          onPress={createService}>
          Create Service
        </Button>
      </View>
    );
  }
  return (
    <View style={custom.view}>
      <List.Section>
        <FlatList
          onScroll={onScroll}
          data={services}
          renderItem={({item}) => (
            <ListItemCard key={item.id} navigation={navigation} item={item} />
          )}
        />
      </List.Section>
      <FabButton isExtended={isExtended} />
    </View>
  );
};

// const RenderOnButtonSheet = ({
//   selectedItem,
//   refRBSheet,
//   showDialog,
// }: {
//   selectedItem: IService | null;
//   refRBSheet: RBSheet | null;
//   showDialog: () => void;
// }) => {
//   return (
//     <ButtonSheet refRBSheet={refRBSheet}>
//       <View style={custom.activityStyle}>
//         {selectedItem && (
//           <View style={custom.margins}>
//             <Text style={custom.textAlignTitle} variant="headlineSmall">
//               {selectedItem.name}
//             </Text>
//             <Text variant="bodySmall">
//               {selectedItem.description.slice(0, 150) + '...'}
//             </Text>
//             <Badge
//               size={30}
//               style={
//                 custom.badgeCustom
//               }>{`Price: $${selectedItem.price}`}</Badge>

//             <Button
//               style={custom.buttonDelete}
//               mode="contained"
//               icon="trash-can-outline"
//               onPress={showDialog}>
//               Delete
//             </Button>
//           </View>
//         )}
//       </View>
//     </ButtonSheet>
//   );
// };

const custom = StyleSheet.create({
  activityStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

  view: {flex: 1},
  buttonW: {
    width: 300,
  },
  margins: {
    textAlign: 'left',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
  },
  fab: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 16,
    backgroundColor: 'blue',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

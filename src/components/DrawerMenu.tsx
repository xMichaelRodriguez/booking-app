import {DrawerItemList} from '@react-navigation/drawer';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const DrawerMenu = ({props}: {props: any}) => {
  return (
    <View>
      <TouchableOpacity>
        <View style={styles.container}>
          <Image
            source={require('../assets/candy-logo.jpg')}
            style={styles.banner}
          />
        </View>
        <DrawerItemList {...props} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    maxHeight: 150,
  },
  banner: {height: '100%', width: '100%', resizeMode: 'contain'},
});

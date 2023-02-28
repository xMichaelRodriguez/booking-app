/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
import {useAppSelector} from '../../../../hooks';
export const HeaderBook = () => {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === 'dark';
  const {isActiveService} = useAppSelector(state => state.service);
  return (
    <View style={styles.profileContainer}>
      <Avatar.Image
        source={{uri: isActiveService?.mediaUrl && isActiveService.mediaUrl}}
      />
      <View>
        <Text
          variant="titleLarge"
          style={[{color: isDarkTheme ? '#fbfbfb' : '#282828'}]}>
          {isActiveService?.caption}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    lineHeight: 20,
    flexDirection: 'column',

    gap: 10,
  },
});

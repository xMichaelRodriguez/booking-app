/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
interface Prop {
  mediaUrl?: string;
  name?: string;
  description?: string;
}
export const HeaderBook = ({mediaUrl, name, description}: Prop) => {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === 'dark';

  return (
    <View style={styles.profileContainer}>
      <Avatar.Image source={{uri: mediaUrl}} />
      <View>
        <Text
          variant="titleLarge"
          style={[{color: isDarkTheme ? '#fbfbfb' : '#282828'}]}>
          {name}
        </Text>
        <Text
          variant="bodySmall"
          style={[{color: isDarkTheme ? '#fbfbfb' : '#282828', width: '60%'}]}>
          {description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    lineHeight: 20,
    flexDirection: 'row',
    gap: 20,
  },
});

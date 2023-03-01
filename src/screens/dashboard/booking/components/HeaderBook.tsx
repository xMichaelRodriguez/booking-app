/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
type Prop = {
  mediaUrl?: string;
  caption?: string;
};
export const HeaderBook = ({mediaUrl, caption}: Prop) => {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === 'dark';
  return (
    <View style={styles.profileContainer}>
      <Avatar.Image source={{uri: mediaUrl}} />
      <View>
        <Text
          variant="titleLarge"
          style={[{color: isDarkTheme ? '#fbfbfb' : '#282828'}]}>
          {caption}
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

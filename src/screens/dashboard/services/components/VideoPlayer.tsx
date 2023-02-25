import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
import Video from 'react-native-video';

export const VideoPlayer = ({uri}: {uri: string}) => {
  const [muted, setMuted] = useState(false);
  const [play, setPlay] = useState(false);

  const handlePlayPause = () => {
    setPlay(!play);
  };

  const handleMuteUnmute = () => {
    setMuted(!muted);
  };
  const onEnd = () => {
    setPlay(true);
  };
  return (
    <View style={styles.videoContainer}>
      <Video
        source={{uri}}
        style={styles.video}
        playInBackground={false}
        muted={muted}
        paused={play}
        onEnd={onEnd}
      />
      <View style={styles.videoControl}>
        <TouchableOpacity onPress={handlePlayPause}>
          <Button mode="outlined" icon={play ? 'play' : 'pause'}>
            {play ? 'play' : 'pause'}
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleMuteUnmute}>
          <Button mode="outlined" icon={muted ? 'volume-mute' : 'volume-low'}>
            {muted ? 'unmute' : 'mute'}
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    width: '100%',
    height: '70%',
    alignItems: 'center',
  },

  video: {
    alignSelf: 'center',
    width: 300,
    height: 200,
  },
  videoControl: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    marginVertical: 30,
    gap: 20,
  },
});

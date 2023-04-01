import {PermissionsAndroid} from 'react-native';

export async function checkNotificationPermission() {
  try {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    if (granted) return true;

    return false;
  } catch (err) {
    console.warn(err);
    return false;
  }
}

import {PermissionsAndroid} from 'react-native';
export async function requestNotificationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      {
        title: 'Permisos de notificación',
        message:
          'Necesitamos permisos de notificación para enviarle actualizaciones.',
        buttonPositive: 'OK',
        buttonNegative: 'Cancel',
        buttonNeutral: 'Preguntar despues',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log(
        'Permiso de notificación otorgado',
        granted,
        PermissionsAndroid.RESULTS.GRANTED,
      );
      return true;
    } else {
      console.log(
        'Permiso de notificación denegado',
        granted,
        PermissionsAndroid.RESULTS.GRANTED,
      );
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
}

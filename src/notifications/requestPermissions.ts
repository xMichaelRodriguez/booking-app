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

    console.log({permiso: PermissionsAndroid.RESULTS.GRANTED, granted});
    if (granted) {
      console.log('Permiso de notificación otorgado');
      return true;
    } else {
      console.log('Permiso de notificación denegado');
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
}

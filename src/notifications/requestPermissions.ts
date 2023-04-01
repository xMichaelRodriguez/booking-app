import {Alert, PermissionsAndroid, Linking} from 'react-native';

export async function requestNotificationsPermission(): Promise<boolean> {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      {
        title: 'Permisos de notificación',
        message:
          'Necesitamos permisos de notificación para enviarle actualizaciones.',
        buttonPositive: 'OK',
        buttonNegative: 'Cancelar',
        buttonNeutral: 'Preguntar más tarde', // agregar botón para preguntar más tarde
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Permisos de notificación concedidos');
      return true;
    } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
      console.log('Permisos de notificación denegados');
      return false;
    } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      console.log('Permisos de notificación denegados permanentemente');

      Alert.alert(
        'Permisos de notificación',
        'No tienes permisos de notificación para esta aplicación. Por favor, habilítalos en la configuración de tu dispositivo.',
        [
          {
            text: 'OK',
            onPress: () => {
              Linking.openSettings();
              return false;
            },
          },
          {
            text: 'Preguntar más tarde',
            onPress: () => {
              return false;
            },
            style: 'cancel', // establecer estilo "cancel" para el botón "Preguntar más tarde"
          },
        ],
        {cancelable: false},
      );
      return false;
    }
    return false;
  } catch (err) {
    console.warn(err);
    return false;
  }
}

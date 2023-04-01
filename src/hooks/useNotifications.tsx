import {useState, useEffect} from 'react';

import {useAppSelector} from '.';
import {checkNotificationPermission} from '../notifications/checkPermissions';
import {requestNotificationsPermission} from '../notifications/requestPermissions';

export function useNotificationPermission() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const {isLoading} = useAppSelector(state => state.auth);
  useEffect(() => {
    async function checkAndRequestPermission() {
      let permission = await checkNotificationPermission();
      if (permission) setHasPermission(permission);
      else {
        permission = await requestNotificationsPermission();
        setHasPermission(permission);
      }
    }

    if (!isLoading) checkAndRequestPermission();

    return () => {
      setHasPermission(null); // reset the state when the component unmounts
    };
  }, [isLoading]);

  return hasPermission;
}

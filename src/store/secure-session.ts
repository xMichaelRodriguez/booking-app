import EncryptedStorage from 'react-native-encrypted-storage';

export async function storeUserSession(token: string) {
  try {
    await EncryptedStorage.setItem(
      'user_session',
      JSON.stringify({
        token,
      }),
    );

    // Congrats! You've just stored your first value!
  } catch (error) {
    // There was an error on the native side
    if (error instanceof Error) throw new Error(error.message);

    console.error({error});
  }
}

export async function retrieveUserSession() {
  try {
    const session = await EncryptedStorage.getItem('user_session');
    if (session != null)
      // Congrats! You've just retrieved your first value!
      return session;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);

    console.error({error});
  }
}
export async function removeUserSession() {
  try {
    await EncryptedStorage.clear();
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);

    console.error({error});
  }
}

export const getUserSessionParsed = async () => {
  try {
    const session = await retrieveUserSession();

    if (session === undefined) throw new Error('session not found');

    const {token}: {token: string} = JSON.parse(session);

    return token;
  } catch (error) {
    removeUserSession();
  }
};

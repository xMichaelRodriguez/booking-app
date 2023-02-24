import {MD3LightTheme} from 'react-native-paper';

export const theme = {
  ...MD3LightTheme, // or MD3DarkTheme
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#EE65B3',
    secondary: '#F10F91',
    tertiary: '#EA93C4',
    subTitle: '#9E9E9E',
  },

  dropdown1BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },

  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},

  dropdown1SelectedRowStyle: {backgroundColor: 'rgba(0,0,0,0.1)'},
  dropdown1searchInputStyleStyle: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },

  cardActionSpace: {
    justifyContent: 'space-around',
  },
  bottomSheetContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    gap: 30,
  },
};

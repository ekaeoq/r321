import { StyleSheet, Text, View, SafeAreaView, Button,Alert, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Header:{
    fontSize: 40,
    fontFamily: 'monospace',
  },
  bottomTextLeft:{
    position: 'absolute',
    bottom:0,
    marginBottom: 20,
    marginLeft: 20,
    alignSelf: 'flex-start',
  },
  album:{
    marginTop: '15%',
    marginBottom: '2%',
    height: '35%',
    width: '35%',
    resizeMode:'contain',
    alignSelf: 'center',
    bottom:0,
  },
  buttonStyle:{
    fontFamily: 'monospace',
    //color: '#f000000',
  },
  album_2:{
    width: '35%',
    marginLeft: '33%',
    marginBottom: 20,
    marginTop: 20,
    alignSelf: 'center',
    alignContent: 'center',
    //resizeMode: 'contain',

  },
  styleTestJS:{
    fontSize: 30,
  },

});

export { styles }

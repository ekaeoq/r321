import { StyleSheet, Text, View, SafeAreaView, Button,Alert, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Header:{
    fontSize:40,
    fontFamily: 'monospace',
  },
  bottomTextLeft:{
    position: 'absolute',
    bottom:0,
    marginBottom: 20,
    marginLeft: 20,
    alignSelf: "flex-start",
  },
  album:{
    marginTop: '15%',
    marginBottom: '2%',
    height: '35%',
    width: '35%',
    alignSelf: "center",
    bottom:0,
  },
  buttonStyle:{
    fontFamily: 'monospace',
    //color: '#f000000',
  },

});

export { styles }

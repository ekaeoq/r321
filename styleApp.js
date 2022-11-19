import { StyleSheet, Text, View, SafeAreaView, Button,Alert, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Header:{
    fontSize:40,
    fontFamily: "Courier",
  },
  bottomTextLeft:{
    position: 'absolute',
    bottom:0,
    marginBottom: 20,
    marginLeft: 20,
    alignSelf: "flex-start",
  },
  album:{
    height:250,
    width:500,
    position: 'absolute',
    alignSelf: "center",
    bottom:0,
  },

});

export { styles }

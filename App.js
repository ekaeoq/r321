import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button,Alert, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { styles } from "./styleApp.js"

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.Header}>How Bad Is Your Music Taste?</Text>

      <Button 
        title="Find Out"
        color={"#009999"}
        onPress={() => console.log('Simple Button pressed')}>
      </Button>

      <Text style={styles.bottomTextLeft}>Project by Timotej, Viktor and Merisa</Text>

      <Image
          style={styles.album}
          source={require('./assets/album.jpg')}
      />

      <StatusBar style="auto" /> 
    </SafeAreaView>
  );
}

/*const styles = StyleSheet.create({
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

});*/

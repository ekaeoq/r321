import { StyleSheet, Text, View, SafeAreaView, Button,Alert, Image, Platform } from 'react-native';

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
    color: "#000000"
  },
  buttonContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button2Style:{
    alignSelf: 'flex-end',
    backgroundColor:"black",
    borderRadius: 5,
    padding: 10,
    margin: 5
  },
  buttonMiddle:{
    height:39,
    backgroundColor:"black",
    borderRadius: 5,
    padding: 10,
    margin: 5
  },
  album_2:{
    ...Platform.select({
      ios: {
      },
      android: {
        width: '70%',
        height: '20%',
        marginBottom: 20,
        marginTop: 20,
        alignSelf: 'center',
        alignContent: 'center',
      },
      default: {
        // other platforms, web for example
        width: '35%',
        marginBottom: 20,
        marginTop: 20,
        alignSelf: 'center',
        alignContent: 'center',
        //resizeMode: 'contain',
      },
    }),
  },
  styleTestJS:{
    fontSize: 30,
    position: 'absolute',
  },
  screen2:{
    ...Platform.select({
      ios: {
      },
      android: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 50,
      },
      default: {
        // other platforms, web for example
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal:250,
        marginVertical:200,
      },
    }),
  },
  screen3Container:{
    width: '100%',
    height: '100%',

  },

  screen3:{
    ...Platform.select({
      ios: {
      },
      android: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 50,
      },
      default: { //web
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal:250,
        marginTop: 200,
        marginBottom: 100,
      },
    }),
  },
  progressBG: {
    width: '100%',
    height: 15,
    backgroundColor: '#C4CDD5',
    //borderRadius: 10,
    position: 'absolute',
    bottom: 0,
  },
  progress: {
    width: '50%',
    height: 15, 
    backgroundColor: 'black',
    //borderRadius: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#005249',
    marginBottom: 20,
    position: 'absolute',
    bottom: 0,
  },

});

export { styles }

import { StatusBar } from 'expo-status-bar';
import { Animated, StyleSheet, Text, View, SafeAreaView, Button, Alert, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, {useState} from 'react';
import {Component} from 'react';
import { styles } from './styleApp.js';
import AnimatedTyping from './AnimatedTyping.js';

//this will eventaully go to its own file
/*const Test = () => {
  const [hover, setHover] = useState(false);
  const HoverTestData = "blabla";

  const onHover = (e) => {
    e.preventDefault();
    setHover(true);
    console.log("jel radi");
  };
  const onHoverOver = (e) => {
    e.preventDefault();
    setHover(false);
  };

  return(
    <img
    />
  )

};*/
const Test = () => {
  const [hover, setHover] = useState(false);

  const HoverData = "jel radi ili jel ne radi joj boze radi ili ne radi";

  {/*state = {
    fadeAnim: new Animated.Value(0)
  };

  fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 500
    }).start();
  };*/}


  const onHover = (e) => {
    e.preventDefault();
    setHover(true);
    console.log("hovered");
  };

  const onHoverOver = (e) => {
    e.preventDefault();
    setHover(false);
  };
  return (
    <div>
      {/* if hover is true then only show the text */}
      {hover && <div>
        {HoverData.fadeIn}
        <p style={styles.styleTestJS}>
          test</p>
      </div>}
      <img
      //div is not centerd thats why im using marginLeft
        style={styles.album_2}
       /* style={{

          width: '25%',
        }
        }*/
        onMouseEnter={(e) => onHover(e)}
        onMouseLeave={(e) => onHoverOver(e)}
        src={require("./empty_vinyl.png")}
      />
      {/*<p>Hover the image</p>*/}
      {/*<SafeAreaView style={styles.container}>
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              // Bind opacity to animated value
              opacity: this.state.fadeAnim
            }
          ]}
        >
          <div style={styles.fadingText}>
            <p>Fading View!</p>                      
            <p>Fading View!</p>
            <p>Fading View!</p>

          </div>
        </Animated.View>
        <View style={styles.buttonRow}>
          <Button title="Fade In View" onPress={this.fadeIn} />
          <Button title="Fade Out View" onPress={this.fadeOut} />
        </View>
      </SafeAreaView>*/}
    </div>
  );
};

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
     {/* <Text style={styles.Header}>How bad is your music taste?</Text>*/}
     <AnimatedTyping text={["How bad is your music taste?", "12345678"]} />
      <Test /> 

      

      <Button 
        style={styles.buttomStyle}
        title="Find Out!"
        color={"#000000"}
        onPress={() => alert('uf jebote')}>
      </Button>

      <Text style={styles.bottomTextLeft}>Project by Timotej, Viktor and Merisa</Text>


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
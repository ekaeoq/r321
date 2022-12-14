import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { styles } from './styleApp.js';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Button, Pressable } from 'react-native';
import AnimatedTyping from './AnimatedTyping.js';

//Navigation import
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//Screen One
const ScreenOne = props => {

  //onPress To Navigate
  const onPress = () => {
    props.navigation.navigate('ScreenTwo');
  };

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.Header}>How bad is your music taste?</Text>
        
  
        <img
          style={styles.album_2}
          src={require("./empty_vinyl.png")}
        />
        <Button 
          color={"#000000"}
          title="Find Out!"
          //color={"#000000"}
          onPress={onPress}>
        </Button>
  
        <Text style={styles.bottomTextLeft}>Project by Timotej, Viktor and Merisa</Text>
  
        <StatusBar style="auto" /> 
      </SafeAreaView>
  );
};



//Screen Two
const ScreenTwo = props => {

  const [shouldShow, setShouldShow] = useState(false);//false 
  const [showButton, setShowButton] = useState(false);


  const next = () => {
    props.navigation.navigate('ScreenThree');
  };
  return (
    <View style={styles.screen2}>

      <AnimatedTyping text={["Hi i am an AI programmed, to judge your music taste bla bla bla ..."]} onComplete={() => setShowButton(true)}/>

      

      {showButton ? (
          <Pressable 
          style={styles.button2Style}
          
          onPress={() => setShouldShow(!shouldShow)}
        > <Text style={{color: "white"}}>show component</Text> </Pressable>
      ) : null}

      {showButton ? (
          <Pressable  
          style={styles.button2Style}
          
          onPress={next}><Text style={{color: "white"}}>log in with spotify</Text>
      </Pressable >
      ) : null}

      {shouldShow ? (
        <AnimatedTyping text={["Hi i am an AI programmed, to judge your music taste bla bla bla ..."] } />
      ) : null}
          
    </View>
  );
};

//Screen Three
const ScreenThree = props => {

  const [shouldShowText, sethouldShowText] = useState(false);//false 

  const back = () => {
    props.navigation.navigate('Music Judger');
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

      <AnimatedTyping text={["text text loading blablabla"]} onComplete={() => sethouldShowText(true)}/>

      {shouldShowText ? (
        <AnimatedTyping text={["drugi text blabla"] } />
      ) : null}

      <Button 
          style={styles.buttomStyle}
          title="back"
          color={"#000000"}
          onPress={back}>
        </Button>
    </View>
  );
};

const App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
        headerShown: false //nastavljanje headerja
        }}
      >
        <Stack.Screen name="Music Judger" component={ScreenOne} />
        <Stack.Screen name="ScreenTwo" component={ScreenTwo} />
        <Stack.Screen name="ScreenThree" component={ScreenThree} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

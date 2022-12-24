import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { styles } from './styleApp.js';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Button, Pressable, Image, Platform } from 'react-native';
import AnimatedTyping from './AnimatedTyping.js';
import { spotifyCredentials } from './secrets';
import SpotifyWebAPI from 'spotify-web-api-js';
import * as WebBrowser from 'expo-web-browser';
//import * as AuthSession from 'expo-auth-session';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { encode as btoa } from 'base-64';
import axios from 'axios';
//the scope for our analytics
const scopesArr = ['user-modify-playback-state'];
const scopes = scopesArr.join(' ');
//Navigation import
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


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
  export default ScreenOne;
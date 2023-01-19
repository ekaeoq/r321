import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { styles } from './styleApp.js';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Button, Pressable } from 'react-native';
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
import ScreenOne from './ScreenOne.js';
import ScreenTwo from './ScreenTwo.js';
import Results from './Results.js';


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
        <Stack.Screen name="Results" component={Results} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

WebBrowser.maybeCompleteAuthSession();


export default App;

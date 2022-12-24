import React, {useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { styles } from './styleApp.js';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Button, Pressable, Animated } from 'react-native';
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

const Results = props => {

    //onPress To Navigate
    const onPress = () => {
      props.navigation.navigate('Music Judger');
    };
  
    return (
      <SafeAreaView style={styles.container}>
          <Text style={styles.Header}>These are the results</Text>
          
          <Button 
            color={"#000000"}
            title="Back"
            //color={"#000000"}
            onPress={onPress}>
          </Button>


        </SafeAreaView>
    );
  };
  export default Results;
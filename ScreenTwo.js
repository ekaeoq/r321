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


const discovery = {
    authorizationEndpoint: 
    "https://accounts.spotify.com/authorize",
    tokenEndpoint: 
    "https://accounts.spotify.com/api/token",
  };

const ScreenTwo = props => {
    
    const [token, setToken] = useState("");
    const [name, setName] = useState("");
    const [request, response, promptAsync] = 
      useAuthRequest(
        {
          responseType: 'token',
          clientId: spotifyCredentials.clientId,
          scopes: [
            "user-read-currently-playing",
            "user-read-recently-played",
            "user-read-playback-state",
            "user-top-read",
            "user-modify-playback-state",
            "streaming",
            "user-read-email",
            "user-read-private",
          ],
          usePKCE: false,
          redirectUri: spotifyCredentials.redirectUri,
        },
        discovery
      )
      console.log(request);
    
      React.useEffect(() => {
        if (response?.type === "success") {
          const { access_token } = response.params;
          setToken(access_token);
          console.log(response);
        }
      }, [response]);
    
      
      React.useEffect(() => {
        if (token) {
          axios(
            "https://api.spotify.com/v1/me", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          })
            .then((response) => {
              console.log(1)
              console.log(response);
              setName(response.data.display_name);
              console.log(name);
              setShouldShowName(true); //
            })
            .catch((error) => {
              console.log("error", error.message);
            });
        }
      });
      React.useEffect(() => {
        if (token) {
          axios(
            "https://api.spotify.com/v1/me/top/tracks?time_range=short_term", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log("error", error.message);
            });
        }
      });
    
      const [shouldShow, setShouldShow] = useState(false);//false 
      const [shouldShowName, setShouldShowName] = useState(false);//false 
      const [showButton, setShowButton] = useState(false);
    
    
      const next = () => {
        props.navigation.navigate('ScreenThree');
        //promptAsync();
      };
      
      return (
        <View style={styles.screen2}>
    
          <AnimatedTyping text={["H "]} onComplete={() => setShowButton(true)}/>
    
      
          {showButton ? (
              <Pressable  
              style={styles.button2Style}
              
              onPress={()=> {promptAsync();}}><Text style={{color: "white"}}>log in with spotify</Text>
          </Pressable >
          ) : null}

          {showButton ? (
              <Pressable  
              style={styles.button2Style}
              
              onPress={()=> {next();}}><Text style={{color: "white"}}>next page</Text>
          </Pressable >
          ) : null}
    
          {shouldShow ? (
            <AnimatedTyping text={["Hi i am an AI programmed, to judge your music taste bla bla bla ..."] } />
          ) : null}
    
          {shouldShowName ? (
            <Text>
              {name}
              </Text>
          ) : null}
              
        </View>
      );
    };

    export default ScreenTwo;
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
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: spotifyCredentials.clientId,
      scopes: ['user-modify-playback-state','user-read-currently-playing','user-read-playback-state','user-library-modify',
      'user-library-read','playlist-read-private','playlist-read-collaborative','playlist-modify-public',
      'playlist-modify-private','user-read-recently-played','user-top-read'],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: makeRedirectUri({
        scheme: 'app'
      }),
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
    }
  }, [response]);

  const [shouldShow, setShouldShow] = useState(false);//false 
  const [showButton, setShowButton] = useState(false);


  const next = () => {
    props.navigation.navigate('ScreenThree');
    promptAsync();
  };
  return (
    <View style={styles.screen2}>

      <AnimatedTyping text={["Hello there fellow music enthusiast!","", "Are you prepared to hand over your deepest darkest listening pleasures to a mere AI machine?", "Don't worry, we won't tell anyone if you won't ;)"]} onComplete={() => setShowButton(true)}/>

  
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

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

WebBrowser.maybeCompleteAuthSession();


export const getUserPlaylists = async () => {
  const sp = await getValidSPObj();
  const { id: userId } = await sp.getMe();
  console.log(userId);
  const { items: playlists } = await sp.getUserPlaylists(userId, { limit: 50 });
  return playlists;
};
//step 1
const getAuthorizationCode = async () => {
try { 
    const redirectUrl = AuthSession.makeRedirectUri();
    let url=
    'https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' +
    spotifyCredentials.clientId +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' +
    encodeURIComponent(redirectUrl);
    console.log(url);
    WebBrowser.maybeCompleteAuthSession();
    const result = await AuthSession.startAsync({  authUrl:url  })
    
  } catch (err) {
    console.error(err)
  }
  return result.params.code
}


export const getValidSPObj = async () => {
  const tokenExpirationTime = await getUserData('expirationTime');
  if (new Date().getTime() > tokenExpirationTime) {
    // access token has expired, so we need to use the refresh token
    await refreshTokens();
  }
  const accessToken = await getUserData('accessToken');
  var sp = new SpotifyWebAPI();
  await sp.setAccessToken(accessToken);
  return sp;
}

//step 2: create access token and refresh token
const getTokens = async () => {
  try {
    const authorizationCode = await getAuthorizationCode() //we wrote this function above
    const credsB64 = btoa(`${spotifyCredentials.clientId}:${spotifyCredentials.clientSecret}`);
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${
        spotifyCredentials.redirectUri
      }`,
    });
    const responseJson = await response.json();
    
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
    } = responseJson;

    const expirationTime = new Date().getTime() + expiresIn * 1000;
    await setUserData('accessToken', accessToken);
    await setUserData('refreshToken', refreshToken);
    await setUserData('expirationTime', expirationTime);
  } catch (err) {
    console.error(err);
  }
}

//step 3: refresh the token (since the tokens from step 2 have a lifespan)

export const refreshTokens = async () => {
  try { 
    const credsB64 = btoa(`${spotifyCredentials.clientId}:${spotifyCredentials.clientSecret}`);
    const refreshToken = await getUserData('refreshToken');
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
    });
    const responseJson = await response.json();
    if (responseJson.error) {
      await getTokens();
    } else {
      const {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        expires_in: expiresIn,
      } = responseJson;

      const expirationTime = new Date().getTime() + expiresIn * 1000;
      await setUserData('accessToken', newAccessToken);
      if (newRefreshToken) {
        await setUserData('refreshToken', newRefreshToken);
      }
   
       }   await setUserData('expirationTime', expirationTime);
  } catch (err) {
    console.error(err)
  }
}

export default App;

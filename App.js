import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { styles } from './styleApp.js';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Button, Pressable, Image } from 'react-native';
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
    
window.token="";
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
      window.token = access_token;
      console.log(access_token);
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
  

  const [shouldShow, setShouldShow] = useState(false);//false 
  const [shouldShowName, setShouldShowName] = useState(false);//false 
  const [showButton, setShowButton] = useState(false);
  const [album1, setAlbum1] = useState(""); 
  const [album2, setAlbum2] = useState(""); 
  const [album3, setAlbum3] = useState("");
  const [track1, setTrack1] = useState("");
  const [track2, setTrack2] = useState("");
  const [track3, setTrack3] = useState("");
  const [showImage, setShowImage] = useState(false);

  const next = () => {
    //promptAsync();
    props.navigation.navigate('ScreenThree', {token:token });
    
  };

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
          setAlbum1(response.data.items[0].album.images[0].url);
          setTrack1(response.data.items[0].name + " " + response.data.items[0].artists[0].name);
          setAlbum2(response.data.items[1].album.images[0].url);
          setTrack2(response.data.items[1].name + " " + response.data.items[1].artists[0].name);
          setAlbum3(response.data.items[2].album.images[0].url);
          setTrack3(response.data.items[2].name + " " + response.data.items[2].artists[0].name);
          setShowImage(true);
        })
        .catch((error) => {
          console.log("error", error.message);
        });
    }
  });
  return (
    <View style={styles.screen2}>

      <AnimatedTyping text={["H "]} onComplete={() => setShowButton(true)}/>

  
      {showButton ? (
          <Pressable  
          style={styles.button2Style}
          
          onPress={()=> {promptAsync();}}><Text style={{color: "white"}}>log in with spotify</Text>
      </Pressable >
      ) : null}

      {shouldShow ? (
        <AnimatedTyping text={["Hi i am an AI programmed, to judge your music taste bla bla bla ..."] } />
      ) : null}

      {shouldShowName ? (
        <Text>
          Thank you {name} for signing in!
          </Text>
      ) : null}
      {setShowImage ? (
        <Text>
          {track1}
          </Text>
      ) : null}
      {setShowImage ? (
            <Image
            name="album1"
            style={styles.topAlbum}
            source={{
              uri: album1,
            }}
            />
            
            ) : null}
      {setShowImage ? (
        <Text>
          {track2}
          </Text>
      ) : null}
      {setShowImage ? (
      <Image
      style={styles.topAlbum}
      source={{
        uri: album2,
      }}
      />
      ) : null}
      {setShowImage ? (
        <Text>
          {track3}
          </Text>
      ) : null}
      {setShowImage ? (
        
      <Image
      name="album1"
      style={styles.topAlbum}
      source={{
        uri: album3,
      }}
      />
      ) : null}
      {showButton ? (
          <Pressable  
          style={styles.button2Style}
          
          onPress={()=> {next();}}><Text style={{color: "white"}}>log in with spotify</Text>
      </Pressable >
      ) : null}

    </View>
  );
};

//Screen Three
const ScreenThree = props => {
  const token2= window.token;
  console.log(window.token);
  const [shouldShowText, sethouldShowText] = useState(false);//false 
  
  const back = () => {
    props.navigation.navigate('Music Judger');
  };

  

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

      <AnimatedTyping text={["text text loading blablabla"]} onComplete={() => sethouldShowText(true)}/>

      {shouldShowText ? (
        <AnimatedTyping text={["Your top albums are: "] } />
      ) : null}

      <img
          style={styles.album_2}
          src={require("./empty_vinyl.png")}
        />


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

WebBrowser.maybeCompleteAuthSession();


export default App;

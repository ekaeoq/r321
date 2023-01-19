import React, { useEffect, useState, useRef } from "react";
import { styles } from "./styleApp.js";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Button,
  Pressable,
  Animated,
  ScrollView,
  Image
} from "react-native";
import AnimatedTyping from "./AnimatedTyping.js";
import { spotifyCredentials } from "./secrets";
import SpotifyWebAPI from "spotify-web-api-js";
import * as WebBrowser from "expo-web-browser";
//import * as AuthSession from 'expo-auth-session';
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { encode as btoa } from "base-64";
import axios from "axios";
//the scope for our analytics
const scopesArr = ["user-modify-playback-state"];
const scopes = scopesArr.join(" ");

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

var tokenG = "";
const getToken = () => {
  return JSON.stringify(tokenG);
}

const ScreenTwo = (props) => {
  console.log(token);
   //SPOTIFY API VARIABLES
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: "token",
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
        "user-follow-read",
        "user-follow-modify"
      ],
      usePKCE: false,
      redirectUri: spotifyCredentials.redirectUri,
    },
    discovery
  );
  console.log(request);

  React.useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
      tokenG = access_token;
      console.log(response);
    }
  }, [response]);

  React.useEffect(() => {
    if (token) {
      axios("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => {
          console.log(1);
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
      axios("https://api.spotify.com/v1/me/top/tracks?time_range=short_term", {
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
  const [shouldShowName, setShouldShowName] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [ShowAnswer1, setShowAnswer1] = useState(false);
  const [ShowReply1, setShowReply1] = useState(false);
  const [ShowReply1Jos, setShowReply1Jos] = useState(false);
  const [ShowReply1minus, setShowReply1minus] = useState(false);
  const [ShowReply1minusJos, setShowReply1minusJos] = useState(false);
  const [ShowReply1minusJosJos, setShowReply1minusJosJos] = useState(false);
  const [ShowReply12, setShowReply12] = useState(false);
  const [ShowReply12Jos, setShowReply12Jos] = useState(false);
  const [ShowReply123Jos, setShowReply123Jos] = useState(false);
  const [ShowQuestion2, setShowQuestion2] = useState(false);
  const [ShowAnswer2, setShowAnswer2] = useState(false);
  const [ShowReply2a, setShowReply2a] = useState(false);
  const [ShowReply2a2, setShowReply2a2] = useState(false);
  const [ShowReply2b, setShowReply2b] = useState(false);
  const [ShowQuestion3, setShowQuestion3] = useState(false);
  const [ShowAnswer3, setShowAnswer3] = useState(false);
  const [ShowReply3, setShowReply3] = useState(false);
  const [ShowQuestion4, setShowQuestion4] = useState(false);
  const [ShowAnswer4, setShowAnswer4] = useState(false);
  const [ShowReply4, setShowReply4] = useState(false);
  const [ShowResults, setShowResults] = useState(false);
  const [ShowMargin, setShowMargin] = useState(false);
  

  //PROGRESS BAR
  const [progress, setProgress] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;

 
  const [album1, setAlbum1] = useState(""); 
  const [album2, setAlbum2] = useState(""); 
  const [album3, setAlbum3] = useState("");
  const [track1, setTrack1] = useState("");
  const [track2, setTrack2] = useState("");
  const [track3, setTrack3] = useState("");
  const [artist1, setArtist1] = useState("");
  const [artist2, setArtist2] = useState("");
  const [artist3, setArtist3] = useState("");
  const [artist4, setArtist4] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [artist1Long, setArtist1Long] = useState("");
  const [artist11, setArtist11] = useState("");
  const [artist1p, setArtist1p] = useState("");
  const [track1longus, setTrack1longus] = useState("");
  const [Album1longus, setAlbum1longus] = useState(""); 

  const animateProgress = () => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 1000,
    }).start();
  };

  useEffect(() => {
    animateProgress();
    return () => {};
  }, [progress]);

  React.useEffect(() => {
    if (token) {
      axios(
        "https://api.spotify.com/v1/me/top/artists?time_range=long_term", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => {
          console.log(response);

          setArtist11(response.data.items[0].name);
          setArtist1p(response.data.items[0].images[0].url);
          setArtist2(response.data.items[1].name);
          setArtist2p(response.data.items[1].images[0].url);
          setArtist3(response.data.items[4].name);
          setArtist3p(response.data.items[4].images[0].url);

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
          setAlbum1(response.data.items[0].album.images[0].url);
          setTrack1(response.data.items[0].name + " - " + response.data.items[0].artists[0].name);
          setAlbum2(response.data.items[1].album.images[0].url);
          setTrack2(response.data.items[1].name + " " + response.data.items[1].artists[0].name);
          setAlbum3(response.data.items[2].album.images[0].url);
          setTrack3(response.data.items[2].name + " " + response.data.items[2].artists[0].name);
          setArtist1(response.data.items[4].artists[0].name);
          setArtist2(response.data.items[1].artists[0].name);
          setArtist3(response.data.items[2].artists[0].name);
          setArtist4(response.data.items[0].artists[0].name);
          setShowImage(true);
        })
        .catch((error) => {
          console.log("error", error.message);
        });
    }
  });
  React.useEffect(() => {
    if (token) {
      axios(
        "https://api.spotify.com/v1/me/top/tracks?time_range=long_term", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => {
          console.log(response);
          
          setTrack1longus(response.data.items[0].name);
          setAlbum1longus(response.data.items[0].album.images[0].url);
        
        })
        .catch((error) => {
          console.log("error", error.message);
        });
    }
  });
 

  useEffect(() => {
    animateProgress();
    return () => {};
  }, [progress]);

  //NAVIGATION
  const results = () => {
    console.log(tokenG);
    props.navigation.navigate("Results", {token});
  };


  return (
    <View style={styles.screen3Container}>
      <Text style={styles.label}>Progress {progress}%</Text>
      <View style={styles.progressBG}>
        <Animated.View
          style={[
            styles.progress,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>

      <View style={styles.screen3}>
        <AnimatedTyping
          text={["Hi, I'm an A.I. trained to evaluate musical taste. To get started, I'll need to see your Spotify"]}
         
          onComplete={() => setShowButton(true)}
        />

        {showButton ? (
          <Pressable
            style={styles.button2Style}
            onPress={() => {
              promptAsync();
              setShowButton(false);
            }}
          >
            <Text style={{ color: "white" }}>log in with spotify</Text>
          </Pressable>
        ) : null}

        {/*shouldShowName ? <Text>{name}</Text> : null*/}

        {shouldShowName ? (
          <AnimatedTyping
          style={styles.testinghard}
            text={["Hello " + name + "!" + " How old are you?"]}
            
            onComplete={() => setShowAnswer1(true)}
          />
        ) : null}

        {ShowAnswer1 ? (
          <Pressable
            style={styles.button2Style}
            onPress={() => {
              setShowReply1minus(true), setProgress(28);
            }}
          >
            <Text style={{ color: "white" }}>I'm a child</Text>
          </Pressable>
        ) : null}

        {ShowAnswer1 ? (
          <Pressable
            style={styles.button2Style}
            onPress={() => {
              setShowReply1minus(true), setProgress(28);
            }}
          >
            <Text style={{ color: "white" }}>Legal enough</Text>
          </Pressable>
        ) : null}

        {ShowAnswer1 ? (
          <Pressable
            style={styles.button2Style}
            onPress={() => {
              setShowReply1minus(true), setProgress(28);
            }}
          >
            <Text style={{ color: "white" }}>I'd rather not say</Text>
          </Pressable>
        ) : null}
        {ShowReply1minus ? (
          <AnimatedTyping
            text={["Let's see what you've been listening to?"]}
            
            onComplete={() =>{ setShowReply1(true)}}
          />
        ) : null}

        {ShowReply1 ? (
          <AnimatedTyping
            text={[track1]}
            onComplete={() =>{ setShowReply12(true); setShowQuestion2(true);}}
          />
        ) : null}
         {ShowReply12 ? (
          <Image
          name="album1"
          style={styles.topAlbum}
          source={{
            uri: album1,
          }}
          
          />
          
          
        ) : null} 

        {ShowQuestion2 ? (
          <AnimatedTyping
            text={["Do your friends know you listen to this song?"]}
            onComplete={() => setShowAnswer2(true)}
          />
        ) : null}

        {ShowAnswer2 ? (
          <Pressable
            style={styles.button2Style}
            onPress={() => {
              setShowReply2a(true), setProgress(49);
            }}
          >
            <Text style={{ color: "white" }}>Yes!</Text>
          </Pressable>
        ) : null}

        {ShowAnswer2 ? (
          <Pressable
            style={styles.button2Style}
            onPress={() => {
              setShowReply2b(true), setProgress(49);
            }}
          >
            <Text style={{ color: "white" }}>No...</Text>
          </Pressable>
        ) : null}

        {ShowReply2a ? (
          <AnimatedTyping
            style={{marginBottom: "50vh"}}
            text={["They definitely make fun of you behind your back...", "anyways.."]}
            
            onComplete={() => {setShowReply1minusJos(true); setShowMargin(true)}}
          />
        ) : null}

        {ShowReply2b ? (
          <AnimatedTyping
            text={["Thank god... that would be embarrassing...", "anyways.."]}
            onComplete={() => {setShowReply1minusJos(true); setShowMargin(true)}}
          />
          
        ) : null}

        {ShowMargin ? (
         
        <Text style={{ marginBottom:"7vh" }}></Text>
          
        ) : null}
        
      {ShowReply1minusJos ? (
          <AnimatedTyping
            //text={["Let's see what you favs are at the moment:"]}
            text={["not the greatest start, but I'm sure you'll redeem yourself with your", "*all time*","favourite artist.."]}
            onComplete={() =>{ setShowReply1Jos(true); setProgress(67)}}
          />
        ) : null}

        {ShowReply1Jos ? (
          <AnimatedTyping
            text={[artist11 + "  ..seriously?"]}
            onComplete={() =>{ setShowReply12Jos(true);setShowReply1minusJosJos(true);}}
          />
        ) : null}
         {ShowReply12Jos ? (
          <Image
          name="album1"
          style={styles.topAlbum}
          source={{
            uri: artist1p,
          }}
          
          />

        ) : null}   

        {ShowReply1minusJosJos ? (
          <AnimatedTyping
            //text={["Let's see what you favs are at the moment:"]}
            text={["it's fine, your favourite track ever will be much better","right?" , track1longus, "........"]}
            onComplete={() =>{ setShowReply123Jos(true); setShowQuestion3(true); setProgress(88)}}
          />
        ) : null}
         {ShowReply123Jos ? (
          <Image
          name="album1"
          style={styles.topAlbum}
          source={{
            uri: Album1longus,
          }}
          
          />

        ) : null}   

        

    

        {ShowQuestion3 ? (
          <AnimatedTyping
            text={["Yeah...","Let's keep it at that."," ","If you had to","had to..", "kill one of these artists who would it be?"]}
            onComplete={() => setShowAnswer3(true)}
          />
          
        ) : null}
        {ShowAnswer3 ? (
          <Pressable
            style={styles.button2Style}
            onPress={() => {
              setShowReply3(true), setProgress(99);
            }}
          >
            <Text style={{ color: "white" }}>{[artist4]}</Text>
          </Pressable>
        ) : null}

        {ShowAnswer3 ? (
          <Pressable
            style={styles.button2Style}
            onPress={() => {
              setShowReply3(true), setProgress(99);
            }}
          >
            <Text style={{ color: "white" }}>{[artist1]}</Text>
          </Pressable>
        ) : null}
                {ShowAnswer3 ? (
          <Pressable
            style={styles.button2Style}
            onPress={() => {
              setShowReply3(true), setProgress(99);
            }}
          >
            <Text style={{ color: "white" }}>{[artist3]}</Text>
          </Pressable>
        ) : null}

        {ShowAnswer3 ? (
          <Pressable
            style={styles.button2Style}
            onPress={() => {
              setShowReply3(true), setProgress(99);
            }}
          >
            <Text style={{ color: "white" }}>{[artist2]}</Text>
          </Pressable>
        ) : null}



        {ShowReply3 ? (
          <AnimatedTyping
            text={["Of course you would,", "I think I've seen enough, or anyone for that matter", "I'll bring you to your analysis", "don't worry.. we'll give you some recommendations for your terrible music", " "]}
            onComplete={() => setShowResults(true)}
          />
        ) : null}

     


        {ShowResults ? (
          <Button
            style={styles.buttomStyle}
            title="Show Results"
            color={"#000000"}
            onPress={results}
          ></Button>
        ) : null}
      </View>
    </View>
  );
};
export default ScreenTwo;

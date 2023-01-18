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

const ScreenTwo = (props) => {
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

  //VARIABLES FOR QUESTIONS
  const [shouldShowName, setShouldShowName] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [ShowAnswer1, setShowAnswer1] = useState(false);
  const [ShowReply1, setShowReply1] = useState(false);
  const [ShowQuestion2, setShowQuestion2] = useState(false);
  const [ShowAnswer2, setShowAnswer2] = useState(false);
  const [ShowReply2a, setShowReply2a] = useState(false);
  const [ShowReply2b, setShowReply2b] = useState(false);
  const [ShowQuestion3, setShowQuestion3] = useState(false);
  const [ShowAnswer3, setShowAnswer3] = useState(false);
  const [ShowReply3, setShowReply3] = useState(false);
  const [ShowQuestion4, setShowQuestion4] = useState(false);
  const [ShowAnswer4, setShowAnswer4] = useState(false);
  const [ShowReply4, setShowReply4] = useState(false);
  const [ShowResults, setShowResults] = useState(false);

  //PROGRESS BAR
  const [progress, setProgress] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;

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

  //NAVIAGTION
  const results = () => {
    props.navigation.navigate("Results");
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
          text={["HI ... "]}
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
            text={["Hello " + name + "!", "How old are you?"]}
            onComplete={() => setShowAnswer1(true)}
          />
        ) : null}

        {ShowAnswer1 ? (
          <Pressable
            style={styles.button2Style}
            onPress={() => {
              setShowReply1(true), setProgress(28);
            }}
          >
            <Text style={{ color: "white" }}>I'm a child</Text>
          </Pressable>
        ) : null}

        {ShowAnswer1 ? (
          <Pressable
            style={styles.button2Style}
            onPress={() => {
              setShowReply1(true), setProgress(28);
            }}
          >
            <Text style={{ color: "white" }}>nekaj</Text>
          </Pressable>
        ) : null}

        {ShowAnswer1 ? (
          <Pressable
            style={styles.button2Style}
            onPress={() => {
              setShowReply1(true), setProgress(28);
            }}
          >
            <Text style={{ color: "white" }}>I'd rather not say</Text>
          </Pressable>
        ) : null}

        {ShowReply1 ? (
          <AnimatedTyping
            text={["Insult 1"]}
            onComplete={() => setShowQuestion2(true)}
          />
        ) : null}

        {ShowQuestion2 ? (
          <AnimatedTyping
            text={["Do your friends know you listen to this song: filler ?"]}
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
            text={["They definitely make fun of you behind your back"]}
            onComplete={() => setShowQuestion3(true)}
          />
        ) : null}

        {ShowReply2b ? (
          <AnimatedTyping
            text={["Thank god... that would be embarrassing..."]}
            onComplete={() => setShowQuestion3(true)}
          />
        ) : null}

        {ShowQuestion3 ? (
          <AnimatedTyping
            text={["If you had to kill one of these artists who would it be?"]}
            onComplete={() => setShowAnswer3(true)}
          />
        ) : null}

        <View style={styles.buttonContainer}>
          {ShowAnswer3 ? (
            <Pressable
              style={styles.buttonMiddle}
              onPress={() => {
                setShowReply3(true), setProgress(77);
              }}
            >
              <Text style={{ color: "white" }}>artist 1</Text>
            </Pressable>
          ) : null}

          {ShowAnswer3 ? (
            <Pressable
              style={styles.buttonMiddle}
              onPress={() => {
                setShowReply3(true), setProgress(77);
              }}
            >
              <Text style={{ color: "white" }}>artist 2</Text>
            </Pressable>
          ) : null}

          {ShowAnswer3 ? (
            <Pressable
              style={styles.buttonMiddle}
              onPress={() => {
                setShowReply3(true), setProgress(77);
              }}
            >
              <Text style={{ color: "white" }}>artist 3</Text>
            </Pressable>
          ) : null}
        </View>

        {ShowReply3 ? (
          <AnimatedTyping
            text={["Insult 3"]}
            onComplete={() => setShowQuestion4(true)}
          />
        ) : null}

        {ShowQuestion4 ? (
          <AnimatedTyping
            text={["If you had to kill one of these artists who would it be?"]}
            onComplete={() => setShowAnswer4(true)}
          />
        ) : null}

        {ShowAnswer4 ? (
          <Pressable
            style={styles.button2Style}
            onPress={() => {
              setShowReply4(true), setProgress(99);
            }}
          >
            <Text style={{ color: "white" }}>answer 1</Text>
          </Pressable>
        ) : null}

        {ShowAnswer4 ? (
          <Pressable
            style={styles.button2Style}
            onPress={() => {
              setShowReply4(true), setProgress(99);
            }}
          >
            <Text style={{ color: "white" }}>answer 2</Text>
          </Pressable>
        ) : null}

        {ShowReply4 ? (
          <AnimatedTyping
            text={["Insult 4"]}
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

import React, { useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { styles } from "./styleApp.js";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Button, Pressable, Animated, Image, Table, TableWrapper, Row, Rows, Col, Cols, Cell, FadeInView } from "react-native";

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
//Navigation import
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ProgressChart } from "react-native-chart-kit";



const Results = (props) => {
  const route = useRoute();
  const [token3, setToken3] = useState("");
  const [showNext, setShowNext] = useState(false);
  const [showNext2, setShowNext2] = useState(false);
  const [showNext3, setShowNext3] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showImage2, setShowImage2] = useState(false);
  const [showImage3, setShowImage3] = useState(false);
  const [showImage4, setShowImage4] = useState(false);
  const [album1, setAlbum1] = useState("");
  const [album2, setAlbum2] = useState("");
  const [album3, setAlbum3] = useState("");
  const [track1, setTrack1] = useState("");
  const [track2, setTrack2] = useState("");
  const [track3, setTrack3] = useState("");
  const [album4, setAlbum4] = useState("");
  const [album5, setAlbum5] = useState("");
  const [track4, setTrack4] = useState("");
  const [track5, setTrack5] = useState("");
  const [album11, setAlbum11] = useState("");
  const [album22, setAlbum22] = useState("");
  const [album33, setAlbum33] = useState("");
  const [track11, setTrack11] = useState("");
  const [track22, setTrack22] = useState("");
  const [track33, setTrack33] = useState("");
  const [album44, setAlbum44] = useState("");
  const [album55, setAlbum55] = useState("");
  const [track44, setTrack44] = useState("");
  const [track55, setTrack55] = useState("");
  const [artist1, setArtist1] = useState("");
  const [artist2, setArtist2] = useState("");
  const [artist3, setArtist3] = useState("");
  const [artist1p, setArtist1p] = useState("");
  const [artist2p, setArtist2p] = useState("");
  const [artist3p, setArtist3p] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showFade, setShowFade] = useState(true);
  const [unfollowArtist, setUnfollowArtist] = useState("");
  const [unfollowArtistID, setUnfollowArtistID] = useState("");
  const [showUnfollowArtist, setShowUnfollowArtist] = useState(false);
  const [topArtistID, setTopArtistID] = useState("");
  const [trackID, settrackID] = useState("");
  const [rec1, setrec1] = useState("");
  const [rec2, setrec2] = useState("");
  const [rec3, setrec3] = useState("");
  const [rec4, setrec4] = useState("");
  const [rec5, setrec5] = useState("");
  const [rec1p, setrec1p] = useState("");
  const [rec2p, setrec2p] = useState("");
  const [rec3p, setrec3p] = useState("");
  const [rec4p, setrec4p] = useState("");
  const [rec5p, setrec5p] = useState("");
  const [showRec, setshowRec] = useState(false);
  const [showRec2, setshowRec2] = useState(false);

  const FadeInView = props => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    useEffect(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]).start();
    }, [fadeAnim]);

    setTimeout(function () {
      setShowResults(true);
      setShowFade(false);
    }, 7000);

    return (
      <Animated.View // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim, // Bind opacity to animated value
        }}

      >
        {props.children}

      </Animated.View>
    );

  };

  //onPress To Navigate

  const onPress = () => {
    props.navigation.navigate("Music Judger");
  };

  //PROGRESS BAR
  const [progress, setProgress] = useState(22);
  const progressAnim = useRef(new Animated.Value(0)).current;


  const animateProgress = () => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 3000,
    }).start();
  };



  useEffect(() => {
    setToken3(route.params.token);
    if (token3) {
      axios(
        "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token3,
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
          setAlbum4(response.data.items[3].album.images[0].url);
          setTrack4(response.data.items[3].name + " " + response.data.items[3].artists[0].name);
          setAlbum5(response.data.items[4].album.images[0].url);
          setTrack5(response.data.items[4].name + " " + response.data.items[4].artists[0].name);

        })
        .catch((error) => {
          console.log("error", error.message);
        });
    }
  });
  useEffect(() => {
    if (token3) {
      axios(
        "https://api.spotify.com/v1/me/top/tracks?time_range=long_term", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token3,
        },
      })
        .then((response) => {
          console.log(response);
          setAlbum11(response.data.items[0].album.images[0].url);
          setTrack11(response.data.items[0].name + " " + response.data.items[0].artists[0].name);
          setAlbum22(response.data.items[1].album.images[0].url);
          setTrack22(response.data.items[1].name + " " + response.data.items[1].artists[0].name);
          setAlbum33(response.data.items[2].album.images[0].url);
          setTrack33(response.data.items[2].name + " " + response.data.items[2].artists[0].name);
          setAlbum44(response.data.items[3].album.images[0].url);
          setTrack44(response.data.items[3].name + " " + response.data.items[3].artists[0].name);
          setAlbum55(response.data.items[4].album.images[0].url);
          setTrack55(response.data.items[4].name + " " + response.data.items[4].artists[0].name);

        })
        .catch((error) => {
          console.log("error", error.message);
        });
    }
  });

  useEffect(() => {
    if (token3) {
      axios(
        "https://api.spotify.com/v1/me/top/artists?time_range=long_term", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token3,
        },
      })
        .then((response) => {
          console.log(response);
          var top = response.data.items[0].id;
          //https://api.spotify.com/v1/artists/id
          axios(
            "https://api.spotify.com/v1/artists/" + top, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + token3,
            },
          }).then((response) => {
            console.log(response);
            setTopArtistID(response.data.genres[0]);
          }).catch((error) => { });
          setArtist1(response.data.items[0].name);
          setArtist1p(response.data.items[0].images[0].url);
          setArtist2(response.data.items[1].name);
          setArtist2p(response.data.items[1].images[0].url);
          setArtist3(response.data.items[2].name);
          setArtist3p(response.data.items[2].images[0].url);
          settrackID(response.data.items[2].id);

        })
        .catch((error) => {
          console.log("error", error.message);
        });
    }
  });

  useEffect(() => {
    if (token3) {
      axios(
        "https://api.spotify.com/v1/me/following?type=artist", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token3,
        },
      })
        .then((response) => {
          console.log(response);
          setUnfollowArtist(response.data.artists.items[0].name);
          setUnfollowArtistID(response.data.artists.items[0].id);
        })
        .catch((error) => {
          console.log("error", error.message);
        });
    }
  });

  useEffect(() => {
    if (token3) {
      console.log("https://api.spotify.com/v1/recommendations?seed_artists=" + unfollowArtistID + "&seed_genres=" + topArtistID + "&seed_tracks=" + trackID);
      axios(
        "https://api.spotify.com/v1/recommendations?seed_artists=" + unfollowArtistID + "&seed_genres=" + topArtistID + "&seed_tracks=" + trackID, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token3,
        },
      })
        .then((response) => {
          console.log(response);
          setrec1p(response.data.tracks[0].album.images[0].url);
          setrec1(response.data.tracks[0].name + " " + response.data.tracks[0].artists[0].name);
          setrec2p(response.data.tracks[1].album.images[0].url);
          setrec2(response.data.tracks[1].name + " " + response.data.tracks[1].artists[0].name);
          setrec3p(response.data.tracks[2].album.images[0].url);
          setrec3(response.data.tracks[2].name + " " + response.data.tracks[2].artists[0].name);
          setrec4p(response.data.tracks[3].album.images[0].url);
          setrec4(response.data.tracks[3].name + " " + response.data.tracks[3].artists[0].name);
          setrec5p(response.data.tracks[4].album.images[0].url);
          setrec5(response.data.tracks[4].name + " " + response.data.tracks[4].artists[0].name);


        })
        .catch((error) => {
          console.log("error", error.message);
        });
    }
  });

  useEffect(() => {
    animateProgress();
    return () => { };
  }, [progress]);

  // each value represents a goal ring in Progress chart
  const data = {
    labels: ["POP", "RAP", "OTHER", "other"], // optional
    data: [0.4, 0.6, 0.5, 0.9],
  };

  const chartConfig = {
    backgroundGradientFrom: "white",
    backgroundGradientTo: "white",
    color: (opacity = 0) => `rgba(10, 10, 10, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const unfollowArtistReq = () => {
    if (token3) {
      axios(
        "https://api.spotify.com/v1/me/following?type=artist&ids=" + unfollowArtistID, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token3,
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("error", error.message);
        });
    }
  }

  return (
    <SafeAreaView style={styles.resultsContainer}>

      {showFade ? (
        <FadeInView style={styles.quotetext2}>
          <Text style={styles.textstyl}>
            ; for the hour of his judgment is come:
          </Text>
        </FadeInView>
      ) : null}
      {showResults ? (
        <AnimatedTyping
          text={["Your recent deeds have brought you these 5 songs "]}
          //text={["Your"]}
          onComplete={() => { setShowNext(true); setShowImage(true) }}
        />
      ) : null}
      <View style={styles.imageContainer}>

        <View style={styles.textContainer}>
          {showImage ? (
            <Image
              name="album1"
              style={styles.topAlbum}
              source={{
                uri: album1,
              }}
            />

          ) : null}
          {/* {showImage? (<Table>
            
          </Table>):null} */}
          {showImage ? (
            <Text>
              {"\n" + track1}
            </Text>
          ) : null}

        </View>
        <View style={styles.textContainer}>
          {showImage ? (
            <Image
              style={styles.topAlbum}
              source={{
                uri: album2,
              }}
            />
          ) : null}
          {showImage ? (
            <Text>
              {"\n" + track2}
            </Text>
          ) : null}

        </View>
        <View style={styles.textContainer}>
          {showImage ? (

            <Image
              name="album1"
              style={styles.topAlbum}
              source={{
                uri: album3,
              }}
            />
          ) : null}
          {showImage ? (
            <Text>
              {"\n" + track3}
            </Text>
          ) : null}

        </View>

        <View style={styles.textContainer}>
          {showImage ? (
            <Image
              style={styles.topAlbum}
              source={{
                uri: album4,
              }}
            />
          ) : null}
          {showImage ? (
            <Text>
              {"\n" + track4}
            </Text>
          ) : null}

        </View>
        <View style={styles.textContainer}>

          {showImage ? (
            <Image
              name="album1"
              style={styles.topAlbum}
              source={{
                uri: album5,
              }}
            />
          ) : null}
          {showImage ? (
            <Text>
              {"\n" + track5}
            </Text>
          ) : null}
        </View>


      </View>


      {showNext ? (
        <AnimatedTyping
          text={["But these clearly left a mark ever since you downloaded Spotify:"]}
          //text={["But"]}
          onComplete={() => { setShowImage2(true); setShowImage3(true); }}
        />
      ) : null}

      <View style={styles.imageContainer}>

        <View style={styles.textContainer}>
          {showImage2 ? (
            <Image
              name="album1"
              style={styles.topAlbum}
              source={{
                uri: album11,
              }}
            />

          ) : null}
          {showImage2 ? (
            <Text>
              {"\n" + track11}
            </Text>
          ) : null}

        </View>
        <View style={styles.textContainer}>
          {showImage2 ? (
            <Image
              style={styles.topAlbum}
              source={{
                uri: album22,
              }}
            />
          ) : null}
          {showImage2 ? (
            <Text>
              {"\n" + track22}
            </Text>
          ) : null}

        </View>
        <View style={styles.textContainer}>
          {showImage2 ? (

            <Image
              name="album1"
              style={styles.topAlbum}
              source={{
                uri: album33,
              }}
            />
          ) : null}
          {showImage2 ? (
            <Text>
              {"\n" + track33}
            </Text>
          ) : null}

        </View>

        <View style={styles.textContainer}>
          {showImage2 ? (
            <Image
              style={styles.topAlbum}
              source={{
                uri: album44,
              }}
            />
          ) : null}
          {showImage2 ? (
            <Text>
              {"\n" + track44}
            </Text>
          ) : null}

        </View>
        <View style={styles.textContainer}>

          {showImage2 ? (
            <Image
              name="album1"
              style={styles.topAlbum}
              source={{
                uri: album55,
              }}
            />
          ) : null}
          {showImage2 ? (
            <Text>
              {"\n" + track55}
            </Text>
          ) : null}
        </View>


      </View>
      {showImage3 ? (
        <AnimatedTyping
          text={["These fellow creators have been with you through the good and the evil"]}
          //text={["These"]}
          onComplete={() => { setShowUnfollowArtist(true); setShowNext2(true); }}
        />
      ) : null}

      <View style={styles.imageContainer}>

        <View style={styles.textContainer}>
          {showNext2 ? (
            <Image
              name="album1"
              style={styles.topAlbum}
              source={{
                uri: artist1p,
              }}
            />

          ) : null}
          {showNext2 ? (
            <Text>
              {"\n" + artist1}
            </Text>
          ) : null}

        </View>
        <View style={styles.textContainer}>
          {showNext2 ? (
            <Image
              style={styles.topAlbum}
              source={{
                uri: artist2p,
              }}
            />
          ) : null}
          {showNext2 ? (
            <Text>
              {"\n" + artist2}
            </Text>
          ) : null}

        </View>
        <View style={styles.textContainer}>
          {showNext2 ? (

            <Image
              name="album1"
              style={styles.topAlbum}
              source={{
                uri: artist3p,
              }}
            />
          ) : null}
          {showNext2 ? (
            <Text>
              {"\n" + artist3}
            </Text>
          ) : null}

        </View>

      </View>

      {showUnfollowArtist ? (
        <AnimatedTyping
          //text={["These fellow creators have been with you through the good and the evil"]}
          text={["I'm just going to leave this button to unfollow " + unfollowArtist + " here,,,", "Do as you wish."]}
          onComplete={() => {setShowNext3(true); setShowRec(true);}}
        />
      ) : null}

      {showNext3 ? (
        <Pressable
          style={styles.button2Style}
          onPress={() => {
            unfollowArtistReq();
          }}
        >
          <Text style={{ color: "white" }}>Unfollow</Text>
        </Pressable>
      ) : null}

{showNext3 ? (
        <AnimatedTyping
          //text={["These fellow creators have been with you through the good and the evil"]}
          text={["As promised, here are some songs to actually fix your taste:"]}
          onComplete={() => {setshowRec2(true);}}
        />
      ) : null}
      <View style={styles.imageContainer}>

        <View style={styles.textContainer}>
          {showRec2 ? (
            <Image
              name="album1"
              style={styles.topAlbum}
              source={{
                uri: rec1p,
              }}
            />

          ) : null}
          {/* {showImage? (<Table>
    
  </Table>):null} */}
          {showRec2 ? (
            <Text>
              {"\n" + rec1}
            </Text>
          ) : null}

        </View>
        <View style={styles.textContainer}>
          {showRec2 ? (
            <Image
              style={styles.topAlbum}
              source={{
                uri: rec2p,
              }}
            />
          ) : null}
          {showRec2 ? (
            <Text>
              {"\n" + rec2}
            </Text>
          ) : null}

        </View>
        <View style={styles.textContainer}>
          {showRec2 ? (

            <Image
              name="album1"
              style={styles.topAlbum}
              source={{
                uri: rec3p,
              }}
            />
          ) : null}
          {showRec2 ? (
            <Text>
              {"\n" + rec3}
            </Text>
          ) : null}

        </View>

        <View style={styles.textContainer}>
          {showRec2 ? (
            <Image
              style={styles.topAlbum}
              source={{
                uri: rec4p,
              }}
            />
          ) : null}
          {showRec2 ? (
            <Text>
              {"\n" + rec4}
            </Text>
          ) : null}

        </View>
        <View style={styles.textContainer}>

          {showRec2 ? (
            <Image
              name="album1"
              style={styles.topAlbum}
              source={{
                uri: rec5p,
              }}
            />
          ) : null}
          {showRec2 ? (
            <Text>
              {"\n" + rec5}
            </Text>
          ) : null}
        </View>


      </View>

      {/* <Button
        color={"#000000"}
        title="Back"
        //color={"#000000"}
        onPress={onPress}
      ></Button> */}
    </SafeAreaView>
  );
};
export default Results;

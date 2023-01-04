import React, { useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
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
//Navigation import
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ProgressChart } from "react-native-chart-kit";

const Results = (props) => {
  const [showNext, setShowNext] = useState(false);
  const [showNext2, setShowNext2] = useState(false);
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
    animateProgress();
    return () => {};
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.Header}>These are the results</Text>

      <Text style={styles.label2}></Text>
      <AnimatedTyping
        text={["You are " + progress + "% basic!"]}
        onComplete={() => setShowNext(true)}
      />
      <View style={styles.progressBG2}>
        <Animated.View
          style={[
            styles.progress2,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>

      {showNext ? (
        <AnimatedTyping
          text={["Your favorite genres are:"]}
          onComplete={() => setShowNext2(true)}
        />
      ) : null}

      {showNext2 ? (
        <ProgressChart
          data={data}
          width={400}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={chartConfig}
          hideLegend={false}
          style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            fontSize: 40,
          }}
        />
      ) : null}

      <Button
        color={"#000000"}
        title="Back"
        //color={"#000000"}
        onPress={onPress}
      ></Button>
    </SafeAreaView>
  );
};
export default Results;

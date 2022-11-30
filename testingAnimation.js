import React, { Component } from "react";
import { Animated, Text, View, StyleSheet, Button, SafeAreaView } from "react-native";

class App extends Component {
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  state = {
    fadeAnim: new Animated.Value(0)
  };

  fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 500
    }).start();
  };

  fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 3000
    }).start();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              // Bind opacity to animated value
              opacity: this.state.fadeAnim
            }
          ]}
        >
          <div style={styles.fadingText}>
            <p>Fading View!</p>                      
            <p>Fading View!</p>
            <p>Fading View!</p>

          </div>
        </Animated.View>
        <View style={styles.buttonRow}>
          <Button title="Fade In View" onPress={this.fadeIn} />
          <Button title="Fade Out View" onPress={this.fadeOut} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: "powderblue"
  },
  fadingText: {
    fontSize: 28
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: "space-evenly",
    marginVertical: 16
  }
});

export default App;

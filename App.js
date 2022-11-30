import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button,Alert, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, {useState} from 'react';
import { styles } from './styleApp.js';
import AnimatedTyping from './AnimatedTyping.js';

//this will eventaully go to its own file
/*const Test = () => {
  const [hover, setHover] = useState(false);
  const HoverTestData = "blabla";

  const onHover = (e) => {
    e.preventDefault();
    setHover(true);
    console.log("jel radi");
  };
  const onHoverOver = (e) => {
    e.preventDefault();
    setHover(false);
  };

  return(
    <img
    />
  )

};*/
const Test = () => {
  const [hover, setHover] = useState(false);

  const HoverData = "jel radi ili jel ne radi joj boze radi ili ne radi";

  const onHover = (e) => {
    e.preventDefault();
    setHover(true);
    console.log("hovered");
  };

  const onHoverOver = (e) => {
    e.preventDefault();
    setHover(false);
  };
  return (
    <div>
      {/* if hover is true then only show the text */}
      {hover && <div style={{fontSize: 50}}>
        jebo majku
        <p style={{fontSize: 30}}>
          test</p>
      </div>}
      <img
      //div is not centerd thats why im using marginLeft
        style={styles.album_2}
       /* style={{

          width: '25%',
        }
        }*/
        onMouseEnter={(e) => onHover(e)}
        onMouseLeave={(e) => onHoverOver(e)}
        src={require("./empty_vinyl.png")}
      />
      {/*<p>Hover the image</p>*/}
    </div>
  );
};

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
     {/* <Text style={styles.Header}>How bad is your music taste?</Text>*/}
     <AnimatedTyping text={["How bad is your music taste?", "12345678"]} />
      <Test /> 

      

      <Button 
        style={styles.buttomStyle}
        title="Find Out!"
        color={"#000000"}
        onPress={() => alert('uf jebote')}>
      </Button>

      <Text style={styles.bottomTextLeft}>Project by Timotej, Viktor and Merisa</Text>


      <StatusBar style="auto" /> 
    </SafeAreaView>
  );
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Header:{
    fontSize:40,
    fontFamily: "Courier",
  },
  bottomTextLeft:{
    position: 'absolute',
    bottom:0,
    marginBottom: 20,
    marginLeft: 20,
    alignSelf: "flex-start",
  },
  album:{
    height:250,
    width:500,
    position: 'absolute',
    alignSelf: "center",
    bottom:0,
  },

});*/
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button,Alert, Image } from 'react-native';
import React, {useState} from 'react';
import { styles } from './styleApp.js';

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
      <Text style={styles.Header}>How bad is your music taste?</Text>
      <Test />

      <img
        style={styles.album_2}
        src={require("./empty_vinyl.png")}
      />
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

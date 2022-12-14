import { useRef, useState, useEffect } from 'react';
import {StyleSheet, Text } from 'react-native';

export default function AnimatedTyping(props) {
    let [text, setText] = useState("");
    let [cursorColor, setCursorColor] = useState("transparent");
    let [messageIndex, setMessageIndex] = useState(0);
    let [textIndex, setTextIndex] = useState(0);
    let [timeouts, setTimeouts] = useState({
        cursorTimeout: undefined,
        typingTimeout: undefined,
        firstNewLineTimeout: undefined
    });
    //ref to string arr
    let textRef = useRef(text);
    textRef.current = text;

    let cursorColorRef = useRef(cursorColor);
    cursorColorRef.current = cursorColor;
    //index of text in arr
    let messageIndexRef = useRef(messageIndex);
    messageIndexRef.current = messageIndex;

    let textIndexRef = useRef(textIndex);
    textIndexRef.current = textIndex;

    let timeoutsRef = useRef(timeouts);
    timeoutsRef.current = timeouts;

    let typingAnimation = () => {
        //check if index has not reached end of text

        if (textIndexRef.current < props.text[messageIndexRef.current].length) {
            setText(textRef.current + props.text[messageIndexRef.current].charAt(textIndexRef.current));
            setTextIndex(textIndexRef.current + 1);

            let updatedTimeouts = { ...timeoutsRef.current };
            updatedTimeouts.typingTimeout = setTimeout(typingAnimation, 100);//delay between letters miliseconds
            setTimeouts(updatedTimeouts);
        } else if (messageIndexRef.current + 1 < props.text.length) { //if next char index is outside text move to next string in arr
            setMessageIndex(messageIndexRef.current + 1);
            setTextIndex(0); // start of next string

            let updatedTimeouts = {...timeoutsRef.current};
            updatedTimeouts.firstNewLineTimeout = setTimeout(newLineAnimation, 0); //how long it waits on new line
            
            updatedTimeouts.typingTimeout = setTimeout(typingAnimation, 1000); //how long it waits on new line
            setTimeouts(updatedTimeouts);
        } else { //no more strings left
            clearInterval(timeoutsRef.current.cursorTimeout);
            setCursorColor("transparent"); //hide cursor

            if (props.onComplete) {
                props.onComplete();
            }
        }
    };

    let newLineAnimation = () => {
        setText(textRef.current + "\n");
    };

    //animation for cursos blinking
    let cursorAnimation = () => {
        if (cursorColorRef.current === "transparent") { //if transparent->color
            setCursorColor("#8EA960");
        //if color->transparent
        } else {
            setCursorColor("transparent");
        }
    };
    //after animation ends
    useEffect(() => {
        let updatedTimeouts = { ...timeoutsRef.current };
        //cursor animation before typing
        updatedTimeouts.typingTimeout = setTimeout(typingAnimation, 1000);//how long it waits before typing
        updatedTimeouts.cursorTimeout = setInterval(cursorAnimation, 250); //how fast cursor blinks
        setTimeouts(updatedTimeouts);

        return () => {
            clearTimeout(timeoutsRef.current.typingTimeout);
            clearTimeout(timeoutsRef.current.firstNewLineTimeout);
            clearInterval(timeoutsRef.current.cursorTimeout);
        };
    }, []);

    return (
        <Text style={styles.text}>
            {text}
            <Text style={{color: cursorColor, fontSize: 40}}>|</Text>
        </Text>
    )
};

let styles = StyleSheet.create({
    text: {
        color: "black",
        fontSize: 25,
        fontFamily: 'monospace'
    }
})
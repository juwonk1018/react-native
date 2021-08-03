import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useRef} from 'react';
import { SliderComponent, StyleSheet, Text, View } from 'react-native';


const propStyle = (percent) => {
  const base_degrees = -135;
  const rotateBy = base_degrees + (percent * 3.6);
  return {
    transform:[{rotateZ : `${rotateBy}deg`}]
  };
}

const borderStyle = (width) => {
  const borderWidth = width;
  if(width>20){
    return {
      borderWidth: borderWidth,
      borderRadius: width+60,
    };
  }
  
}

const moreLayer = (percent, width) =>{
  if(percent > 50)
  {
    return <View style= {[styles.progressLayer, propStyle(percent), , borderStyle(width)]}></View>
  }
  else{
    return <View style = {[styles.offsetLayer]}></View>
  }
}

const CircularProgress = ({percent, width}) => 
{
  let stylesFromProps = percent>50 ? propStyle(50) : propStyle(percent);
  let borderProps = borderStyle(width);
  return (
    <View style={styles.container}>
      <Text>{percent} %</Text>
      <View style = {[styles.progressLayer, stylesFromProps, borderProps]}></View>
      {moreLayer(percent, width)}
    </View>
  );
}

function useInterval(callback, delay){
  const savedCallback = useRef();
  
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}


const output = () => {
  const [count, setCount] = useState(0);
  const [width, setWidth] = useState(20);
  
  useInterval(() => {
    if(count < 100){
    setCount(count + 1);
    }
    if(count === 100){
      if(width < 70){
        setWidth(width + 1);
      }
    }
  }, 10);

  return(
    <CircularProgress percent = {count} width = {width}/>
  );
};
 
const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    borderWidth: 20,
    borderRadius : 100,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  offsetLayer: {
    position: "absolute",
    justifyContent: "center",
    alignItems : "center",
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'gray',
    borderTopColor: 'gray',
    width: 200,
    height: 200,
    borderRadius : 100,
    borderWidth: 20,
    transform:[{rotateZ: '-135deg'}],
  },
  progressLayer : {
    width: 200,
    height: 200,
    borderWidth: 20,
    borderRadius: 100,
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#3498db',
    borderTopColor: '#3498db',
    transform:[{rotateZ: '-135deg'}]
  }
});

export default output;
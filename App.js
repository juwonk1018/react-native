import React, { useState, useEffect, useRef } from 'react';
import { SliderComponent, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomNavigation, { FullTab } from 'react-native-material-bottom-navigation';
import Icon from '@expo/vector-icons/MaterialCommunityIcons'


const propStyle = (percent) => {
  const base_degrees = -135;
  const rotateBy = base_degrees + (percent * 3.6);
  return {
    transform:[{rotateZ : `${rotateBy}deg`}]
  };
}

const moreLayer = (percent, width) =>{
  if(percent > 50)
  {
    return <View style= {[styles.progressLayer, propStyle(percent)]}></View>
  }
  else{
    return <View style = {[styles.offsetLayer]}></View>
  }
}

const CircularProgress = ({percent, width}) => 
{
  let stylesFromProps = percent>50 ? propStyle(50) : propStyle(percent);
  return (
    <View style={styles.container}>
      <Text>{percent} %</Text>
      <View style = {[styles.progressLayer, stylesFromProps]}></View>
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

const Movies = () => (
  <View>
    <Text>Movies</Text>
  </View>
)
const Music = () => (
  <View>
    <Text>Music</Text>
  </View>
)
const Books = () => (
  <View>
    <Text>Books</Text>
  </View>
)

const tabs = [
  { key: 'Movies', label: 'Movies', barColor: '#00695C', icon: 'movie' },
  { key: 'Music', label: 'Music', barColor: '#6A1B9A', icon: 'music-note' },
  { key: 'Books', label: 'Books', barColor: '#1565C0', icon: 'book' }
]

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
    <SafeAreaProvider>
      <View>
        <CircularProgress percent = {count} width = {width}/>
        <BottomNavigation
        tabs={tabs}
        renderTab={({ tab, isActive }) => (
          <FullTab
            isActive={isActive}
            key={tab.key}
            label={tab.label}
            renderIcon={() => <Icon name={tab.icon} size={24} color="white" />}
          />
        )}/>
        
      </View>
    </SafeAreaProvider>
  );
};
 
const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    borderWidth: 10,
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
    borderWidth: 10,
    transform:[{rotateZ: '-135deg'}],
  },
  progressLayer : {
    width: 200,
    height: 200,
    borderWidth: 10,
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
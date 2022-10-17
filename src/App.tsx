import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import { bluetoothPeripheralsFound } from './modules/Bluetooth/bluetooth.reducer';
import {RootState, store} from './store/store';

const App = () => { 
    return ( 
      <Provider store={store}> 
        <Home /> 
      </Provider> 
    ); 
  };
  const Home = () => { 
    const dispatch = useDispatch(); 
    return ( 
      <SafeAreaView style={styles.container}> 
        <Text>Hello world</Text> 
        <Button 
          title="Нажмите здесь" 
          onPress={() => { 
            dispatch(bluetoothPeripheralsFound(['AA:DD:CC:DD'])); 
          }} 
        /> 
     </SafeAreaView> 
    ); 
  };


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2f2f2',
    }
  })

  export default App;
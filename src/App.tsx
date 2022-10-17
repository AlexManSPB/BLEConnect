import React, { FC } from 'react';
import {Button, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import { bluetoothPeripheralsFound, scanForPeripherals } from './modules/Bluetooth/bluetooth.reducer';
import {RootState, store} from './store/store';
import { BleManager } from 'react-native-ble-plx';
//const manager = new BleManager()

const App = () => { 
    return ( 
      <Provider store={store}> 
        <Home /> 
      </Provider> 
    ); 
  };
 /* 
const Home = () => { 
    
    const scanForPeripherals = () => {
        manager.startDeviceScan(null, null, (error, scannedDevice) => {
          console.log(scannedDevice)
        })
      }

    const dispatch = useDispatch(); 
    return ( 
      <SafeAreaView style={styles.container}> 
        <Text>Hello world</Text> 
        <Button 
          title="Нажмите здесь" 
          onPress={() => {
            dispatch(bluetoothPeripheralsFound(['AA:DD:CC:DD']));
            //scanForPeripherals()
            }}
        /> 
     </SafeAreaView> 
    ); 
  };
*/
const Home: FC = () => {
    const dispatch = useDispatch();
    const devices = useSelector(
      (state: RootState) => state.bluetooth.availableDevices,
    );
    
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {devices.map(device => (
            <>
              <Text>{JSON.stringify(device)}</Text>
              <View/>
            </>
           ))}
          <Button
            title="Press Here to scan"
            onPress={() => {
              dispatch(scanForPeripherals());
            }}
          />
       </ScrollView>
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
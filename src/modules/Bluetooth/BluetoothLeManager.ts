import {BleError, BleManager, Device} from 'react-native-ble-plx';

class BluetoothLeManager {
  bleManager: BleManager;

  constructor() {
    this.bleManager = new BleManager();
  }
/*
  scanForPeripherals = (
    onDeviceFound: (device: Device | null) => void,
    onError: (error: BleError) => void,
  ) => {
    this.bleManager.startDeviceScan(null, null, (error, scannedDevice) => {
        console.log('---->scanForPeripherals', scannedDevice)
        return onDeviceFound(scannedDevice["_manager"])
      if (error) {
        return onError(error);
      }
      return onDeviceFound(scannedDevice);
    });
    return () => {
        this.bleManager.stopDeviceScan();
      };
  };
*/


scanForPeripherals = (
    onDeviceFound: (arg0: {
      type: string;
      payload: BleError | Device | null;
    }) => void,
  ) => {
    this.bleManager.startDeviceScan(null, null, (error, scannedDevice) => {
      onDeviceFound({type: 'SAMPLE', payload: scannedDevice ?? error});
      return;
    });
    return () => {
      this.bleManager.stopDeviceScan();
    };
  };

  stopScanningForPeripherals = () => {
    console.log('---->stopScanningForPeripherals')
    this.bleManager.stopDeviceScan();
  };
}

const bluetoothLeManager = new BluetoothLeManager();

export default bluetoothLeManager;
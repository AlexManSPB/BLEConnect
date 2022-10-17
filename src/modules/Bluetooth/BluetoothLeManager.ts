import {BleError, BleManager, Device} from 'react-native-ble-plx';

class BluetoothLeManager {
  bleManager: BleManager;

  constructor() {
    this.bleManager = new BleManager();
  }

  scanForPeripherals = (
    onDeviceFound: (device: Device | null) => void,
    onError: (error: BleError) => void,
  ) => {
    this.bleManager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        return onError(error);
      }
      return onDeviceFound(scannedDevice);
    });
  };

  stopScanningForPeripherals = () => {
    this.bleManager.stopDeviceScan();
  };
}

const bluetoothLeManager = new BluetoothLeManager();

export default bluetoothLeManager;
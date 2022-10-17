import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { BluetoothPeripheral } from '../../models/BluetoothPeripheral';

type BluetoothState = {
  availableDevices: Array<BluetoothPeripheral>;
  isScanning: boolean;
};

const initialState: BluetoothState = {
  availableDevices: [],
  isScanning: false
};

const bluetoothReducer = createSlice({
  name: 'bluetooth',
  initialState: initialState,
  reducers: {
    bluetoothPeripheralsFound: ( 
        state: BluetoothState, 
        action: PayloadAction<BluetoothPeripheral>, 
      ) => { 
        // Убедитесь, что не добавлено дубликатов устройств 
        const isDuplicate = state.availableDevices.some( 
          device => device.id === action.payload.id, 
        );
        if (!isDuplicate) { 
          state.availableDevices = state.availableDevices.concat(action.payload); 
        } 
      },
    scanForPeripherals: state => { 
        state.isScanning = true; 
    }
  },
});

export const { bluetoothPeripheralsFound, scanForPeripherals } = bluetoothReducer.actions

export const sagaActionConstants = { 
    SCAN_FOR_PERIPHERALS: bluetoothReducer.actions.scanForPeripherals.type, 
    ON_DEVICE_DISCOVERED: bluetoothReducer.actions.bluetoothPeripheralsFound.type, 
  };

export default bluetoothReducer
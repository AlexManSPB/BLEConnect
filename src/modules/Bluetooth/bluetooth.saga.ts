import {Device} from 'react-native-ble-plx';
import {sagaActionConstants} from './bluetooth.reducer';
import {AnyAction} from 'redux';
import {END, eventChannel, TakeableChannel} from 'redux-saga';
import {call, put, take, takeEvery} from 'redux-saga/effects';
import bluetoothLeManager from './BluetoothLeManager';


type TakeableDevice = {
    payload: {id: string; name: string; serviceUUIDs: string};
    take: (cb: (message: any | END) => void) => Device;
  };
  
  function* watchForPeripherals(): Generator<AnyAction, void, TakeableDevice> {
    const onDiscoveredPeripheral = () =>    
      eventChannel(emitter => {
        return bluetoothLeManager.scanForPeripherals(emitter);
      });
  
    const channel: TakeableChannel<Device> = yield call(onDiscoveredPeripheral);
  
    try {
      while (true) {
        const response = yield take(channel);
  
        yield put({
          type: sagaActionConstants.ON_DEVICE_DISCOVERED,
          payload: {
            id: response.payload.id,
            name: response.payload.name,
            serviceUUIDs: response.payload.serviceUUIDs,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
    
  export function* bluetoothSaga() {
    yield takeEvery(
      sagaActionConstants.SCAN_FOR_PERIPHERALS,
      watchForPeripherals,
    );
  }
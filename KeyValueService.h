#ifndef BLUETOOTH_KEYVALUE_SERVICE_H
#define BLUETOOTH_KEYVALUE_SERVICE_H

#include "MicroBitConfig.h"
#include "ble/BLE.h"
#include "MicroBitThermometer.h"
#include "EventModel.h"

#define MICROBIT_ID_KEY_VALUE 9501

#define MICROBIT_KEY_VALUE_RX_LENGTH 16
#define MICROBIT_KEY_VALUE_TX_LENGTH 16

// UUIDs for our service and characteristics
extern const uint8_t  KeyValueServiceUUID[];
extern const uint8_t  KeyValueTxCharacteristicUUID[];
//extern const uint8_t  KeyValueRxCharacteristicUUID[];

class KeyValueService
{
    public:

    /**
      * Constructor.
      * Create a representation of the TemperatureService
      * @param _ble The instance of a BLE device that we're running on.
      */
    KeyValueService(BLEDevice &_ble);

    /**
      * Callback. Invoked when any of our attributes are written via BLE.
      */
    void onDataWritten(const GattWriteCallbackParams *params);

    /**
    * Sends a key value pair
    */
    void send(String key, uint8_t type, Buffer value);

    private:

    // Bluetooth stack we're running on.
    BLEDevice &ble;

    // memory for buffers.
    uint8_t txCharacteristicBuffer[MICROBIT_KEY_VALUE_TX_LENGTH];
    //uint8_t[MICROBIT_KEY_VALUE_RX_LENGTH]           rxCharacteristicBuffer;

    // Handles to access each characteristic when they are held by Soft Device.
    GattAttribute::Handle_t txCharacteristicHandle;
  //  GattAttribute::Handle_t rxCharacteristicHandle;
};


#endif
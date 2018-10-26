#ifndef BLOCKYTALKY_KEYVALUE_SERVICE_H
#define BLOCKYTALKY_KEYVALUE_SERVICE_H

#include "MicroBitConfig.h"
#include "ble/BLE.h"
#include "MicroBitThermometer.h"
#include "EventModel.h"
#include "pxt.h"

#define BLOCKYTALKY_KV_ID 9600
#define BLOCKYTALKY_KV_RECEIVED_NUMBER 1
#define BLOCKYTALKY_KV_RECEIVED_STRING 2

#define BLOCKYTALKY_KV_KEY_LENGTH 6
#define BLOCKYTALKY_KV_VALUE_LENGTH 12

// UUIDs for our service and characteristics
extern const uint8_t  KeyValueServiceUUID[];
extern const uint8_t  KeyValueTxCharacteristicUUID[];
extern const uint8_t  KeyValueRxCharacteristicUUID[];

// 20 bytes
struct KeyValueMessage {
  char key[BLOCKYTALKY_KV_KEY_LENGTH + 1]; // 7
  uint8_t type; // 1
  uint8_t value[BLOCKYTALKY_KV_VALUE_LENGTH]; // 12
};


enum BlockyTalkyMessageType {
    //%
    Int32LE = 1,
    //%
    Float64LE,
    //%
    StringType
};

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
    void send(String key, int type, Buffer value);

    /*
      Gets the last message
    */
    KeyValueMessage receivedMessage();

    private:

    // Bluetooth stack we're running on.
    BLEDevice &ble;

    // memory for buffers.
    KeyValueMessage txCharacteristicMessage;
    KeyValueMessage rxCharacteristicMessage;

    // Handles to access each characteristic when they are held by Soft Device.
    GattAttribute::Handle_t txCharacteristicHandle;
    GattAttribute::Handle_t rxCharacteristicHandle;
};


#endif
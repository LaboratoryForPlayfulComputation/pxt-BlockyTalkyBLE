#include "MicroBitConfig.h"
#include "ble/UUID.h"

#include "KeyValueService.h"

KeyValueService::KeyValueService(BLEDevice &_ble) :
        ble(_ble)
{
    // Create the data structures that represent each of our characteristics in Soft Device.
    GattCharacteristic  txCharacteristic(KeyValueTxUUID, (uint8_t *)&txCharacteristicBuffer, 0,
    sizeof(txCharacteristicBuffer), GattCharacteristic::BLE_GATT_CHAR_PROPERTIES_READ | GattCharacteristic::BLE_GATT_CHAR_PROPERTIES_WRITE);

    // Initialise our characteristic values.
    memset(txCharacteristicBuffer, 0, sizeof(MICROBIT_KEY_VALUE_TX_LENGTH));

    // Set default security requirements
    txCharacteristic.requireSecurity(SecurityManager::MICROBIT_BLE_SECURITY_LEVEL);

    // setup GATT table
    GattCharacteristic *characteristics[] = {&txCharacteristic};
    GattService service(KeyValueServiceUUID, characteristics, sizeof(characteristics) / sizeof(GattCharacteristic *));
    ble.addService(service);

    // retreive handles
    txCharacteristicHandle = txCharacteristic.getValueHandle();

    // initialize data
    ble.gattServer().write(txCharacteristicHandle,(uint8_t *)&txCharacteristicBuffer, sizeof(txCharacteristicBuffer));

    ble.onDataWritten(this, &KeyValueService::onDataWritten);
}

void KeyValueService::send(String key, uint8_t type, Buffer value) {

}

/**
  * Callback. Invoked when any of our attributes are written via BLE.
  */
void KeyValueService::onDataWritten(const GattWriteCallbackParams *params)
{
//    if (params->handle == CharacteristicHandle && params->len >= sizeof(temperaturePeriodCharacteristicBuffer))
//    {
//        setPeriod(*((uint16_t *)params->data));
//        ble.gattServer().write(temperaturePeriodCharacteristicHandle, (const uint8_t *)&temperaturePeriodCharacteristicBuffer, sizeof(temperaturePeriodCharacteristicBuffer));
//    }
}


const uint8_t  KeyValueServiceUUID[] = {
    0x0b,0x78,0xac,0x2d,0xfe,0x36,0x43,0xac,0x32,0xd0,0xa2,0x9d,0x8f,0xbe,0x05,0xd6
};

const uint8_t  KeyValueTxCharacteristicUUID[] = {
    0x0b,0x78,0xac,0x2d,0xfe,0x36,0x43,0xac,0x32,0xd0,0xa2,0x9d,0x8f,0xbe,0x05,0xd7
};

const uint8_t  KeyValueRxCharacteristicUUID[] = {
    0x0b,0x78,0xac,0x2d,0xfe,0x36,0x43,0xac,0x32,0xd0,0xa2,0x9d,0x8f,0xbe,0x05,0xd8
};
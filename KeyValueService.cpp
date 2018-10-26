#include "MicroBitConfig.h"
#include "ble/UUID.h"
#include "KeyValueService.h"
#include "MicroBitEvent.h"

KeyValueService::KeyValueService(BLEDevice &_ble) :
        ble(_ble)
{
    // Create the data structures that represent each BLOCKYTALKYMessageType::StringTypeof our characteristics in Soft Device.
    GattCharacteristic  txCharacteristic(KeyValueTxCharacteristicUUID, (uint8_t *)&txCharacteristicMessage, 0,
    sizeof(txCharacteristicMessage), GattCharacteristic::BLE_GATT_CHAR_PROPERTIES_READ | GattCharacteristic::BLE_GATT_CHAR_PROPERTIES_NOTIFY);
    GattCharacteristic  rxCharacteristic(KeyValueRxCharacteristicUUID, (uint8_t *)&rxCharacteristicMessage, 0,
    sizeof(rxCharacteristicMessage), GattCharacteristic::BLE_GATT_CHAR_PROPERTIES_WRITE | GattCharacteristic::BLE_GATT_CHAR_PROPERTIES_WRITE_WITHOUT_RESPONSE);

    // Initialise our characteristic values.
    memset(&txCharacteristicMessage, 0, sizeof(txCharacteristicMessage));
    memset(&rxCharacteristicMessage, 0, sizeof(rxCharacteristicMessage));

    // Set default security requirements
    txCharacteristic.requireSecurity(SecurityManager::MICROBIT_BLE_SECURITY_LEVEL);
    rxCharacteristic.requireSecurity(SecurityManager::MICROBIT_BLE_SECURITY_LEVEL);

    // setup GATT table
    GattCharacteristic *characteristics[] = {&txCharacteristic, &rxCharacteristic};
    GattService service(KeyValueServiceUUID, characteristics, sizeof(characteristics) / sizeof(GattCharacteristic *));
    ble.addService(service);

    // retreive handles
    txCharacteristicHandle = txCharacteristic.getValueHandle();
    rxCharacteristicHandle = rxCharacteristic.getValueHandle();

    // initialize data
    ble.gattServer().write(txCharacteristicHandle,(uint8_t *)&txCharacteristicMessage, sizeof(txCharacteristicMessage));

    ble.onDataWritten(this, &KeyValueService::onDataWritten);
}

void KeyValueService::send(String key, int type, Buffer value) {
    if (ble.getGapState().connected)
    {
        // clear buffer
        memset(&txCharacteristicMessage, 0, sizeof(txCharacteristicMessage));
        // write key, last byte left and end-of-string marker
        memcpy(&txCharacteristicMessage.key, key->data, min(BLOCKYTALKY_KV_KEY_LENGTH, key->length));
        // write data type
        txCharacteristicMessage.type = type;
        // write value
        memcpy(&txCharacteristicMessage.value, value->data, min(BLOCKYTALKY_KV_VALUE_LENGTH, value->length));
        // notify clients
        ble.gattServer().notify(txCharacteristicHandle,(uint8_t *)&txCharacteristicMessage, sizeof(txCharacteristicMessage));
    }
}

/**
  * Callback. Invoked when any of our attributes are written via BLE.
  */
void KeyValueService::onDataWritten(const GattWriteCallbackParams *params)
{
    if (params->handle == rxCharacteristicHandle 
        && params->len >= sizeof(rxCharacteristicMessage))
    {
        // clear message data
        memset(&rxCharacteristicMessage, 0, sizeof(rxCharacteristicMessage));
        // save data
        memcpy(&rxCharacteristicMessage, params->data, params->len);
        // notify DAL
        MicroBitEvent ev(BLOCKYTALKY_KV_ID, 
            rxCharacteristicMessage.type == BlockyTalkyMessageType::StringType
            ? BLOCKYTALKY_KV_RECEIVED_STRING 
            : BLOCKYTALKY_KV_RECEIVED_NUMBER);
    }
}

KeyValueMessage KeyValueService::receivedMessage() {
    return rxCharacteristicMessage;
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
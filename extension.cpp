#include "pxt.h"
#include "KeyValueService.h"

enum BlocklyTalkyType {
    //%
    Int
};

namespace blocklytalky {
    KeyValueService* _pService = NULL;

    /**
    * Starts a custom sensor service. The handler must call ``setSensorTemperature`` 
    * to update the temperature sent to the service.
    */
    //% blockId=blekey_startService block="start bluetooth service"
    void startBluetoothService() {
        if (NULL != _pService) return;

        _pService = new KeyValueService(*uBit.ble);
    }

    /**
    * Sets the current temperature value on the external temperature sensor
    */
    //% blockId=bluetooth_setTemperatureSensorValue block="blocklytalky send key $key|type $type|value $value"
    void sendMessage(String key, BlocklyTalkyType type, Buffer value) {
        if (NULL == _pService) return;

        _pService->send(key, type, value);
    }
}
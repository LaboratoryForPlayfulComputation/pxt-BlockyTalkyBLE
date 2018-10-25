#include "pxt.h"
#include "KeyValueService.h"

enum BlocklyTalkyType {
    //%
    Int
};

namespace blocklytalky {
    KeyValueService* _pService = NULL;

    //%
    void startBluetoothService() {
        if (NULL != _pService) return;

        _pService = new KeyValueService(*uBit.ble);
    }

    //%
    void sendMessage(String key, BlocklyTalkyType type, Buffer value) {
        startBluetoothService();
        _pService->send(key, type, value);
    }
}
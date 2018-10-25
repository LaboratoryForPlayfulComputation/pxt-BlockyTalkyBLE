#include "pxt.h"
#include "KeyValueService.h"

namespace blocklytalky {
    KeyValueService* _pService = NULL;

    //%
    void startBluetoothService() {
        if (NULL != _pService) return;

        _pService = new KeyValueService(*uBit.ble);
    }

    //%
    void sendMessage(String key, int type, Buffer value) {
        startBluetoothService();
        _pService->send(key, type, value);
    }
}
// Auto-generated. Do not edit.
declare namespace blocklytalky {

    /**
     * Starts a custom sensor service. The handler must call ``setSensorTemperature`` 
     * to update the temperature sent to the service.
     */
    //% blockId=blekey_startService block="start bluetooth service" shim=blocklytalky::startBluetoothService
    function startBluetoothService(): void;

    /**
     * Sets the current temperature value on the external temperature sensor
     */
    //% blockId=bluetooth_setTemperatureSensorValue block="blocklytalky send key $key|type $type|value $value" shim=blocklytalky::sendMessage
    function sendMessage(key: string, type: BlocklyTalkyType, value: Buffer): void;
}

// Auto-generated. Do not edit. Really.

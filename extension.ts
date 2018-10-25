namespace blocklytalky {
    /**
    * Starts a custom sensor service. The handler must call ``setSensorTemperature`` 
    * to update the temperature sent to the service.
    */
    //% shim=blocklytalky::startBluetoothService
    export function startBluetoothService() {
        return;
    }

    /**
    * Sets the current temperature value on the external temperature sensor
    */
    //% shim=blocklytalky::sendMessage
    export function sendMessage(key: string, type: BlocklyTalkyType, value: Buffer) {
        return;
    }

    /**
     * Send a number of Blockly Talky BLE
     * @param key 
     * @param value 
     */
    //% blockid="blocklytalkey_sendnumber" block="blocklytalky send number $key as $value"
    export function sendNumber(key: string, value: number) {
        const buf = pins.createBuffer(4);
        buf.setNumber(NumberFormat.Int32LE, 0, value);
        blocklytalky.sendMessage(key, BlocklyTalkyType.Int, buf);
    }
}


// always start
blocklytalky.startBluetoothService();
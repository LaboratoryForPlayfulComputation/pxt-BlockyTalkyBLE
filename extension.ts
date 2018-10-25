enum BlocklyTalkyMessageType {
    //%
    Int32LE = 1,
    //%
    Float64LE,
    //%
    String
};

namespace blocklytalky {
    const BLOCKLYTALKY_KV_KEY_LENGTH = 14;
    const BLOCKLYTALKY_KV_VALUE_LENGTH = 16;
    
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
    export function sendMessage(key: string, type: BlocklyTalkyMessageType, value: Buffer) {
        return;
    }

    /**
     * Send a number of Blockly Talky BLE
     * @param key 
     * @param value 
     */
    //% blockid="blocklytalkey_sendnumber" block="blocklytalky send number $key as $value"
    export function sendNumber(key: string, value: number) {
        if (value == value >> 0) {
            const buf = pins.createBuffer(4);
            buf.setNumber(NumberFormat.Int32LE, 0, value);
            blocklytalky.sendMessage(key, BlocklyTalkyMessageType.Int32LE, buf);
        } else {
            const buf = pins.createBuffer(8);
            buf.setNumber(NumberFormat.Float64LE, 0, value);
            blocklytalky.sendMessage(key, BlocklyTalkyMessageType.Float64LE, buf);
        }
    }

    /**
     * Send a number of Blockly Talky BLE
     * @param key 
     * @param value 
     */
    //% blockid="blocklytalkey_sendnumber" block="blocklytalky send number $key as $value"
    export function sendString(key: string, value: string) {
        const buf = pins.createBuffer(value.length + 1);
        for (let i = 0; i < value.length; ++i)
            buf[i] = value.charCodeAt(i);
        buf[value.length + 1] = 0;
        blocklytalky.sendMessage(key, BlocklyTalkyMessageType.String, buf);
    }
}


// always start
blocklytalky.startBluetoothService();
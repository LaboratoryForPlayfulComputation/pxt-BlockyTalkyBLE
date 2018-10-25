/**
 * A Bluetooth service for BlocklyTalky applications
 */
//% color=#007EF4 weight=95 icon="\uf294"
namespace blocklytalky {
    const BLOCKLYTALKY_KV_ID = 9600;
    const BLOCKLYTALKY_KV_RECEIVED_NUMBER = 1;
    const BLOCKLYTALKY_KV_RECEIVED_STRING = 2;
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
     * the current key
     */
    //% shim=blocklytalky::receivedKey
    export function receivedKey() {
        return "";
    }

    /**
     * the current string
     */
    //% shim=blocklytalky::receivedString
    export function receivedString() {
        return "";
    }

    //% shim=blocklytalky::receivedBuffer
    export function receivedBuffer(): Buffer {
        return undefined;
    }

    //% shim=blocklytalky::receivedType
    export function receivedType(): number {
        return 0;
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
    //% blockid="blocklytalkey_sendnumber" block="blocklytalky send string $key as $value"
    export function sendString(key: string, value: string) {
        const buf = pins.createBuffer(value.length + 1);
        for (let i = 0; i < value.length; ++i)
            buf[i] = value.charCodeAt(i);
        buf[value.length + 1] = 0;
        blocklytalky.sendMessage(key, BlocklyTalkyMessageType.StringType, buf);
    }

    /**
     * Registers code to run when the blocklytalky receives a number.
     */
    //% blockHandlerKey="blocklytalkyreceived"
    //% blockId=blocklytalky_on_number block="on blocklytalky received" blockGap=16
    export function onReceivedNumber(cb: (key: string, value: number) => void) {
        control.onEvent(BLOCKLYTALKY_KV_ID, BLOCKLYTALKY_KV_RECEIVED_NUMBER, function () {
            const key = receivedKey();
            const type = receivedType();
            const buf = receivedBuffer();
            switch (type) {
                case BlocklyTalkyMessageType.Int32LE:
                    cb(key, buf.getNumber(NumberFormat.Int32LE, 0)); break;
                case BlocklyTalkyMessageType.Float64LE:
                    cb(key, buf.getNumber(NumberFormat.Float64LE, 0)); break;                
            }
        })
    }

    /**
     * Registers code to run when the blocklytalky receives a string.
     */
    //% blockId=blocklytalky_on_string block="on blocklytalky received" blockGap=16
    export function onReceivedString(cb: (key: string, receivedString: string) => void) {
        control.onEvent(BLOCKLYTALKY_KV_ID, BLOCKLYTALKY_KV_RECEIVED_STRING, function () {
            const key = receivedKey();
            const value = receivedString();
            cb(key, value);
        })
    }
}


// always start
blocklytalky.startBluetoothService();
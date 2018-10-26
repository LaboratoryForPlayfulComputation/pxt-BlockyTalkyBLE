/**
 * A Bluetooth service for BlockyTalky applications
 */
//% color=#007EF4 weight=95 icon="\uf294"
namespace blockytalky {
    const BLOCKLYTALKY_KV_ID = 9600;
    const BLOCKLYTALKY_KV_RECEIVED_NUMBER = 1;
    const BLOCKLYTALKY_KV_RECEIVED_STRING = 2;
    const BLOCKLYTALKY_KV_KEY_LENGTH = 14;
    const BLOCKLYTALKY_KV_VALUE_LENGTH = 16;
    
    /**
    * Starts a custom sensor service. The handler must call ``setSensorTemperature`` 
    * to update the temperature sent to the service.
    */
    //% shim=blockytalky::startBluetoothService
    export function startBluetoothService() {
        return;
    }

    /**
    * Sets the current temperature value on the external temperature sensor
    */
    //% shim=blockytalky::sendMessage
    export function sendMessage(key: string, type: BlockyTalkyMessageType, value: Buffer) {
        return;
    }

    /**
     * the current key
     */
    //% shim=blockytalky::receivedKey
    export function receivedKey() {
        return "";
    }

    /**
     * the current string
     */
    //% shim=blockytalky::receivedString
    export function receivedString() {
        return "";
    }

    //% shim=blockytalky::receivedBuffer
    export function receivedBuffer(): Buffer {
        return undefined;
    }

    //% shim=blockytalky::receivedType
    export function receivedType(): number {
        return 0;
    }

    /**
     * Send a number of Blockly Talky BLE
     * @param key 
     * @param value 
     */
    //% blockid="blocklytalkey_sendnumber" block="blockytalky send number $key as $value"
    export function sendNumber(key: string, value: number) {
        if (value == value >> 0) {
            const buf = pins.createBuffer(4);
            buf.setNumber(NumberFormat.Int32LE, 0, value);
            blockytalky.sendMessage(key, BlockyTalkyMessageType.Int32LE, buf);
        } else {
            const buf = pins.createBuffer(8);
            buf.setNumber(NumberFormat.Float64LE, 0, value);
            blockytalky.sendMessage(key, BlockyTalkyMessageType.Float64LE, buf);
        }
    }

    /**
     * Send a number of Blockly Talky BLE
     * @param key 
     * @param value 
     */
    //% blockid="blocklytalkey_sendnumber" block="blockytalky send string $key as $value"
    export function sendString(key: string, value: string) {
        const buf = pins.createBuffer(value.length + 1);
        for (let i = 0; i < value.length; ++i)
            buf[i] = value.charCodeAt(i);
        buf[value.length + 1] = 0;
        blockytalky.sendMessage(key, BlockyTalkyMessageType.StringType, buf);
    }

    /**
     * Registers code to run when the blockytalky receives a number.
     */
    //% blockHandlerKey="blockytalkyreceived"
    //% blockId=blockytalky_on_number block="on blockytalky received" blockGap=16
    export function onReceivedNumber(cb: (key: string, value: number) => void) {
        control.onEvent(BLOCKLYTALKY_KV_ID, BLOCKLYTALKY_KV_RECEIVED_NUMBER, function () {
            const key = receivedKey();
            const type = receivedType();
            const buf = receivedBuffer();
            switch (type) {
                case BlockyTalkyMessageType.Int32LE:
                    cb(key, buf.getNumber(NumberFormat.Int32LE, 0)); break;
                case BlockyTalkyMessageType.Float64LE:
                    cb(key, buf.getNumber(NumberFormat.Float64LE, 0)); break;                
            }
        })
    }

    /**
     * Registers code to run when the blockytalky receives a string.
     */
    //% blockId=blockytalky_on_string block="on blockytalky received" blockGap=16
    export function onReceivedString(cb: (key: string, receivedString: string) => void) {
        control.onEvent(BLOCKLYTALKY_KV_ID, BLOCKLYTALKY_KV_RECEIVED_STRING, function () {
            const key = receivedKey();
            const value = receivedString();
            cb(key, value);
        })
    }
}


// always start
blockytalky.startBluetoothService();
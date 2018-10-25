namespace blocklytalky {
    /**
     * Help goes here.
     */
    //% shim=blocklytalky::startBluetoothService
    export function startBluetoothService() {
        return;
    }

        /**
     * Help goes here.
     */
    //% shim=blocklytalky::sendMessage
    export function send(key: string, type: BlocklyTalkyType, value: Buffer) {
        return;
    }
}


// always start
blocklytalky.startBluetoothService();
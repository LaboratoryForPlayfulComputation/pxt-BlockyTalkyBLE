// tests go here; this will not be compiled when this package is used as a library
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Happy);
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.Sad);
})
let n = 0;
basic.forever(function () {
    n++;
    led.toggle(0, 0);
    blocklytalky.sendNumber("int " + n.toString(), n);
    basic.pause(1000);
    blocklytalky.sendNumber("double " + n.toString(), n * Math.PI);
    basic.pause(1000);
    blocklytalky.sendString("string " + n.toString(), "value" + n);
    basic.pause(1000);
})

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
    blocklytalky.sendNumber("i" + n.toString(), n);
    basic.pause(1000);
    blocklytalky.sendNumber("d" + n.toString(), n + 0.1);
    basic.pause(1000);
    blocklytalky.sendString("s" + n.toString(), "s" + n);
    basic.pause(1000);
})

// tests go here; this will not be compiled when this package is used as a library
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Happy);
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.Sad);
})
let n = 0;
basic.forever(function () {
    led.toggle(0, 0);
    blocklytalky.sendNumber((n++).toString(), Math.randomRange(1, 10));
    basic.pause(500);
})

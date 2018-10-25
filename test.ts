// tests go here; this will not be compiled when this package is used as a library
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Happy);
})
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Sad);
})
basic.forever(function () {
    blocklytalky.sendNumber("number", Math.randomRange(1, 10));
})

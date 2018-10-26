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
    blockytalky.sendNumber("i" + n.toString(), n);
    basic.pause(2000);
    blockytalky.sendNumber("d" + n.toString(), n + 0.01);
    basic.pause(2000);
    blockytalky.sendString("s" + n.toString(), "s" + n);
    basic.pause(2000);
})

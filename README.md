# blockytalkyble-dal

A key-value pair Bluetooth service for BlockyTalky

## Using this extension

Click on the gearwheel, then **Extensions**, search for blockytalky.

## Using the extension

This extension uses Bluetooth Low Energy to communicate to other divices. You will need to pair the micro:bit
to a device that supports the BlockyTalky bluetooth profile.

### Sending Number

```blocks
blockytalky.sendNumber("temp", input.temperature())
```

### ~ hint

The ``key`` part of the message should be less or equal than 6 character long

### ~

### Sending String

```blocks
blockytalky.sendString("marco", "polo")
```

### ~ hint

The ``value`` part of the message should be less than 11 character long

### ~

### Receiving number

Register an event handler to handler number messages. A number can be integer or double.

```blocks
blockytalky.onReceivedNumber(function (key, value) {
	
})
```

### Receiving string

Register an event handler to handler string messages. A number can be integer or double.

```blocks
blockytalky.onReceivedString(function (key, receivedString) {
	
})
```


## Bluetooth Profile

```
const BLOCKY_TALKY_SERVICE = '0b78ac2d-fe36-43ac-32d0-a29d8fbe05d6';
const TX_CHARACTERISTIC = '0b78ac2d-fe36-43ac-32d0-a29d8fbe05d7';
const RX_CHARACTERISTIC = '0b78ac2d-fe36-43ac-32d0-a29d8fbe05d8';
```

## Testing

* Try this glitch in a WebBluetooth enabled browser: https://microbit-blockytalky.glitch.me
* Use [chrome://bluetooth-internals](chrome://bluetooth-internals) to explore the GATT service
* Use NRFConnect on iOS/Android

## License

MIT

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)

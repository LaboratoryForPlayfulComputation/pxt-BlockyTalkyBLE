# blocklytalkyble-dal

A key-value pair Bluetooth service for BlocklyTalky

## Using this extension

Click on the gearwheel, then **Extensions**, search for blocklytalky.

## Using the extension

This extension uses Bluetooth Low Energy to communicate to other divices. You will need to pair the micro:bit
to a device that supports the BlocklyTalky bluetooth profile.

### Sending Number

```blocks
blocklytalky.sendNumber("temp", input.temperature())
```

### ~ hint

The ``key`` part of the message should be less or equal than 6 character long

### ~

### Sending String

```blocks
blocklytalky.sendString("marco", "polo")
```

### ~ hint

The ``value`` part of the message should be less than 11 character long

### ~

## Bluetooth Profile

* Service UUID: 0b78ac2dfe3643ac32d0a29d8fbe05d6
* TX Characteristic: 0b78ac2dfe3643ac32d0a29d8fbe05d7
* RX Characteristic: 0b78ac2dfe3643ac32d0a29d8fbe05d8

## License

MIT

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)


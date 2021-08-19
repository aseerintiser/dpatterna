import { 
    LightReceiver, 
    LightOnCommand,
    LightOffCommand, 
    RedLightOnCommand, 
    RedLightUpCommand, 
    RedLightDownCommand
} from "../patterns/command/command-remote";

describe('Command remote test', () => {
    test('Light on test', () => {
        let received = new LightReceiver();
        received.isLightOn = true;
        let expected = new LightOnCommand(received);
        expect(received.switchOn()).toEqual(expected.execute());
    })

    test('Light off test', () => {
        let received = new LightReceiver();
        let expected = new LightOffCommand(received);
        expect(received.switchOff()).toEqual(expected.execute());
    })

    test('Red light on test', () => {
        let received = new LightReceiver();
        received.isLightOn = true;
        let expected = new RedLightOnCommand(received);
        expect(received.switchRedLow()).toEqual(expected.execute());
    })

    test('Red light up test', () => {
        let received = new LightReceiver();
        received.isLightOn = true;
        received.isRedLightOn = true;
        received.luminosity = 1;
        let expected = new RedLightUpCommand(received);
        expect(received.switchRedMedium()).toEqual(expected.execute());
    })

    test('Red light down test', () => {
        let received = new LightReceiver();
        received.isLightOn = true;
        received.isRedLightOn = true;
        received.luminosity = 1;
        let expected = new RedLightDownCommand(received);
        expect(received.switchRedVeryLow()).toEqual(expected.execute());
    })
    
})